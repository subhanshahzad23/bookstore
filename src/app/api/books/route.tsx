import { NextResponse } from "next/server";
import { getAllBooks } from "@/lib/actions/product.action";

export async function GET(request: Request) {
  const url = new URL(request.url);

  // Get query parameters
  const type = url.searchParams.get("type") || "all";
  const author = url.searchParams.get("author") || "";
  const title = url.searchParams.get("title") || "";
  const isbn = url.searchParams.get("isbn") || "";
  const productGroup = url.searchParams.get("productGroup") || "";
  const publisher = url.searchParams.get("publisher") || "";
  const printYear = url.searchParams.get("printYear") || "";
  // const subject = url.searchParams.get("subject") || "";
  const language = url.searchParams.get("language") || "";
  const condition = parseInt(url.searchParams.get("condition") || "6");
  const days = parseInt(url.searchParams.get("days") || "5");
  const sortBy = url.searchParams.get("sortBy") || "author";
  const currentPage = parseInt(url.searchParams.get("page") || "1");
  const itemsPerPage = parseInt(url.searchParams.get("itemsPerPage") || "30");

  // Fetch all books
  const allBooks = await getAllBooks();

  // Helper function to calculate the difference in days
  const calculateDaysDifference = (bookDate) => {
    const currentDate = new Date();
    const bookDateObj = new Date(bookDate);
    const timeDifference = currentDate - bookDateObj; // Milliseconds difference
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };

  // Map days parameter to actual days range
  const mapDays = (daysValue) => {
    switch (daysValue) {
      case 1:
        return 1; // 1 day
      case 2:
        return 7; // 7 days
      case 3:
        return 14; // 14 days
      case 4:
        return 30; // 30 days
      case 5:
        return Infinity; // All
      default:
        return Infinity; // Default to "all" if invalid
    }
  };

  // Filter books
  const filteredBooks = allBooks.filter((book) => {
    const matchesType =
      type === "all" || (type === "new" ? book.tila : !book.tila);
    const matchesAuthor =
      author === "" || book.tekija.toLowerCase().includes(author.toLowerCase());
    const matchesTitle =
      title === "" || book.nimi.toLowerCase().includes(title.toLowerCase());
    const matchesLanguage =
      language === "" ||
      book.kieli.toLowerCase().includes(language.toLowerCase());
    const matchesISBN = isbn === "" || book.isbn.includes(isbn);
    const matchesProductGroup =
      productGroup === "" || book.tuoteryhma === parseInt(productGroup, 10);

    const matchesPublisher =
      publisher === "" ||
      book.kustantajaHaku.toLowerCase().includes(publisher.toLowerCase());
    const matchesPrintYear = printYear === "" || book.painovuosi === printYear;
    // const matchesSubject =
    //   subject === "" ||
    //   book.subject?.toLowerCase().includes(subject.toLowerCase());

    const bookConditionValue = parseInt(book.kunto.replace("K", ""), 10); // Convert book's 'Kx' to numeric value
    const matchesCondition = condition === 6 || bookConditionValue >= condition;

    // Days filter
    const daysDifference = calculateDaysDifference(book.pvm);
    // Get the maximum days allowed based on the mapping
    const maxDays = mapDays(days);
    const matchesDays = maxDays === Infinity || daysDifference <= maxDays;

    // Combine all filters
    return (
      matchesType &&
      matchesAuthor &&
      matchesTitle &&
      matchesISBN &&
      matchesProductGroup &&
      matchesPublisher &&
      matchesPrintYear &&
      // matchesSubject &&
      matchesLanguage &&
      matchesCondition &&
      matchesDays // Include the days filter
    );
  });

  // Sort books
  const sortedBooks = filteredBooks.sort((a, b) => {
    if (sortBy === "author") return a.tekija.localeCompare(b.tekija);
    if (sortBy === "title") return a.nimi.localeCompare(b.nimi);
    if (sortBy === "price") return a.hinta - b.hinta;
    return 0;
  });

  // Paginate books
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = sortedBooks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return NextResponse.json({
    books: paginatedBooks,
    totalResults: filteredBooks.length,
    totalPages: Math.ceil(filteredBooks.length / itemsPerPage),
    currentPage,
    itemsPerPage,
  });
}
