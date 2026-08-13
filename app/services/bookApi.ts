import {
  Book,
  FeaturedBook,
  GoogleBookVolume,
  GoogleBookResponse,
  OpenLibraryBook,
  OpenLibrarySearchResponse,
  OpenLibraryBookResponse,
  openLibraryToBook,
  openLibraryToFeaturedBook,
  googleBookToBook,
  googleBookToFeaturedBook,
} from "@/app/types";

import {
  CUSTOM_FEATURED_BOOKS,
  FALLBACK_FEATURED_BOOKS,
} from "../data/featureBooks";

// ==========================================
// OPEN LIBRARY API CONFIGURATION
// ==========================================

const OPEN_LIBRARY_API_URL = "https://openlibrary.org/api/books";
const OPEN_LIBRARY_SEARCH_URL = "https://openlibrary.org/search.json";
const OPEN_LIBRARY_COVER_URL = "https://covers.openlibrary.org/b";

// Explicit fields list — per Open Library docs, the search endpoint does NOT
// return every field by default. Fields like isbn, subject, ratings_average,
// publisher, and first_sentence must be requested explicitly or they come
// back undefined, silently breaking covers/descriptions/categories downstream.
const SEARCH_FIELDS = [
  "key",
  "title",
  "author_name",
  "first_publish_year",
  "cover_i",
  "cover_edition_key",
  "isbn",
  "subject",
  "ratings_average",
  "ratings_count",
  "number_of_pages_median",
  "publisher",
  "first_sentence",
  "language",
  "ebook_access",
].join(",");

// ==========================================
// FALLBACK BOOKS DATA - Always available
// ==========================================

const FALLBACK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    authors: ['F. Scott Fitzgerald'],
    description: 'A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    imageUrl: '/images/book-placeholder.jpg',
    category: 'Fiction',
    categories: ['Fiction'],
    price: '$14.99',
    rating: 4.5,
    isbn: '9780743273565'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    authors: ['Harper Lee'],
    description: 'The story of racial injustice and the loss of innocence in the American South.',
    imageUrl: '/images/book-placeholder.jpg',
    category: 'Fiction',
    categories: ['Fiction'],
    price: '$12.99',
    rating: 4.8,
    isbn: '9780061120084'
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    authors: ['George Orwell'],
    description: 'A dystopian novel set in a totalitarian society ruled by Big Brother.',
    imageUrl: '/images/book-placeholder.jpg',
    category: 'Fiction',
    categories: ['Fiction', 'Dystopian'],
    price: '$11.99',
    rating: 4.7,
    isbn: '9780451524935'
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    authors: ['Jane Austen'],
    description: 'The story of Elizabeth Bennet as she navigates issues of manners, upbringing, and marriage.',
    imageUrl: '/images/book-placeholder.jpg',
    category: 'Romance',
    categories: ['Romance', 'Fiction'],
    price: '$13.99',
    rating: 4.6,
    isbn: '9780141439518'
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    authors: ['J.R.R. Tolkien'],
    description: 'A fantasy adventure about Bilbo Baggins on a quest to reclaim the Lonely Mountain.',
    imageUrl: '/images/book-placeholder.jpg',
    category: 'Fantasy',
    categories: ['Fantasy', 'Fiction'],
    price: '$15.99',
    rating: 4.8,
    isbn: '9780547928227'
  },
  {
    id: '6',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    authors: ['J.D. Salinger'],
    description: 'The story of Holden Caulfield and his experiences in New York City.',
    imageUrl: '/images/book-placeholder.jpg',
    category: 'Fiction',
    categories: ['Fiction'],
    price: '$10.99',
    rating: 4.3,
    isbn: '9780316769488'
  },
  {
    id: '7',
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    authors: ['Dan Brown'],
    description: 'A mystery thriller about a symbologist investigating a murder in the Louvre.',
    imageUrl: '/images/book-placeholder.jpg',
    category: 'Mystery',
    categories: ['Mystery', 'Thriller'],
    price: '$16.99',
    rating: 4.2,
    isbn: '9780385504201'
  },
  {
    id: '8',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    authors: ['Paulo Coelho'],
    description: 'A philosophical novel about a young shepherd on a journey to find his personal legend.',
    imageUrl: '/images/book-placeholder.jpg',
    category: 'Fiction',
    categories: ['Fiction', 'Philosophy'],
    price: '$12.99',
    rating: 4.5,
    isbn: '9780062502174'
  },
  {
    id: '9',
    title: 'The Shining',
    author: 'Stephen King',
    authors: ['Stephen King'],
    description: 'A horror novel about a writer who becomes the winter caretaker of an isolated hotel.',
    imageUrl: '/images/book-placeholder.jpg',
    category: 'Thriller',
    categories: ['Thriller', 'Horror'],
    price: '$14.99',
    rating: 4.4,
    isbn: '9780307743657'
  }
];

