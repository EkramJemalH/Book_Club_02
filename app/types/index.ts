// ========== BOOK TYPES ==========


export interface Book {
  id: string
  key?: string
  title: string
  authors?: string[]
  author?: string  // For featured books compatibility
  description?: string
  imageUrl?: string
  price?: string
  rating?: number
  categories?: string[]
  category?: string  // For featured books compatibility
  pageCount?: number
  publishedDate?: string
  publisher?: string
  tag?: string  // For featured books
  isbn?: string
}

export interface FeaturedBook {
  id: string
  title: string
  author: string
  tag: string
  category: string
  rating: number
  price: string
  imageUrl: string
  description: string
  isbn?: string
}

// ========== OPEN LIBRARY API TYPES ==========
export interface OpenLibraryBook {
  key: string
  title: string
  author_name?: string[]
  first_sentence?: string[]
  subject?: string[]
  isbn?: string[]
  cover_edition_key?: string
  cover_i?: number
  ratings_average?: number
  ratings_count?: number
  number_of_pages_median?: number
  first_publish_year?: number
  publisher?: string[]
  cover?: {
    large?: string
    medium?: string
    small?: string
  }
  authors?: Array<{
    name: string
  }>
  description?: string | {
    value: string
  }
  subjects?: string[]
  publish_date?: string[]
  publishers?: Array<{
    name: string
  }>
  number_of_pages?: number
}

export interface OpenLibrarySearchResponse {
  docs: OpenLibraryBook[]
  numFound: number
  start: number
}

export interface OpenLibraryBookResponse {
  [key: string]: OpenLibraryBook
}

// ========== GOOGLE BOOKS API TYPES (for backward compatibility) ==========
export interface GoogleBookVolume {
  id: string
  volumeInfo: {
    title: string
    authors?: string[]
    description?: string
    imageLinks?: {
      thumbnail: string
      smallThumbnail: string
    }
    categories?: string[]
    pageCount?: number
    publishedDate?: string
    publisher?: string
    averageRating?: number
    ratingsCount?: number
    industryIdentifiers?: Array<{
      type: string
      identifier: string
    }>
  }
  saleInfo?: {
    listPrice?: {
      amount: number
      currencyCode: string
    }
    buyLink?: string
  }
  accessInfo?: {
    country?: string
    viewability?: string
    embeddable?: boolean
    publicDomain?: boolean
    textToSpeechPermission?: string
    epub?: {
      isAvailable: boolean
    }
    pdf?: {
      isAvailable: boolean
    }
    webReaderLink?: string
    accessViewStatus?: string
    quoteSharingAllowed?: boolean
  }
  etag?: string
  kind?: string
  selfLink?: string
}

export interface GoogleBookResponse {
  items?: GoogleBookVolume[]
  totalItems: number
}

// ========== HELPER FUNCTIONS ==========

// Convert Open Library book to FeaturedBook format
export function openLibraryToFeaturedBook(
  olBook: OpenLibraryBook,
  customData: Partial<FeaturedBook> = {}
): FeaturedBook {
  const isbn = olBook.isbn?.[0] || '';
  const olid = olBook.cover_edition_key || '';
  
  let imageUrl = '/images/book-placeholder.jpg';
  if (isbn) {
    imageUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
  } else if (olid) {
    imageUrl = `https://covers.openlibrary.org/b/olid/${olid}-L.jpg`;
  }

  // Get description
  let description = `${olBook.title} is a captivating book.`;
  if (olBook.first_sentence && olBook.first_sentence.length > 0) {
    description = olBook.first_sentence[0];
  } else if (olBook.description) {
    description = typeof olBook.description === 'string' 
      ? olBook.description 
      : olBook.description.value || description;
  }

  return {
    id: olBook.key || `book-${Math.random()}`,
    title: olBook.title || customData.title || 'Unknown Title',
    author: olBook.author_name?.[0] || customData.author || 'Unknown Author',
    tag: customData.tag || 'Featured',
    category: olBook.subject?.[0] || customData.category || 'General',
    rating: olBook.ratings_average || customData.rating || 4.5,
    price: customData.price || '$14.99',
    imageUrl: customData.imageUrl || imageUrl,
    description: customData.description || description,
    isbn: isbn || customData.isbn,
  };
}

