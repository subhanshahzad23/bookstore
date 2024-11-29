"use client";

import { FC, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export interface BookCardProps {
  id: string;
  image: string;
  subTitle: string;
  title: string;
  price: string;
  date: string;
  condition?: string;
  binding?: string;
}

const BookCard: FC<BookCardProps> = ({
  id,
  image,
  price,
  subTitle,
  title,
  date,
  condition = "Käytetty - erinomainen (K4)",
  binding = "Sidottu",
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCartStore();
  const router = useRouter();

  const handleAddToCart = () => {
    addItem({
      id,
      image,
      title,
      price,
      subTitle,
      quantity: 1,
      condition,
      binding,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="w-full h-full overflow-hidden shadow rounded-2xl hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between bg-white">
      <div className="w-full flex flex-col gap-y-2">
        <div
          className="relative group"
          onClick={() => router.push(`/books/${id}`)}
        >
          <img
            src={image}
            alt={title}
            className="rounded-t-2xl cursor-pointer h-[260px] 2xl:h-[300px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <span className="text-[#757575] px-4">{date}</span>
      </div>

      <div className="h-[340px] 2xl:h-[300px] flex flex-col justify-between w-full ">
        <div className="space-y-2 px-4">
          <span className="text-md text-gray-600">{subTitle}</span>
          {/* <Link href={`/books/${id}`}> */}
          <h3 className="text-xl font-bold playfair-display hover:text-gray-700 transition-colors">
            {title}
          </h3>
          {/* </Link> */}
        </div>

        <div className="space-y-3 ">
          <div className="space-y-1 px-4">
            <span className="text-[#757575] block">{binding}</span>
            <span className="text-[#757575] block">{condition}</span>
            <span className="text-3xl font-extrabold playfair-display text-black">
              {price} €
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            className={cn(
              "w-full h-14  font-bold transition-all duration-300",
              isAdded
                ? "bg-green-500 hover:bg-green-600"
                : "bg-[#FFC767] hover:bg-[#da9c33]"
            )}
            disabled={isAdded}
          >
            <span className="flex items-center gap-x-2">
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  Lisätty koriin
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Lisää ostoskoriin
                </>
              )}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
