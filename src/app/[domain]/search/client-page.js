"use client";
import React, { useEffect, useState } from "react";
import FilterSidebar, { FilterMobile } from "@/components/filter";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import SearchBookCard from "@/components/search-book-card";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { BookIcon } from "lucide-react";

export default function ServerPage({
  books: initialBooks,
  filters,
  setFilters,
  currentPage: initialCurrentPage,
  itemsPerPage: initialItemsPerPage,
  totalResults: initialTotalResults,
  totalPages: initialTotalPages,
  sortBy: initialSortBy,
  updateFilters,
}) {
  // Local state for dynamic filtering and pagination
  // const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [books, setBooks] = useState(initialBooks);
  const [totalResults, setTotalResults] = useState(initialTotalResults);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value, // Dynamically update the filter key
    }));
  };

  useEffect(() => {
    setBooks(initialBooks);
    setTotalResults(initialTotalResults || 0);
    setTotalPages(initialTotalPages || 0);
    setCurrentPage(initialCurrentPage || 1);
  }, [initialBooks]);

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    fetchBooks({ ...filters, sortBy: newSort, itemsPerPage, currentPage: 1 });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    fetchBooks({
      ...filters,
      sortBy,
      itemsPerPage: newItemsPerPage,
      currentPage: 1,
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return; // Ensure valid page numbers

    setCurrentPage(newPage); // Update current page state

    // Update URL without reloading the page
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("page", newPage.toString());
    window.history.pushState({}, "", newUrl);

    // Fetch books for the new page
    window.location.reload();
  };

  const fetchBooks = async (query) => {
    const queryParams = new URLSearchParams({
      ...query,
      currentPage: query.currentPage.toString(),
      itemsPerPage: query.itemsPerPage.toString(),
    }).toString();

    try {
      const response = await fetch(`/api/books?${queryParams}`);
      const data = await response.json();
      setBooks(data.books || []);
      setTotalResults(data.totalResults || 0);
      setTotalPages(data.totalPages || 0);
      setCurrentPage(data.currentPage || 1);
    } catch (error) {
      console.log("Error fetching books:", error);
    }
  };

  const onClearFilters = async () => {
    const clearedFilters = {
      type: "all",
      author: "",
      title: "",
      language: "",
      sortBy: "author",
      page: "1",
      itemsPerPage: "10",
      isbn: "",
      productGroup: "",
      publisher: "",
      printYear: "",
      subject: "",

      condition: "6",
      days: "5",
    }; // Define empty or default filters
    setFilters(clearedFilters);

    updateFilters(clearedFilters);
  };

  return (
    <>
      <MaxWidthWrapper className="my-4 mt-[160px] pt-16">
        <h2 className="text-4xl font-bold playfair-display">Haku</h2>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="my-4">
        <div className="w-full min-h-screen flex h-fit items-start justify-start">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            updateFilters={updateFilters}
            onClearFilters={onClearFilters}
          />

          <div className="w-full flex-grow min-h-[400px] h-fit">
            <div className="w-full min-h-[300px] h-fit flex flex-col gap-y-4">
              <div className="w-full h-[100px] flex justify-between space-y-2 px-4 md:px-8">
                <div className="h-full w-fit">
                  <h2 className="text-3xl md:text-5xl font-bold playfair-display">
                    Hakutulokset
                  </h2>
                  <p>
                    Haulla löytyi {totalResults} tuotetta (sivu {currentPage} /{" "}
                    {totalPages})
                  </p>
                </div>
                <FilterMobile
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  updateFilters={updateFilters}
                  onClearFilters={onClearFilters}
                />
              </div>

              <div className="flex flex-col md:flex-row items-start justify-start gap-y-2 md:items-center md:justify-between px-4 md:px-8">
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[380px]">
                    <SelectValue placeholder="Tekijän mukaan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="author">Tekijän mukaan</SelectItem>
                    <SelectItem value="title">Nimen mukaan</SelectItem>
                    <SelectItem value="price">Hinnan mukaan</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-x-4 items-center">
                  <span>Tuloksia sivulla</span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) =>
                      handleItemsPerPageChange(parseInt(value))
                    }
                  >
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder={itemsPerPage.toString()} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="w-full h-fit flex flex-col gap-y-4 px-4 md:px-8">
                {books.length == 0 ? (
                  <div className="w-full py-16 flex flex-col items-center justify-center text-gray-500">
                    <BookIcon size={48} className="mb-4" />
                    <p className="text-lg">Ei hakutuloksia</p>
                  </div>
                ) : (
                  <div>
                    {books.map((item) => (
                      <SearchBookCard key={item._id} book={item} />
                    ))}
                  </div>
                )}
              </div>

              <div className="pagination-container flex gap-2 justify-center items-center mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                  disabled={currentPage <= 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>

                {[...Array(totalPages).keys()].map((i) => (
                  <button
                    key={i}
                    className={`px-4 py-2 rounded ${
                      i + 1 === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                  disabled={currentPage >= totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
