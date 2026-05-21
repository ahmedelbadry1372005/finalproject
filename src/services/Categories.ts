import { CategoryType } from "@/types/product.types"

export async function getAllCategories() :promise< CategoryType[]>{
    const res = await fetch ("https://ecommerce.routemisr.com/api/v1/categories")

    const finalRes = await res.json()

    return finalRes.data
}