// 'use client'; is needed to indicate that this component uses client-side interactivity
"use client";

import { useCartStore } from "@/store/useCartStore";
import { FC, useState } from "react";

const AddToCartButton: FC<AddToCartButtonProps> = ({
  id,
  image,
  title,
  price,
  subtitle,
  condition,
  binding,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: id,
      image: image,
      title: title,
      price: price,
      subTitle: subtitle,
      quantity: 1,
      condition: condition || "",
      binding: binding || "",
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
  return (
    <button
      onClick={handleAddToCart}
      className="w-full mt-4 py-3 px-4 bg-[#FFC767] font-bold hover:bg-[#e6b35d] transition-colors rounded-sm"
    >
      Lisää ostoskoriin »
    </button>
  );
};

export default AddToCartButton;
