/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, type FC } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getAllGroups, getAllLanguages } from "@/lib/actions/product.action";

interface FilterProps {
  filters: {
    type: "all" | "new" | "used";
    author: string;
    title: string;
    isbn: string;
    productGroup: string;
    publisher: string;
    printYear: string;
    subject: string;
    language: string;
    condition: number;
    days: number;
  };
  onFilterChange: (key: string, value: any) => void;
  updateFilters: (filters: FilterProps["filters"]) => void; // Add a new parameter to updateFilters to accept the new filters state as an argument.
  onClearFilters: () => void;
}

const FilterSidebar: FC<FilterProps> = ({
  filters,
  onFilterChange,
  updateFilters,
  onClearFilters,
}) => {
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const lang = await getAllLanguages();
      const g = await getAllGroups();

      setLanguages(lang);
      setGroups(g);
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    setLoading(true);
    updateFilters(filters); // Assuming this triggers a search
    setLoading(false);
  };

  return (
    <div className="w-[0] hidden xl:block xl:w-[350px] min-h-[500px] h-fit flex-shrink-0">
      <div className="w-full h-[45px] rounded-2xl bg-[#F0F0F0] grid grid-cols-3 overflow-hidden">
        <button
          className={`w-full h-full border font-bold ${
            filters?.type === "all" ? "bg-[#FFC767]" : "bg-transparent"
          }`}
          onClick={() => onClearFilters()}
        >
          Kaikki
        </button>
        <button
          className={`w-full h-full border font-bold ${
            filters?.type === "new" ? "bg-[#FFC767]" : "bg-transparent"
          }`}
          onClick={() => {
            const updatedFilterType = { ...filters, type: "new" };
            updateFilters(updatedFilterType);
          }}
        >
          Uudet
        </button>
        <button
          className={`w-full h-full border font-bold ${
            filters?.type === "used" ? "bg-[#FFC767]" : "bg-transparent"
          }`}
          onClick={() => {
            const updatedFilterType = { ...filters, type: "used" };
            updateFilters(updatedFilterType);
          }}
        >
          Käytetyt
        </button>
      </div>

      <div className="w-full min-h-[200px] h-fit my-8 rounded-2xl bg-[#F5F5F5] p-4">
        <div className="w-full flex flex-col gap-y-4">
          <h2 className="font-bold text-xl">Hakuehdot</h2>
          <input
            className="w-full h-[50px] rounded-lg border border-[#757575] px-4"
            placeholder="Tekijä"
            value={filters?.author}
            onChange={(e) => onFilterChange("author", e.target.value)}
          />
          <input
            className="w-full h-[50px] rounded-lg border border-[#757575] px-4"
            placeholder="Nimike"
            value={filters?.title}
            onChange={(e) => onFilterChange("title", e.target.value)}
          />
          <input
            className="w-full h-[50px] rounded-lg border border-[#757575] px-4"
            placeholder="ISBN"
            value={filters?.isbn}
            onChange={(e) => onFilterChange("isbn", e.target.value)}
          />
          <select
            name="productGroup"
            value={filters?.productGroup}
            className="w-full h-[50px] bg-white rounded-lg border border-[#757575] px-4"
            onChange={(e) => onFilterChange("productGroup", e.target.value)}
          >
            <option value="">Valitse tuoteryhmä</option>
            {/* Replace with dynamically generated options */}
            {groups.map((groups) => (
              <option key={groups.nimi} value={groups._id}>
                {groups.nimi}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex flex-col gap-y-4 my-4">
          <h2 className="font-bold text-xl">Tarkennettu kirjahaku</h2>

          <input
            className="w-full h-[50px] rounded-lg border border-[#757575] px-4"
            placeholder="Kustantaja"
            value={filters?.publisher}
            onChange={(e) => onFilterChange("publisher", e.target.value)}
          />
          <input
            className="w-full h-[50px] rounded-lg border border-[#757575] px-4"
            placeholder="Painovuosi"
            value={filters?.printYear}
            onChange={(e) => onFilterChange("printYear", e.target.value)}
          />
          <input
            className="w-full h-[50px] rounded-lg border border-[#757575] px-4"
            placeholder="Aihesana"
            value={filters?.subject}
            onChange={(e) => onFilterChange("subject", e.target.value)}
          />
          <select
            name="language"
            value={filters?.language}
            className="w-full h-[50px] bg-white rounded-lg border border-[#757575] px-4"
            onChange={(e) => onFilterChange("language", e.target.value)}
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

        <div className="w-full flex flex-col gap-y-4 my-4">
          <h2 className="font-bold text-xl">Tuotteen ominaisuudet</h2>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">
              Kuntoluokitus
            </label>
            <input
              type="range"
              min={1}
              max={6}
              value={filters?.condition}
              onChange={(e) =>
                onFilterChange("condition", Number(e.target.value))
              }
              className="w-full cursor-pointer bg-[#D9D9D9] h-1 accent-[#FFC767]"
            />
            <div className="flex justify-between text-sm mt-2">
              <span>K1</span>
              <span className="ml-2">K2</span>
              <span className="ml-4">K3</span>
              <span className="ml-5">K4</span>
              <span className="ml-5">K5</span>
              <span>Kaikki</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Päivärajaus</label>
          <input
            type="range"
            min={1}
            max={5}
            value={filters?.days}
            onChange={(e) => onFilterChange("days", Number(e.target.value))}
            className="w-full cursor-pointer accent-[#FFC767]"
          />
          <div className="flex justify-between text-sm mt-2">
            <span>1</span>
            <span>7</span>
            <span>14</span>
            <span>30</span>
            <span>*</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[120px] items-center flex flex-col gap-y-2">
        <button
          className={`w-full h-[60px] ${
            loading ? "bg-gray-300" : "bg-[#FFC767]"
          } font-bold`}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Ladataan..." : "Hae"}
        </button>
        <button className="w-full h-[60px]" onClick={onClearFilters}>
          Tyhjennä haku
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
export function FilterMobile({
  filters,
  onFilterChange,
  updateFilters,
  onClearFilters,
}: FilterProps) {
  const [languages, setLanguages] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const lang = await getAllLanguages();
      const g = await getAllGroups();

      setLanguages(lang);
      setGroups(g);
    };

    fetchData();
  }, []);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="xl:hidden w-[50px] h-[50px] flex items-center justify-center bg-primary px-4 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-filter"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <div className="w-full min-h-[500px] h-fit flex-shrink-0">
          <div className="w-full h-[45px] rounded-2xl bg-[#F0F0F0] grid grid-cols-3 overflow-hidden">
            <button
              className={`w-full h-full border font-bold ${
                filters?.type === "all" ? "bg-[#FFC767]" : ""
              }`}
              onClick={() => onClearFilters()}
            >
              Kaikki
            </button>
            <button
              className={`w-full h-full border font-bold ${
                filters?.type === "new" ? "bg-[#FFC767]" : ""
              }`}
              onClick={() => {
                const updatedFilterType = { ...filters, type: "new" };
                updateFilters(updatedFilterType);
              }}
            >
              Uudet
            </button>
            <button
              className={`w-full h-full border font-bold ${
                filters?.type === "used" ? "bg-[#FFC767]" : ""
              }`}
              onClick={() => {
                const updatedFilterType = { ...filters, type: "used" };
                updateFilters(updatedFilterType);
              }}
            >
              Käytetyt
            </button>
          </div>

          <div className="w-full min-h-[200px] h-fit my-8 rounded-2xl bg-[#F5F5F5] p-4">
            <div className="w-full flex flex-col gap-y-4">
              <h2 className="font-bold text-xl">Hakuehdot</h2>
              <input
                className="w-full h-[50px] rounded-lg border border-[#757575] px-4"
                placeholder="Tekijä"
                value={filters?.author}
                onChange={(e) => onFilterChange("author", e.target.value)}
              />
              <input
                className="w-full h-[50px] rounded-lg border border-[#757575] px-4"
                placeholder="Nimike"
                value={filters?.title}
                onChange={(e) => onFilterChange("title", e.target.value)}
              />
              <input
                className="w-full h-[50px] rounded-lg border border-[#757575] px-4"
                placeholder="ISBN"
                value={filters?.isbn}
                onChange={(e) => onFilterChange("isbn", e.target.value)}
              />
              <select
                name="productGroup"
                value={filters?.productGroup}
                className="w-full h-[50px] bg-white rounded-lg border border-[#757575] px-4"
                onChange={(e) => onFilterChange("productGroup", e.target.value)}
              >
                <option value="">Valitse tuoteryhmä</option>
                {/* Replace with dynamically generated options */}
                {groups.map((groups) => (
                  <option key={groups.nimi} value={groups._id}>
                    {groups.nimi}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full flex flex-col gap-y-4 my-4">
              <h2 className="font-bold text-xl">Tarkennettu kirjahaku</h2>
              <input
                className="w-full h-[50px] rounded-lg border border-[#757575] px-4"
                placeholder="Kustantaja"
                value={filters?.publisher}
                onChange={(e) => onFilterChange("publisher", e.target.value)}
              />
              <input
                className="w-full h-[50px] rounded-lg border border-[#757575] px-4"
                placeholder="Painovuosi"
                value={filters?.printYear}
                onChange={(e) => onFilterChange("printYear", e.target.value)}
              />
              <input
                className="w-full h-[50px] rounded-lg border border-[#757575] px-4"
                placeholder="Aihesana"
                value={filters?.subject}
                onChange={(e) => onFilterChange("subject", e.target.value)}
              />
              <select
                name="language"
                value={filters?.language}
                className="w-full h-[50px] bg-white rounded-lg border border-[#757575] px-4"
                onChange={(e) => onFilterChange("language", e.target.value)}
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

            <div className="w-full flex flex-col gap-y-4 my-4">
              <h2 className="font-bold text-xl">Tuotteen ominaisuudet</h2>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">
                  Kuntoluokitus
                </label>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={filters?.condition}
                  onChange={(e) =>
                    onFilterChange("condition", Number(e.target.value))
                  }
                  className="w-full cursor-pointer bg-[#D9D9D9] h-1 accent-[#FFC767]"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span>K1</span>
                  <span>K2</span>
                  <span>K3</span>
                  <span>K4</span>
                  <span>K5</span>
                  <span>Kaikki</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Päivärajaus
              </label>
              <input
                type="range"
                min={1}
                max={30}
                value={filters?.days}
                onChange={(e) => onFilterChange("days", Number(e.target.value))}
                className="w-full cursor-pointer accent-[#FFC767]"
              />
              <div className="flex justify-between text-sm mt-2">
                <span>1</span>
                <span>7</span>
                <span>14</span>
                <span>30</span>
                <span>*</span>
              </div>
            </div>
          </div>

          <div className="w-full h-[120px] items-center flex flex-col gap-y-2">
            <button
              className="w-full h-[60px] bg-[#FFC767] font-bold"
              onClick={() => updateFilters()}
            >
              Hae
            </button>
            <button
              className="w-full h-[60px]"
              onClick={() => onClearFilters()}
            >
              Tyhjennä haku
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