// ==========================================
// HELPER: Get buy link
// ==========================================

function getBuyLink(bookKey: string | undefined, isbn: string): string {
  if (isbn) {
    return `https://openlibrary.org/isbn/${isbn}`;
  }
  if (bookKey) {
    return `https://openlibrary.org${bookKey.startsWith('/') ? bookKey : `/${bookKey}`}`;
  }
  return 'https://openlibrary.org';
}

// ==========================================
// FETCH FEATURED BOOKS
// ==========================================

const FEATURED_BOOK_SOURCE =
  CUSTOM_FEATURED_BOOKS?.length > 0 ? CUSTOM_FEATURED_BOOKS : FALLBACK_FEATURED_BOOKS;

export async function fetchFeaturedBooks(): Promise<FeaturedBook[]> {
  if (!FEATURED_BOOK_SOURCE || FEATURED_BOOK_SOURCE.length === 0) {
    console.warn('No featured book source found');
    return [];
  }

  const fallbackBooks: FeaturedBook[] = FEATURED_BOOK_SOURCE.map((customBook) => ({
    id: customBook.id,
    title: customBook.title,
    author: customBook.author,
    tag: customBook.tag,
    category: customBook.category,
    rating: 4.5,
    price: customBook.price,
    imageUrl: "/images/book-placeholder.jpg",
    description: `${customBook.title} is a captivating book.`,
    isbn: customBook.isbn,
  }));

  console.log(`📚 Using ${fallbackBooks.length} fallback books initially`);

  const enrichedResults = await Promise.all(
    fallbackBooks.map(async (book) => {
      try {
        if (!book.isbn) {
          console.log(`⏭️ Skipping ${book.title} - no ISBN`);
          return book;
        }

        console.log(`🔍 Fetching data for ${book.title} (ISBN: ${book.isbn})...`);

        const response = await fetch(
          `${OPEN_LIBRARY_API_URL}?bibkeys=ISBN:${book.isbn}&format=json&jscmd=data`,
          {
            cache: "no-store",
            signal: AbortSignal.timeout(5000)
          }
        );

        if (!response.ok) {
          console.warn(`⚠️ API returned ${response.status} for ${book.title}`);
          return book;
        }

        const data: OpenLibraryBookResponse = await response.json();
        const key = `ISBN:${book.isbn}`;

        if (!data?.[key]) {
          console.warn(`⚠️ No data found for ${book.title} (key "${key}" missing from response)`);
          return book;
        }

        const olBook = data[key];
        console.log(`🔍 RAW enrichment data for "${book.title}":`, JSON.stringify(olBook, null, 2))  // ADD THIS
        let updatedBook = { ...book };

        if (olBook.authors && olBook.authors.length > 0) {
          updatedBook.author = olBook.authors[0].name;
        }

        if (olBook.description) {
          updatedBook.description =
            typeof olBook.description === "string"
              ? olBook.description
              : olBook.description.value || updatedBook.description;
        }

        if (olBook.cover) {
          updatedBook.imageUrl =
            olBook.cover.large ||
            olBook.cover.medium ||
            olBook.cover.small ||
            updatedBook.imageUrl;
        }

        if (olBook.ratings_average) {
          updatedBook.rating = olBook.ratings_average;
        }

        console.log(`✅ Enriched ${updatedBook.title} with API data`);
        return updatedBook;

      } catch (error) {
        console.warn(`❌ Failed to enrich ${book.title}:`, error);
        return book;
      }
    })
  );

  console.log(`✅ Returned ${enrichedResults.length} featured books`);
  return enrichedResults;
}

// ==========================================
// SEARCH BOOKS - Returns Book[]
// ==========================================

export async function searchBooks(query: string): Promise<Book[]> {
  if (!query || !query.trim()) {
    console.warn('searchBooks called with empty query');
    return [];
  }

  try {
    const url = `${OPEN_LIBRARY_SEARCH_URL}?q=${encodeURIComponent(query)}&fields=${SEARCH_FIELDS}&limit=20`;
    console.log(`🔍 Searching Open Library: ${url}`);

    const response = await fetch(url, {
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      console.error(`⚠️ Open Library returned HTTP ${response.status} for query "${query}"`);
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: OpenLibrarySearchResponse = await response.json();

    // Open Library's docs use "num_found" in some examples and "numFound" in
    // others depending on API version — check both rather than assuming one.
    const foundCount = (data as any).num_found ?? (data as any).numFound ?? data.docs?.length ?? 0;
    console.log(`📚 Open Library found ${foundCount} results, ${data.docs?.length || 0} docs returned`);

    if (!data.docs || data.docs.length === 0) {
      console.warn(`No docs returned for query "${query}"`);
      return [];
    }

    const books: Book[] = data.docs.map((olBook: OpenLibraryBook) => {
      const isbn = olBook.isbn?.[0] || '';
      const olid = olBook.cover_edition_key || '';

      let imageUrl = '/images/book-placeholder.jpg';
if (olBook.cover_i) {
  imageUrl = `${OPEN_LIBRARY_COVER_URL}/id/${olBook.cover_i}-M.jpg?default=false`;
} else if (isbn) {
  imageUrl = `${OPEN_LIBRARY_COVER_URL}/isbn/${isbn}-M.jpg?default=false`;
} else if (olid) {
  imageUrl = `${OPEN_LIBRARY_COVER_URL}/olid/${olid}-M.jpg?default=false`;
}

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
        author: olBook.author_name?.[0] || 'Unknown Author',
        authors: olBook.author_name || ['Unknown Author'],
        description: description,
        imageUrl: imageUrl,
        category: olBook.subject?.[0] || 'General',
        categories: olBook.subject || ['General'],
        pageCount: olBook.number_of_pages_median || 0,
        publishedDate: olBook.first_publish_year?.toString() || '',
        publisher: olBook.publisher?.[0] || 'Unknown Publisher',
        rating: olBook.ratings_average || 4.5,
        isbn: isbn,
        price: '$14.99', 
      };
    });

    console.log(`✅ Mapped ${books.length} books for query "${query}"`);
    return books;
  } catch (error) {
    console.error(`❌ Error searching books for "${query}":`, error);
    return [];
  }
}

// ==========================================
// SEARCH BOOKS (Google Books format) - For backward compatibility
// ==========================================

export async function searchBooksGoogleFormat(query: string): Promise<GoogleBookVolume[]> {
  if (!query || !query.trim()) {
    console.warn('searchBooksGoogleFormat called with empty query');
    return [];
  }

  try {
    const url = `${OPEN_LIBRARY_SEARCH_URL}?q=${encodeURIComponent(query)}&fields=${SEARCH_FIELDS}&limit=20`;

    const response = await fetch(url, {
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: OpenLibrarySearchResponse = await response.json();

    if (!data.docs || data.docs.length === 0) {
      return [];
    }

    const books: GoogleBookVolume[] = data.docs.map((olBook: OpenLibraryBook) => {
      const isbn = olBook.isbn?.[0] || "";
      const olid = olBook.cover_edition_key || "";
      const bookKey = olBook.key || "";
const thumbnail = olBook.cover_i
  ? `${OPEN_LIBRARY_COVER_URL}/id/${olBook.cover_i}-M.jpg?default=false`
  : isbn
  ? `${OPEN_LIBRARY_COVER_URL}/isbn/${isbn}-M.jpg?default=false`
  : olid
  ? `${OPEN_LIBRARY_COVER_URL}/olid/${olid}-M.jpg?default=false`
  : "/images/book-placeholder.jpg";

const smallThumbnail = olBook.cover_i
  ? `${OPEN_LIBRARY_COVER_URL}/id/${olBook.cover_i}-S.jpg?default=false`
  : isbn
  ? `${OPEN_LIBRARY_COVER_URL}/isbn/${isbn}-S.jpg?default=false`
  : olid
  ? `${OPEN_LIBRARY_COVER_URL}/olid/${olid}-S.jpg?default=false`
  : "/images/book-placeholder.jpg";

      return {
        id: bookKey || olid || `book-${Math.random()}`,
        volumeInfo: {
          title: olBook.title || "Unknown Title",
          authors: olBook.author_name || ["Unknown Author"],
          description:
            olBook.first_sentence?.[0] ||
            `${olBook.title} - A book from Open Library`,
          imageLinks: {
            thumbnail,
            smallThumbnail,
          },
          categories: olBook.subject || ["General"],
          averageRating: olBook.ratings_average || 4.5,
          ratingsCount: olBook.ratings_count || 0,
          pageCount: olBook.number_of_pages_median || 0,
          publishedDate: olBook.first_publish_year?.toString() || "",
          publisher: olBook.publisher?.[0] || "Unknown Publisher",
          industryIdentifiers: isbn
            ? [
                {
                  type: "ISBN_13",
                  identifier: isbn,
                },
              ]
            : [],
        },
        saleInfo: {
          buyLink: getBuyLink(bookKey, isbn),
        },
        accessInfo: {
          country: "US",
          viewability: "PARTIAL",
          embeddable: true,
          publicDomain: true,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: true,
          },
          pdf: {
            isAvailable: true,
          },
          webReaderLink: `https://openlibrary.org${bookKey || ''}`,
          accessViewStatus: "SAMPLE",
          quoteSharingAllowed: false,
        },
        etag: bookKey || "",
        kind: "books#volume",
        selfLink: `https://openlibrary.org${bookKey || ''}`,
      };
    });

    return books;
  } catch (error) {
    console.error(`Error searching books for "${query}":`, error);
    return [];
  }
}

// ==========================================
// GET ALL BOOKS (with fallback)
// ==========================================

export async function getAllBooks(): Promise<Book[]> {
  try {
    console.log('📚 Fetching all books...');

    const books = await searchBooks('fiction');

    if (books && books.length > 0) {
      console.log(`✅ Found ${books.length} books from API`);
      return books;
    }

    console.log('⚠️ No books from API, using fallback data');
    return FALLBACK_BOOKS;
  } catch (error) {
    console.error('Error fetching books:', error);
    return FALLBACK_BOOKS;
  }
}

// ==========================================
// GET BOOK BY ISBN
// ==========================================

export async function fetchBookByIsbn(isbn: string): Promise<Book | null> {
  try {
    const response = await fetch(
      `${OPEN_LIBRARY_API_URL}?bibkeys=ISBN:${isbn}&format=json&jscmd=data`,
      {
        signal: AbortSignal.timeout(5000)
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: OpenLibraryBookResponse = await response.json();
    const key = `ISBN:${isbn}`;

    if (!data?.[key]) {
      return null;
    }

    const olBook = data[key];
    return openLibraryToBook(olBook);
  } catch (error) {
    console.error(`Error fetching ISBN ${isbn}:`, error);
    return null;
  }
}

// ==========================================
// GET BOOK BY ID
// ==========================================

export async function getBookById(id: string): Promise<Book | null> {
  try {
    const books = await getAllBooks();
    return books.find(book => book.id === id) || null;
  } catch (error) {
    console.error(`Error fetching book ${id}:`, error);
    return null;
  }
}

// ==========================================
// GET BOOK COVER URL
// ==========================================

export function getBookCoverUrl(isbn: string | undefined, olid: string | undefined): string {
  if (isbn) {
    return `${OPEN_LIBRARY_COVER_URL}/isbn/${isbn}-L.jpg`;
  }
  if (olid) {
    return `${OPEN_LIBRARY_COVER_URL}/olid/${olid}-L.jpg`;
  }
  return '/images/book-placeholder.jpg';
}

// ==========================================
// GET BOOK COVER (from Google Book format)
// ==========================================

export function getBookCoverUrlFromGoogle(book: GoogleBookVolume | null): string {
  if (!book) {
    return "/images/book-placeholder.jpg";
  }

  const imageLinks = book.volumeInfo.imageLinks;

  if (!imageLinks) {
    return "/images/book-placeholder.jpg";
  }

  return (
    imageLinks.thumbnail ||
    imageLinks.smallThumbnail ||
    "/images/book-placeholder.jpg"
  );
}

// ==========================================
// GET DESCRIPTION
// ==========================================

export function getBookDescription(
  book: GoogleBookVolume | null,
  fallback: string
): string {
  if (!book) {
    return fallback;
  }

  return book.volumeInfo.description || fallback;
}

// ==========================================
// GET RATING
// ==========================================

export function getBookRating(
  book: GoogleBookVolume | null,
  fallback: number = 4.5
): number {
  if (!book) {
    return fallback;
  }

  return book.volumeInfo.averageRating || fallback;
}