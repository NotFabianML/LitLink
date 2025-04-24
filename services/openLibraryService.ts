// import axios from 'axios';
// import type { AxiosInstance } from 'axios';

// interface Book {
//   title: string;
//   authors: string[];
//   subjects: string[];
//   description?: string;
//   publish_date?: string;
//   number_of_pages_median?: number;
//   isbn?: string[];
//   coverUrl?: string;
//   workKey: string;
// }

// class OpenLibraryService {
//   private axiosInstance: AxiosInstance;
//   private coverSizes = {
//     small: '-S',
//     medium: '-M',
//     large: '-L'
//   };

//   constructor() {
//     this.axiosInstance = axios.create({
//       baseURL: 'https://openlibrary.org',
//       timeout: 10000,
//     });
//   }

//   public async searchBooks(preferences: {
//     likedBooks?: string[];
//     genres?: string[];
//     authors?: string[];
//   }): Promise<Book[]> {
//     try {
//       const query = this.generateSearchQuery(preferences);
//       const fields = 'title,author_name,subject,first_publish_year,number_of_pages_median,isbn,cover_i,key';

//       const response = await this.axiosInstance.get(`/search.json`, {
//         params: {
//           q: query,
//           fields,
//           language: 'eng',
//           limit: 20,
//         }
//       });

//       // Obtener datos básicos primero
//       const basicBooks = response.data.docs.map((doc: any) => ({
//         title: doc.title,
//         authors: doc.author_name || [],
//         subjects: doc.subject?.slice(0, 5) || [],
//         publish_date: doc.first_publish_year?.toString(),
//         number_of_pages_median: doc.number_of_pages_median,
//         isbn: doc.isbn?.slice(0, 5) || [],
//         coverUrl: this.getBookCover(doc.cover_i, 'medium'),
//         workKey: doc.key,
//         description: '' // Inicializar vacío
//       }));

//       // Precargar descripciones en paralelo
//       const booksWithDescriptions = await this.getBooksDescriptions(basicBooks);

//       return booksWithDescriptions;
//     } catch (error) {
//       console.error('Error fetching books:', error);
//       return [];
//     }
//   }

//   private async getBooksDescriptions(books: Book[]): Promise<Book[]> {
//     try {
//       const descriptionRequests = books.map(book =>
//         this.axiosInstance.get(`${book.workKey}.json`)
//           .then(response => ({
//             workKey: book.workKey,
//             description: this.getCleanDescription(response.data)
//           }))
//           .catch(() => ({
//             workKey: book.workKey,
//             description: 'Descripción no disponible'
//           }))
//       );

//       const descriptions = await Promise.all(descriptionRequests);

//       return books.map(book => ({
//         ...book,
//         description: descriptions.find(d => d.workKey === book.workKey)?.description
//       }));
//     } catch (error) {
//       console.error('Error fetching descriptions:', error);
//       return books;
//     }
//   }

//   private getCleanDescription(data: any): string {
//     const sources = [
//       data.description?.value,
//       data.description,
//       data.notes?.value,
//       data.first_sentence?.value,
//       data.excerpts?.[0]?.text?.value
//     ];

//     return sources.find(text =>
//       typeof text === 'string' && text.length > 50 && text.length < 2000
//     ) || 'Descripción no disponible';
//   }

//   public getBookCover(coverId: number, size: keyof typeof this.coverSizes = 'medium'): string {
//     if (!coverId) return 'https://placehold.co/150x225?text=No+Cover';
//     return `https://covers.openlibrary.org/b/id/${coverId}${this.coverSizes[size]}.jpg`;
//   }

//   private generateSearchQuery(preferences: {
//     likedBooks?: string[];
//     genres?: string[];
//     authors?: string[];
//   }): string {
//     const queryParts = [];

//     if (preferences.likedBooks?.length) {
//       queryParts.push(`(${preferences.likedBooks.map(b => `title:"${b}"`).join(' OR ')})`);
//     }

//     if (preferences.authors?.length) {
//       queryParts.push(`(${preferences.authors.map(a => `author:"${a}"`).join(' OR ')})`);
//     }

//     if (preferences.genres?.length) {
//       queryParts.push(`(${preferences.genres.map(g => `subject:"${g}"`).join(' OR ')})`);
//     }

//     return queryParts.join(' OR ');
//   }
// }

// export default new OpenLibraryService();

// services/openLibraryService.ts
import axios, { type AxiosInstance } from 'axios'

