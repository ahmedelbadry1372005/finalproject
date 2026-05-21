"use client";

import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { cartContext } from "../_contexts/CartContextProvider";
import { cartItemType } from "@/types/cart.type";
import {
  deleteItemFromCart,
  updateProductCart, 
} from "../_actions/cart.Action";

export default function CartPage() {
  const {
    cartProducts,
    totalPriceOfCart,
    cartItemsNum,
    setcartItemsNum,
    settotalPriceOfCart,
    setcartProducts,
  } = useContext(cartContext) as any;

  
  async function handelDeleteItem(id: string) {
    const res = await deleteItemFromCart(id);

    if (res?.status === "success") {
      setcartProducts(res?.data?.products || []);
      setcartItemsNum(res?.numOfCartItems || 0);
      settotalPriceOfCart(res?.data?.totalCartPrice || 0);
    }
  }

  
  async function handleUpdate(id: string, count: number) {
    if (count < 1) return;

    const res = await updateProductCart(id, count);

    if (res?.status === "success") {
      
      setcartProducts((prev: cartItemType[]) =>
        prev.map((item) =>
          item.product.id === id ? { ...item, count } : item
        )
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-20 mt-10">
      <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-3 gap-10">

        
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm">

          {cartProducts?.length > 0 ? (
            cartProducts.map((item: cartItemType) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between border-b pb-6 mb-4"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />

                  <div>
                    <h2 className="font-semibold">
                      {item.product.title}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {item.product.brand?.name}
                    </p>

                    <p className="text-sm text-gray-400">
                      {item.product.category?.name}
                    </p>

                    
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        className="px-2 border rounded"
                        onClick={() =>
                          handleUpdate(item.product.id, item.count - 1)
                        }
                      >
                        -
                      </button>

                      <span>{item.count}</span>

                      <button
                        className="px-2 border rounded"
                        onClick={() =>
                          handleUpdate(item.product.id, item.count + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

               
                <div className="text-right">
                  <p className="text-green-600 font-semibold">
                    ${item.price}
                  </p>

                  <button
                    className="text-red-500 text-sm mt-2 flex items-center gap-1"
                    onClick={() =>
                      handelDeleteItem(item.product.id)
                    }
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">
              Your cart is empty
            </p>
          )}

          
          <div className="flex justify-between mt-6">
            <Link href="/home" className="text-blue-600">
              ← Continue Shopping
            </Link>

            <button className="text-red-500">
              Clear Cart
            </button>
          </div>
        </div>

        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-3 text-gray-600">
            <span>Total Items</span>
            <span>{cartItemsNum}</span>
          </div>

          <div className="flex justify-between mb-6 font-semibold text-lg">
            <span>Total Price</span>
            <span className="text-indigo-600">
              ${totalPriceOfCart}
            </span>
          </div>

          <Link
            href="/payment"
            className="block w-full text-center bg-gradient-to-r from-purple-600 to-indigo-500 text-white py-3 rounded-lg font-medium"
          >
            Checkout
          </Link>

          <p className="text-xs text-gray-400 mt-3 text-center">
            Taxes and shipping calculated at checkout
          </p>
        </div>
      </div>
    </div>
  );
}