// Convert Open Library book to Book format
export function openLibraryToBook(olBook: OpenLibraryBook): Book {
  const isbn = olBook.isbn?.[0] || '';
  const olid = olBook.cover_edition_key || '';
  
  let imageUrl = '/images/book-placeholder.jpg';
  if (isbn) {
    imageUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
  } else if (olid) {
    imageUrl = `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`;
  }

  // Get description
  let description = `${olBook.title} is a captivating book.`;
  if (olBook.first_sentence && olBook.first_sentence.length > 0) {
    description = olBook.first_sentence[0];
  } else if (olBook.description) {
    description = typeof olBook.description === 'string' 
      ? olBook.description 
      : olBook.description.value || description;
  }

  return {
    id: olBook.key || `book-${Math.random()}`,
    title: olBook.title || 'Unknown Title',
    authors: olBook.author_name || ['Unknown Author'],
    author: olBook.author_name?.[0] || 'Unknown Author',
    description: description,
    imageUrl: imageUrl,
    categories: olBook.subject || ['General'],
    category: olBook.subject?.[0] || 'General',
    pageCount: olBook.number_of_pages_median || 0,
    publishedDate: olBook.first_publish_year?.toString() || '',
    publisher: olBook.publisher?.[0] || 'Unknown Publisher',
    rating: olBook.ratings_average || 4.5,
    isbn: isbn,
    price: '$' + (Math.random() * 20 + 5).toFixed(2), // Random price for demo
  };
}

// Convert Google Book to Book format (for backward compatibility)
export function googleBookToBook(gbBook: GoogleBookVolume): Book {
  return {
    id: gbBook.id,
    title: gbBook.volumeInfo.title || 'Unknown Title',
    authors: gbBook.volumeInfo.authors || ['Unknown Author'],
    author: gbBook.volumeInfo.authors?.[0] || 'Unknown Author',
    description: gbBook.volumeInfo.description || `${gbBook.volumeInfo.title} is a captivating book.`,
    imageUrl: gbBook.volumeInfo.imageLinks?.thumbnail || '/images/book-placeholder.jpg',
    categories: gbBook.volumeInfo.categories || ['General'],
    category: gbBook.volumeInfo.categories?.[0] || 'General',
    pageCount: gbBook.volumeInfo.pageCount || 0,
    publishedDate: gbBook.volumeInfo.publishedDate || '',
    publisher: gbBook.volumeInfo.publisher || 'Unknown Publisher',
    rating: gbBook.volumeInfo.averageRating || 4.5,
    isbn: gbBook.volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier || '',
    price: gbBook.saleInfo?.listPrice 
      ? `${gbBook.saleInfo.listPrice.currencyCode} ${gbBook.saleInfo.listPrice.amount}`
      : '$14.99',
  };
}

// Convert Google Book to FeaturedBook format (for backward compatibility)
export function googleBookToFeaturedBook(
  gbBook: GoogleBookVolume,
  customData: Partial<FeaturedBook> = {}
): FeaturedBook {
  return {
    id: gbBook.id,
    title: gbBook.volumeInfo.title || customData.title || 'Unknown Title',
    author: gbBook.volumeInfo.authors?.[0] || customData.author || 'Unknown Author',
    tag: customData.tag || 'Featured',
    category: gbBook.volumeInfo.categories?.[0] || customData.category || 'General',
    rating: gbBook.volumeInfo.averageRating || customData.rating || 4.5,
    price: customData.price || '$14.99',
    imageUrl: gbBook.volumeInfo.imageLinks?.thumbnail || customData.imageUrl || '/images/book-placeholder.jpg',
    description: gbBook.volumeInfo.description || customData.description || `${gbBook.volumeInfo.title} is a captivating book.`,
    isbn: gbBook.volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier || customData.isbn,
  };
}