"use client";

import { useState, useEffect } from "react";
import ClientPage from "./client-page";
import { useSearchParams, useRouter } from "next/navigation";

async function fetchBooks(queryParams: string) {
  try {
    console.log("Query Params:", queryParams); // Debug query parameters
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/books?${queryParams}`,
      {
        cache: "no-store",
      }
    );
    const data = await response.json();
    console.log("Fetched Data:", data); // Debug response data
    return data;
  } catch (error) {
    console.log("Error fetching books:", error);
    return { books: [], totalResults: 0, totalPages: 0, currentPage: 1 };
  }
}

const SearchPage = () => {
  const searchParams = useSearchParams(); // Hook to read query parameters
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // State for filter and pagination
  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "all",
    author: searchParams.get("author") || "",
    title: searchParams.get("title") || "",
    language: searchParams.get("language") || "",
    isbn: searchParams.get("isbn") || "",
    productGroup: searchParams.get("productGroup") || "",
    publisher: searchParams.get("publisher") || "",
    printYear: searchParams.get("printYear") || "",
    subject: searchParams.get("subject") || "",
    condition: parseInt(searchParams.get("condition") || "6"),
    days: parseInt(searchParams.get("days") || "5"),
    sortBy: searchParams.get("sortBy") || "author",
    page: parseInt(searchParams.get("page") || "1"),
    itemsPerPage: parseInt(searchParams.get("itemsPerPage") || "10"),
  });

  const [data, setData] = useState({
    books: [],
    totalResults: 0,
    totalPages: 0,
    currentPage: 1,
  });

  // Fetch books when filters change
  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(filters as any).toString();
      const fetchedData = await fetchBooks(queryParams);

      console.log(fetchedData);

      setData(fetchedData);
    };
    fetchData();
  }, []);

  // Update filters and sync to URL
  const updateFilters = async (updatedFilters: Partial<typeof filters>) => {
    const newFilters = { ...filters, ...updatedFilters };
    setFilters(newFilters);

    // Update URL without reloading the page
    const queryParams = new URLSearchParams(newFilters as any).toString();
    const fetchedData = await fetchBooks(queryParams);
    setData(fetchedData);

    router.push(`/search?${queryParams}`);

    // window.location.href = `/search?${queryParams}`;
  };

  if (data.books.length >= 0) {
    return (
      <ClientPage
        // setLoading={setLoading}
        books={data.books}
        totalResults={data.totalResults}
        totalPages={data.totalPages}
        currentPage={filters.page}
        itemsPerPage={filters.itemsPerPage}
        sortBy={filters.sortBy}
        filters={filters}
        setFilters={setFilters}
        updateFilters={updateFilters}
      />
    );
  }
};

export default SearchPage;
