import Link from 'next/link'
import React from 'react'
import { CiHeart } from 'react-icons/ci'
import { FaEye, FaStar } from 'react-icons/fa'
import { addProductToCart } from '../_actions/cart.Action'
import AddToCartbtn from './AddToCartbtn'

interface ProductType {
    _id: string,
    title: string,
    imageCover: string,
    price: number,
    priceAfterDiscount?: number,
    ratingsAverage: number,
    category: { name: string },
    brand: { name: string },
}
interface ProductCardPropsType{
    product : ProductType
}
export default function ProductCard({ product }:ProductCardPropsType ) {
    return (
        <div className='p-3 border rounded-xl relative hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl'>
            <div className='absolute top-4 right-3'>
                <div className='bg-white cursor-pointer text-gray-600 shadow-2xl border h-8 w-8 rounded-full flex items-center justify-center hover:text-red-500'><CiHeart /></div>
                <Link href={`/product/${product.id}`} className='bg-white cursor-pointer text-gray-600 mt-3 shadow-2xl border h-8 w-8 rounded-full flex items-center justify-center hover:text-emerald-500'><FaEye /></Link>
            </div>
            <img src={product.imageCover} alt={product.title} className='w-full' />
            <p className='text-gray-600 text-xs mt-3'>{product.category.name}</p>
            <h3 className='text-lg font-semibold'>{product.title.split(" ", 2).join(" ")}</h3>
            <div className='flex items-center gap-1'>
                {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                        key={i}
                        className={i < Math.round(product.ratingsAverage) ? 'text-yellow-400' : 'text-gray-300'}
                    />
                ))}
                <span className='text-gray-500 text-sm'>{product.ratingsAverage}</span>
            </div>
            <div className='flex justify-between items-center mt-3'>
                {product.priceAfterDiscount
                    ? <div>
                        <span className='text-emerald-500 text-xl font-semibold'>{product.priceAfterDiscount} EGP</span>
                        <span className='text-red-500 text-xs line-through'>{product.price} EGP</span>
                      </div>
                    : <h4 className='text-xl font-semibold'>{product.price} EGP</h4>
                }
               <AddToCartbtn  productId={product.id}/>
            </div>
        </div>
    )
}