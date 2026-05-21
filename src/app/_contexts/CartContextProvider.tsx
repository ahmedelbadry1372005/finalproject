"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { getUserCart } from "../_actions/cart.Action";
import { cartItemType } from "@/types/cart.type";

export const cartContext = createContext({} as any);

export default function CartContextProvider({ children }: { children: ReactNode }) {

  const [cartId, setcartId] = useState<string | null>(null);
  const [cartItemsNum, setcartItemsNum] = useState<number>(0);
  const [totalPriceOfCart, settotalPriceOfCart] = useState<number>(0);
  const [cartProducts, setcartProducts] = useState<cartItemType[]>([]);

  
  async function loadCart() {
    try {
      const res = await getUserCart();

      console.log("LOAD CART:", res);

      if (res?.data) {
        setcartId(res.cartId); 
        setcartProducts(res.data.products || []);
        setcartItemsNum(res.numOfCartItems || 0);
        settotalPriceOfCart(res.data.totalCartPrice || 0);
      }
    } catch (err) {
      console.log("Cart error:", err);
    }
  }

  useEffect(() => {
    loadCart(); 
  }, []);

  return (
    <cartContext.Provider
      value={{
        cartId,
        cartItemsNum,
        totalPriceOfCart,
        cartProducts,
        setcartItemsNum,
        settotalPriceOfCart,
        setcartProducts,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}