import { Search, Book as BookIcon } from "lucide-react";
import ProductReel from "@/components/books-reel";
import getVendor from "@/lib/getVendor";
import Link from "next/link";
import { getAllGroups, getAllLanguages } from "@/lib/actions/product.action";
import { findBooks } from "@/lib/actions/product.action"; // Import fetchBooks

const BookSearch = async ({ allBooks, searchParams }) => {
  const vendor = await getVendor();
  const languages = await getAllLanguages();
  const groups = await getAllGroups();

  // Extract search parameters from the URL
  const query = searchParams?.query || "";
  const language = searchParams?.language || "";
  const productGroup = searchParams?.productGroup || "";
  const author = searchParams?.author || "";

  // Fetch books based on search parameters using fetchBooks
  const filteredBooks = await findBooks({
    title: query,
    language,
    productGroup,
    author,
  });

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Search Section */}
      <div
        className="w-full min-h-[340px] h-fit rounded-2xl flex flex-col gap-y-4 p-8 md:p-4"
        style={{ backgroundColor: vendor?.colors[0].hex }}
      >
        <span className="text-4xl font-bold playfair-display">Hae Kirjoja</span>

        <form
          method="GET"
          action="/books" // Replace with the correct URL
          className="w-full h-fit flex flex-col md:flex-row gap-y-4"
        >
          <div className="w-full md:w-[80%] min-h-[200px] h-fit grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-y-2 md:col-span-2">
              <span className="font-bold">Nimike / Kirjailija</span>
              <div className="relative">
                <input
                  name="query"
                  defaultValue={query}
                  className="w-full h-[50px] bg-white rounded-lg border border-[#757575] px-4 pr-10"
                  placeholder="Hae nimikkeellä tai kirjailijalla..."
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <span className="font-bold">Kieli</span>
              <select
                name="language"
                defaultValue={language}
                className="w-full h-[50px] bg-white rounded-lg border border-[#757575] px-4"
                id="language"
              >
                <option value="">Valitse kieli</option>
                {languages
                  .filter((language) => language) // Filters out empty strings or falsy values
                  .map((language, index) => (
                    <option key={index} value={language}>
                      {language}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex flex-col gap-y-2">
              <span className="font-bold">Tuoteryhmä</span>
              <select
                name="productGroup"
                defaultValue={productGroup}
                className="w-full h-[50px] bg-white rounded-lg border border-[#757575] px-4"
              >
                <option value="">Valitse tuoteryhmä</option>
                {groups.map((group) => (
                  <option key={group._id} value={group._id}>
                    {group.nimi}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full md:w-[20%] h-[70px] md:h-[220px] md:pt-7 flex flex-col justify-between items-start md:items-center">
            <button
              type="submit"
              className="bg-[#FFC767] px-10 w-[80%] min-w-[200px] h-[50px] mt-1 font-bold hover:bg-[#FFB647] transition-colors"
            >
              Hae
            </button>
            <Link
              href="/books" // Replace with the URL to reset filters
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Tyhjennä haku
            </Link>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold playfair-display">
            Hakutulokset ({filteredBooks?.length})
          </h2>
        </div>

        {filteredBooks?.length > 0 ? (
          <ProductReel books={filteredBooks} title="Hakutulokset" />
        ) : (
          <div className="w-full py-16 flex flex-col items-center justify-center text-gray-500">
            <BookIcon size={48} className="mb-4" />
            <p className="text-lg">Ei hakutuloksia</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSearch;