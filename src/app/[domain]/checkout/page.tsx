"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { CheckoutForm } from "@/components/forms/checkout-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Ghost, Minus, Plus, Trash } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, removeItem, updateItemQuantity } = useCartStore();
  const {
    deliveryOptions,
    selectedDelivery,
    setSelectedDelivery,
    paymentOptions,
    selectedPayment,
    setSelectedPayment,
    coupon,
    couponDiscount,
    applyCoupon,
    isProcessing,
  } = useCheckoutStore();
  const [couponCode, setCouponCode] = React.useState(coupon);

  React.useEffect(() => {
    if (items.length === 0) {
      router.push("/");
    }
  }, [items, router]);

  const calculateTotal = () => {
    const subtotal = totalPrice;
    const deliveryFee = selectedDelivery
      ? parseFloat(selectedDelivery.price)
      : 0;
    const discount = couponDiscount;
    return subtotal + deliveryFee - discount;
  };

  //   const handleSubmit = async (values) => {
  //     // Omitted for brevity, same as previous version
  //   };

  return (
    <div className="min-h-screen mt-[160px] bg-gray-100 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold playfair-display mb-8">Checkout</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className=" rounded-2xl  p-6 ">
            {items.length === 0 ? (
              <div className="w-full h-[150px] flex flex-col gap-y-4 items-center justify-center">
                <Ghost strokeWidth={2} className="w-12 h-12" />
                <p className="flex items-center font-bold text-2xl">
                  Cart is empty
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[120px_1fr] gap-4"
                  >
                    <div className="rounded-2xl overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <span className="text-lg playfair-display">
                          {item.price} €
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
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
          <div className="bg-white rounded-2xl border p-6">
            <CheckoutForm onSubmit={() => {}} />
            <div className="mt-6">
              <div className="mb-4">
                <Label htmlFor="coupon">Coupon Code</Label>
                <Input
                  id="coupon"
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </div>
              <Button
                onClick={() => applyCoupon(couponCode)}
                disabled={isProcessing}
                className="bg-[#FFC767] hover:bg-[#da9c33] w-full"
              >
                Apply Coupon
              </Button>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-bold mb-4">Delivery Options</h3>
              <RadioGroup
                value={selectedDelivery?.id}
                onValueChange={(value) => {
                  const option = deliveryOptions.find(
                    (opt) => opt.id === value
                  );
                  if (option) setSelectedDelivery(option);
                }}
              >
                {deliveryOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id}>
                      {option.name} - {option.price}€ ({option.estimatedDays})
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-bold mb-4">Payment Options</h3>
              <RadioGroup
                value={selectedPayment?.id}
                onValueChange={(value) => {
                  const option = paymentOptions.find((opt) => opt.id === value);
                  if (option) setSelectedPayment(option);
                }}
              >
                {paymentOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id}>
                      {option.name}
                      <p className="text-sm text-gray-500">
                        {option.description}
                      </p>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p>
                      {(parseFloat(item.price) * (item.quantity || 1)).toFixed(
                        2
                      )}
                      €
                    </p>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{totalPrice.toFixed(2)}€</p>
                  </div>
                  {selectedDelivery && (
                    <div className="flex justify-between">
                      <p>Delivery</p>
                      <p>{selectedDelivery.price}€</p>
                    </div>
                  )}
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <p>Discount</p>
                      <p>-{couponDiscount.toFixed(2)}€</p>
                    </div>
                  )}
                  <div className="flex justify-between font-bold mt-2">
                    <p>Total</p>
                    <p>{calculateTotal().toFixed(2)}€</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
