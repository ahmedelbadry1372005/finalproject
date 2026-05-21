import React from 'react'
import { getProductById } from '@/services/product';
import { FaStar } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
export default async function page({ params }) {

  console.log(params);
  const myparams = await params
  console.log("myParams", myparams);

  const product = await getProductById(myparams.id)
  return (
    <div className='h-screen bg-gray-100 grid grid-cols-4 items-center gap-6 w-full p-20 '>

      <div className='col-span-1 border-2 p-5 bg-white rounded-xl'><img className='w-full' src={product.imageCover} alt={product.title} /></div>
      <div className='col-span-3 border-2 p-5 bg-white rounded-xl'>

        <div>
          <span className='text-xl text-green-800 bg-emerald-50 rounded-4xl p-3 mx-5'>{product?.category.name}</span>
          <span className='text-xl text-gray-600 bg-gray-200 rounded-4xl p-3 '>{product?.brand.name}</span>
        </div>
        <h1 className='mt-10 mb-5 ms-5 font-semibold text-5xl'> {product?.title}</h1>
        <div className='flex gap-2 items-center text-3xl mx-5'>
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={i}
              className={i < Math.round(product.ratingsAverage) ? 'text-yellow-400' : 'text-gray-300'}
            />
          ))}
          <span className='mx-3'>{product.ratingsAverage}</span>
        </div>
          {product.priceAfterDiscount
                    ? <div className='mt-5'>
                        <span className='text-emerald-500 font-semibold text-5xl ms-6 mt-5'>{product.priceAfterDiscount} EGP</span>
                        <span className='text-red-500 text-2xl line-through'>{product.price} EGP</span>
                      </div>
                    : <h4 className='text-xl font-semibold'>{product.price} EGP</h4>
                }
           <div className='w-full m-5'>
            <button className='text-xl px-20 py-3 rounded-xl bg-green-600 w-md cursor-pointer'>Add To Cart</button>
            <button className='text-xl px-20 py-3 rounded-xl bg-black text-white ms-2 w-md cursor-pointer'>Buy Now</button>
            </div>  
             <button className='w-4xl rounded-xl bg-white border-2 py-3 text-xl ms-5 cursor-pointer'>Add To Wishlist</button>  
      </div>
    </div>
  )
}
