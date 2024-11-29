"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Ghost, ShoppingCart, Trash, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ShoppingCard() {
  const { items, totalPrice, removeItem, updateItemQuantity } = useCartStore();
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex-shrink-0 relative">
          <ShoppingCart />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 font-bold text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="w-full h-screen flex flex-col items-center justify-between">
          <div className="flex-1 w-full overflow-y-auto py-4">
            {items.length === 0 ? (
              <div className="w-full h-[150px] flex flex-col gap-y-4 items-center justify-center">
                <Ghost strokeWidth={2} className="w-12 h-12" />
                <p className="flex items-center font-bold text-2xl">
                  kortti on tyhjä
                </p>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-y-6 p-4">
                {items.map((item) => (
                  <div key={item.id} className="w-full flex gap-x-4">
                    <div className="w-[120px] h-[160px] rounded-2xl flex-shrink-0 overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-bold">{item.title}</h2>
                        <span className="text-lg playfair-display">
                          {item.price} €
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateItemQuantity(
                                item.id,
                                (item.quantity || 1) - 1
                              )
                            }
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity || 1}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateItemQuantity(
                                item.id,
                                (item.quantity || 1) + 1
                              )
                            }
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash className="w-4 h-4 text-black" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full h-auto flex flex-col px-4 py-6 gap-y-4 border-t">
            <div className="w-full flex items-center justify-between">
              <span className="font-bold text-2xl">kokonaishinta</span>
              <span className="text-2xl playfair-display">
                {totalPrice.toFixed(2)} €
              </span>
            </div>
            <Button
              size="lg"
              className="text-black w-full"
              disabled={items.length === 0}
              onClick={() => {
                setOpen(false);
                router.push("/checkout");
              }}
            >
              jatka kassalle
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