export interface Book {
  title: string
  authors: string[]
  subjects: string[]
  description: string
  publish_date?: string
  number_of_pages_median?: number
  isbn?: string[]
  coverUrl: string
  workKey: string
}

class OpenLibraryService {
  private api: AxiosInstance
  private coverSizes = { small: '-S', medium: '-M', large: '-L' }

  constructor() {
    this.api = axios.create({
      baseURL: 'https://openlibrary.org',
      timeout: 10_000,
    })
  }

  /** 
   * Top-level method: for each preference type,
   * fire a separate search, then merge & dedupe.
   */
  public async recommend(preferences: {
    likedBooks?: string[]
    genres?: string[]
    authors?: string[]
  }): Promise<Book[]> {
    const [byGenre, byAuthor, byTitle] = await Promise.all([
      this.searchBySubject(preferences.genres || []),
      this.searchByAuthor(preferences.authors || []),
      this.searchByTitle(preferences.likedBooks || []),
    ])

    // merge and dedupe by workKey
    const merged = [...byGenre, ...byAuthor, ...byTitle]
    const unique: Record<string, Book> = {}
    for (const book of merged) {
      unique[book.workKey] = unique[book.workKey] || book
    }
    return Object.values(unique).slice(0, 20)
  }

  /** Search books by subjects/genres */
  private async searchBySubject(subjects: string[]): Promise<Book[]> {
    if (!subjects.length) return []
    const q = subjects.map(s => `subject:"${s}"`).join(' OR ')
    return this.basicSearch(q)
  }

  /** Search books by author names */
  private async searchByAuthor(authors: string[]): Promise<Book[]> {
    if (!authors.length) return []
    const q = authors.map(a => `author:"${a}"`).join(' OR ')
    return this.basicSearch(q)
  }

  /** Search books by liked book titles */
  private async searchByTitle(titles: string[]): Promise<Book[]> {
    if (!titles.length) return []
    const q = titles.map(t => `title:"${t}"`).join(' OR ')
    return this.basicSearch(q)
  }

  /** Core search: hits OpenLibrary’s `/search.json` and enriches results */
  private async basicSearch(query: string): Promise<Book[]> {
    const fields = [
      'title',
      'author_name',
      'subject',
      'first_publish_year',
      'number_of_pages_median',
      'isbn',
      'cover_i',
      'key',
    ].join(',')

    const resp = await this.api.get('/search.json', {
      params: { q: query, fields, limit: 10 },
    })  // :contentReference[oaicite:0]{index=0}

    // Map into our Book shape
    const docs = resp.data.docs as any[]
    const books = docs.map(doc => ({
      title: doc.title,
      authors: doc.author_name || [],
      subjects: doc.subject?.slice(0, 5) || [],
      publish_date: doc.first_publish_year?.toString(),
      number_of_pages_median: doc.number_of_pages_median,
      isbn: doc.isbn?.slice(0, 5) || [],
      coverUrl: this.coverUrl(doc.cover_i, 'medium'),
      workKey: doc.key,
      description: '',
    }))

    // Fetch descriptions in parallel
    return this.attachDescriptions(books)
  }

  /** Pulls `/works/:workKey.json` to get a clean description */
  private async attachDescriptions(books: Book[]): Promise<Book[]> {
    const tasks = books.map(b =>
      this.api.get(`${b.workKey}.json`)
        .then(r => ({ key: b.workKey, desc: this.cleanDesc(r.data) }))
        .catch(() => ({ key: b.workKey, desc: 'No description available.' }))
    )
    const descs = await Promise.all(tasks)
    return books.map(b => ({
      ...b,
      description: descs.find(d => d.key === b.workKey)!.desc,
    }))
  }

  /** Heuristic to pick the best text */
  private cleanDesc(data: any): string {
    const candidates = [
      data.description?.value,
      data.description,
      data.first_sentence?.value,
      data.excerpts?.[0]?.text,
    ]
    return (
      candidates.find(tx => typeof tx === 'string' && tx.length > 30) ||
      'No description available.'
    )
  }

  /** Build cover URL or placeholder (public) */
  public getBookCover(coverId: number | undefined, size: keyof typeof this.coverSizes = 'medium'): string {
    return coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}${this.coverSizes[size]}.jpg`
      : 'https://placehold.co/150x225?text=No+Cover'
  }

  /** Build cover URL or placeholder */
  private coverUrl(coverId: number, size: keyof typeof this.coverSizes) {
    return coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}${this.coverSizes[size]}.jpg`
      : 'https://placehold.co/150x225?text=No+Cover'
  }
}

export default new OpenLibraryService()
