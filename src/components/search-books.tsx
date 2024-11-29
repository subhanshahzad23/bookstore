"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getAllLanguages } from "@/lib/actions/product.action";

interface FormData {
  book: string;
  author: string;
  language: string;
}

const SearchForm = (): JSX.Element => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    book: "",
    author: "",
    language: "Valitse kieli", // Default option
  });

  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      const langs = await getAllLanguages();
      const filteredLangs = langs.filter((lang) => lang.trim() !== ""); // Filter out empty or whitespace-only values
      setLanguages(filteredLangs);
    };
    fetchLanguages();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof FormData
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSearch = (): void => {
    const searchParams = new URLSearchParams();
    if (formData.book) searchParams.set("query", formData.book);
    if (formData.author) searchParams.set("author", formData.author);
    if (formData.language !== "Valitse kieli")
      searchParams.set("language", formData.language);

    router.push(`/books?${searchParams.toString()}`);
  };

  return (
    <div className="h-fit w-full bg-[#F5F5F5] py-8 rounded-2xl">
      <div className="w-full h-[50px] flex items-center justify-center gap-x-4">
        <h2 className="text-black text-[32px] font-bold playfair-display">
          PIKAHAKU
        </h2>
      </div>
      <div className="w-full my-4 flex flex-col items-center min-h-[260px] h-fit gap-x-4">
        <div className="h-[50px] w-[450px] md:w-[600px] flex items-center justify-center gap-x-2">
          <span className="text-black font-bold text-2xl">Kirja</span>
          <input
            className="border-black w-[235px] md:w-[385px] bg-white border-[1px] h-[32px] px-2"
            value={formData.book}
            onChange={(e) => handleInputChange(e, "book")}
            type="text"
            aria-label="Book search"
          />
        </div>
        <div className="h-[50px] w-[450px] md:w-[600px] flex items-center justify-center gap-x-2 mr-[37px]">
          <span className="text-black font-bold text-2xl">Kirjailija</span>
          <input
            className="border-black w-[235px] md:w-[385px] bg-white border-[1px] h-[32px] px-2"
            value={formData.author}
            onChange={(e) => handleInputChange(e, "author")}
            type="text"
            aria-label="Author search"
          />
        </div>
        <div className="h-[50px] w-[450px] md:w-[600px] flex items-center justify-center gap-x-2">
          <span className="text-black font-bold text-2xl">Kieli</span>
          <select
            value={formData.language}
            onChange={(e) => handleInputChange(e, "language")}
            className="border-black w-[235px] md:w-[385px] px-2 bg-white border-[1px] h-[32px]"
            aria-label="Language selection"
          >
            <option disabled>Valitse kieli</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-[600px] h-[100px] flex items-center justify-center md:justify-end md:pr-20">
          <Button
            onClick={handleSearch}
            className="bg-[#FFC767] cursor-pointer hover:bg-[#da9c33] w-[154px] p-4 px-6"
          >
            Hae
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
