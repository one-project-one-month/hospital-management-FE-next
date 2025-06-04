/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/invoice-print.tsx
"use client"; // if using App Router

import Invoice from "@/components/Invoice/Invoice";
import { useEffect, useReducer } from "react";

const invoice = {
  invoiceNumber: "INV-001",
  date: "2025-06-03",
  customer: {
    name: "John Doe",
    address: "123 Main Street",
  },
  items: [
    { name: "Product A", quantity: 2, price: 10 },
    { name: "Product B", quantity: 1, price: 20 },
  ],
};

const initialState = { shouldPrint: true };

function reducer(state: any, action: any) {
  switch (action.type) {
    case "PRINT":
      return { ...state, shouldPrint: false };
    default:
      return state;
  }
}

export default function InvoicePrint() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.shouldPrint) {
      const timeout = setTimeout(() => {
        window.print();
        dispatch({ type: "PRINT" });
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [state.shouldPrint]); // Should use rebounce

  return (
    <section>
      <div className="print:m-0 print:bg-white print:p-0">
        <Invoice invoice={invoice} />
      </div>
    </section>
  );
}
