import { create } from "zustand";

interface DeliveryOption {
  id: string;
  name: string;
  price: string;
  estimatedDays: string;
}

interface PaymentOption {
  id: string;
  name: string;
  type: "gateway" | "manual";
  description: string;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
}

interface CheckoutState {
  // Customer Information
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: Partial<CustomerInfo>) => void;

  // Delivery
  deliveryOptions: DeliveryOption[];
  selectedDelivery: DeliveryOption | null;
  setDeliveryOptions: (options: DeliveryOption[]) => void;
  setSelectedDelivery: (option: DeliveryOption) => void;

  // Payment
  paymentOptions: PaymentOption[];
  selectedPayment: PaymentOption | null;
  setPaymentOptions: (options: PaymentOption[]) => void;
  setSelectedPayment: (option: PaymentOption) => void;

  // Coupon
  coupon: string;
  couponDiscount: number;
  setCoupon: (code: string) => void;
  applyCoupon: (code: string) => Promise<void>;

  // Order Processing
  isProcessing: boolean;
  setIsProcessing: (status: boolean) => void;

  // Error Handling
  error: string | null;
  setError: (error: string | null) => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  customerInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
  },
  setCustomerInfo: (info) =>
    set((state) => ({
      customerInfo: { ...state.customerInfo, ...info },
    })),

  deliveryOptions: [],
  selectedDelivery: null,
  setDeliveryOptions: (options) => set({ deliveryOptions: options }),
  setSelectedDelivery: (option) => set({ selectedDelivery: option }),

  paymentOptions: [],
  selectedPayment: null,
  setPaymentOptions: (options) => set({ paymentOptions: options }),
  setSelectedPayment: (option) => set({ selectedPayment: option }),

  coupon: "",
  couponDiscount: 0,
  setCoupon: (code) => set({ coupon: code }),
  applyCoupon: async (code) => {
    try {
      set({ isProcessing: true });
      // Here you would make an API call to validate the coupon
      const response = await fetch("/api/validate-coupon", {
        method: "POST",
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      if (data.valid) {
        set({ couponDiscount: data.discount });
      } else {
        set({ error: "Invalid coupon code" });
      }
    } catch (err) {
      set({ error: `Error applying coupon ${err} ` });
    } finally {
      set({ isProcessing: false });
    }
  },

  isProcessing: false,
  setIsProcessing: (status) => set({ isProcessing: status }),

  error: null,
  setError: (error) => set({ error }),
}));
