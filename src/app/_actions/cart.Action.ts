"use server";

import { cartResType } from "@/types/cart.type";
import getMyToken from "../utils/getmyToken";

export async function addProductToCart(
  id: string,
  token: string
): Promise<cartResType> {
  const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({ productId: id }),
  });

  return res.json();
}


export async function getUserCart(): Promise<cartResType> {
  const token = await getMyToken();

  const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    headers: {
      token: token as string,
    },
  });

  return res.json();
}


export async function deleteItemFromCart(
  productId: string
): Promise<any> {
  const token = await getMyToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    }
  );

  return res.json();
}


export async function updateProductCart(
  id: string,
  count: number,
  token?: string
): Promise<cartResType> {

  
  if (!token) {
    token = await getMyToken();
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ count }),
    }
  );

  return res.json();
}