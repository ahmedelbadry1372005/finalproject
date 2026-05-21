"use server"

import { cookies } from "next/headers";
import { loginDateType } from "./login.schema";

export async function loginUpAction(values : loginDateType) {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
        body: JSON.stringify(values),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const finalRes = await res.json()
    console.log("finalRes", finalRes);

    const myCookies = await cookies()

    myCookies.set("token",finalRes.token, {
        httpOnly :true,
        maxAge : 60*60*24,
        secure : true,
        sameSite :"strict",

    })
    localStorage.setItem("token",finalRes.token)
    return res.ok

}