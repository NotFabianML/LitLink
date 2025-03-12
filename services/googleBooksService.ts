import axios, { type AxiosInstance } from 'axios';

interface Book {
  id: string;
  title: string;
  authors: string[];
  categories: string[];
  description?: string;
  publishedDate?: string;
  pageCount?: number;
  isbn?: string;
  coverUrl?: string;
  buyLink?: string;
  infoLink?: string;
  rating?: number | string;
}

class GoogleBooksService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://www.googleapis.com/books/v1',
    });
  }

  /**
   * Busca libros por un término de búsqueda.
   */
  public async searchBooks(query: string): Promise<Book[]> {
    try {
      const response = await this.axiosInstance.get(`/volumes?q=${encodeURIComponent(query)}&langRestrict=en`);
      const books = response.data.items.map((item: any) => {
        const volumeInfo = item.volumeInfo;
        const industryIdentifiers = volumeInfo.industryIdentifiers || [];
        const isbnInfo = industryIdentifiers.find((id: any) => id.type === 'ISBN_13') || industryIdentifiers[0] || {};

        return {
          id: item.id,
          title: volumeInfo.title || 'Unknown Title',
          authors: volumeInfo.authors || ['Unknown Author'],
          categories: volumeInfo.categories || ['Uncategorized'],
          description: volumeInfo.description || 'No description available.',
          publishedDate: volumeInfo.publishedDate || 'Unknown',
          pageCount: volumeInfo.pageCount || 0,
          isbn: isbnInfo.identifier || 'N/A',
          coverUrl: volumeInfo.imageLinks?.extraLarge || volumeInfo.imageLinks?.large || volumeInfo.imageLinks?.medium || volumeInfo.imageLinks?.smallThumbnail || 'https://placehold.co/150',
        };
      });
      return books;
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  }

  /**
   * Obtiene los detalles de un libro por su ID.
   */
  public async getBookById(bookId: string): Promise<Book | null> {
    try {
      const response = await this.axiosInstance.get(`/volumes/${bookId}`);
      const volumeInfo = response.data.volumeInfo;
      const industryIdentifiers = volumeInfo.industryIdentifiers || [];
      const isbnInfo = industryIdentifiers.find((id: any) => id.type === 'ISBN_13') || industryIdentifiers[0] || {};

      return {
        id: bookId,
        title: volumeInfo.title || 'Unknown Title',
        authors: volumeInfo.authors || ['Unknown Author'],
        categories: volumeInfo.categories || ['Uncategorized'],
        description: volumeInfo.description || 'No description available.',
        publishedDate: volumeInfo.publishedDate || 'Unknown',
        pageCount: volumeInfo.pageCount || 0,
        isbn: isbnInfo.identifier || 'N/A',
        coverUrl: volumeInfo.imageLinks?.extraLarge || volumeInfo.imageLinks?.large || volumeInfo.imageLinks?.medium || volumeInfo.imageLinks?.smallThumbnail || 'https://placehold.co/150',
        buyLink: response.data.saleInfo?.buyLink || null,
        infoLink: volumeInfo.infoLink || null,
        rating: volumeInfo.averageRating || 'N/A',
      };
    } catch (error) {
      console.error(`Error fetching details for book ID: ${bookId}`, error);
      return null;
    }
  }
}

export default new GoogleBooksService();
