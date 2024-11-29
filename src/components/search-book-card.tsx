/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { useState, type FC } from "react";

const SearchBookCard: FC<{ book: any }> = ({ book }) => {
  const imageUrl = `${book.kuvat[0]?.file_domain}/${book.kuvat[0]?.file_path}/${book.kuvat[0]?.file_md}`;
  const router = useRouter();

  const getConditionText = (kunto: string) => {
    const conditions: Record<string, string> = {
      K5: "Uudenveroinen",
      K4: "Erinomainen",
      K3: "Hyvä",
      K2: "Tyydyttävä",
      K1: "Heikko",
    };
    return conditions[kunto] || kunto;
  };

  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: book._id,
      image: book.kuvatieto,
      title: book.nimi,
      price: book.hinta.toString(),
      subTitle: book.tekija,
      quantity: 1,
      condition: book.kunto || "",
      binding: book.sidonta || "",
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="w-full min-h-[300px] h-fit lg:h-[300px] flex flex-col lg:flex-row rounded-2xl border shadow overflow-hidden">
      <div className="w-full flex-grow h-full py-4 lg:py-0 flex flex-col lg:flex-row">
        <div className="w-[220px] mx-auto h-full flex-shrink-0">
          <img
            className="w-full h-full object-contain"
            src={imageUrl}
            alt={book.nimi}
          />
        </div>

        <div className="w-full h-full flex-grow flex flex-col items-start gap-y-4 p-4">
          <h2 className="font-bold text-3xl playfair-display">{book.nimi}</h2>
          <p>{book.tekija}</p>
          <p className="text-[#757575]">
            {book.painovuosi} • {book.kustantaja}
          </p>
          <p className="text-[#757575]">{book.sidonta}</p>
          <p className="text-[#757575]">
            Käytetty - {getConditionText(book.kunto)}
          </p>
          <button
            className="px-10 h-[50px] w-full lg:w-fit bg-[#F0F0F0]"
            onClick={() => router.push(`/books/${book._id}`)}
          >
            Näytä tuotetiedot »
          </button>
        </div>
      </div>

      <div className="w-full lg:w-[250px] flex-shrink-0 h-full border-l flex flex-col justify-between">
        <div className="p-4">
          <p className="text-3xl font-bold playfair-display">
            {book.hinta.toFixed(2)} €
          </p>
          <p>
            {book.maara === -1
              ? "Saatavilla 1 kpl"
              : `Saatavilla ${book.maara} kpl`}
          </p>
        </div>
        <div>
          <p className="m-4">
            Lähetetään 1-2 arkipäivässä. <br />
            Toimitus Suomeen 6,00 €
          </p>

          <button
            className={cn(
              "w-full h-14  font-bold transition-all duration-300",
              isAdded
                ? "bg-green-500 hover:bg-green-600"
                : "bg-[#FFC767] hover:bg-[#da9c33]"
            )}
            disabled={isAdded}
            onClick={handleAddToCart}
          >
            Lisää ostoskoriin »
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBookCard;
