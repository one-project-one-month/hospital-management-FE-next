/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export default function Invoice({ invoice }: { invoice: any }) {
  const total = invoice.items.reduce(
    (sum: number, item: any) => sum + item.quantity * item.price,
    0,
  );

  return (
    <div className="mx-auto max-w-[600px] bg-white p-4 text-black">
      <h1 className="text-xl font-bold">Invoice #{invoice.invoiceNumber}</h1>
      <p>Date: {invoice.date}</p>
      <p>To: {invoice.customer.name}</p>
      <p>{invoice.customer.address}</p>

      <table className="mt-4 w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Item</th>
            <th className="border px-2 py-1">Qty</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item: any, idx: number) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{item.name}</td>
              <td className="border px-2 py-1">{item.quantity}</td>
              <td className="border px-2 py-1">${item.price}</td>
              <td className="border px-2 py-1">
                ${item.quantity * item.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-2 text-right font-bold">Total: ${total}</p>
    </div>
  );
}
