import { FC } from "react";
import AddToCartButton from "./addToCart";

interface BookDetails {
  title: string;
  author: string;
  publisher: string;
  year: string;
  price: string;
  condition: string;
  binding: string;
  isbn: string;
  pages: string;
  category: string;
  edition: string;
  dimensions: string;
  description: string;
  imageUrl: string;
}

interface Props {
  book: BookDetails;
}

const BookShowcase: FC<Props> = ({ book }) => {
  const imageURL = `${book.kuvat[0]?.file_domain}/${book.kuvat[0]?.file_path}/${book.kuvat[0]?.file_md}`;

  return (
    <div className="w-full px-4">
      <div className="flex flex-col gap-y-2 my-4">
        <h1 className="text-2xl md:text-4xl font-bold playfair-display">
          {book.nimi}
        </h1>
        <span className="text-lg underline">{book.tekija}</span>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="w-full md:col-span-4 lg:col-span-3">
          <img
            className="w-full max-w-[300px] mx-auto md:mx-0"
            src={imageURL}
            alt={book.nimi}
          />
        </div>

        <div className="w-full md:col-span-8 lg:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-2">
                {book.tekija}: {book.nimi}
              </h2>
              <div className="space-y-1">
                <p>{book.tekija}</p>
                <p>
                  {book.painovuosi} • {book.kustantajaHaku}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <h3 className="text-2xl md:text-3xl font-bold playfair-display">
                {book.hinta} €
              </h3>
              <p className="text-sm">Lähetetään 1-2 arkipäivässä.</p>
              <p className="text-sm">Toimitus Suomeen 6,90 €</p>
              <AddToCartButton
                id={book._id}
                image={`${book.kuvat[0]?.file_domain}/${book.kuvat[0]?.file_path}/${book.kuvat[0]?.file_md}`}
                title={book.nimi}
                price={book.hinta.toString()}
                subtitle={book.tekija}
                condition={book.kunto}
                binding={book.sidonta}
              />
            </div>
          </div>

          <div className="w-full border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-8">
              <div>
                <div className="w-full py-1 flex items-start gap-x-2">
                  <span className="font-semibold min-w-[100px]">Kunto:</span>
                  <span>{book.kunto}</span>
                </div>
                <div className="w-full py-1 flex items-start gap-x-2">
                  <span className="font-semibold min-w-[100px]">Sidonta:</span>
                  <span>{book.sidonta}</span>
                </div>
                <div className="w-full py-1 flex items-start gap-x-2">
                  <span className="font-semibold min-w-[100px]">ISBN:</span>
                  <span>{book.isbn}</span>
                </div>
                <div className="w-full py-1 flex items-start gap-x-2">
                  <span className="font-semibold min-w-[100px]">Sivuja:</span>
                  <span>{book.sivum}</span>
                </div>
              </div>

              <div>
                <div className="w-full py-1 flex items-start gap-x-2">
                  <span className="font-semibold min-w-[100px]">
                    Tuoteryhmä:
                  </span>
                  <span>{book.tuoteryhma}</span>
                </div>
                <div className="w-full py-1 flex items-start gap-x-2">
                  <span className="font-semibold min-w-[100px]">Painos:</span>
                  <span>{book.painos}</span>
                </div>
                <div className="w-full py-1 flex items-start gap-x-2">
                  <span className="font-semibold min-w-[100px]">
                    Kustantaja:
                  </span>
                  <span>{book.kustantajaHaku}</span>
                </div>
                <div className="w-full py-1 flex items-start gap-x-2">
                  <span className="font-semibold min-w-[100px]">
                    Tuotteen mitat:
                  </span>
                  <span>{book.sidonta}</span>
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {book.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookShowcase;
