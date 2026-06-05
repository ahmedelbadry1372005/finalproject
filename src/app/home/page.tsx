import React from 'react'
import ProductCard from '../_components/ProductCard';
import { getAllProducts } from '@/services/Products';
import Myslider from '../_components/Myslider';
import image1 from '@/images/FreshVegatables.png';
import ShopByCategory from '../_components/ShopByCategory';

const images = [image1, image1, image1];

export default async function Home() {

  const products = await getAllProducts();

  return (
    <>
      <Myslider listOfImages={images} slidesPerView={1} />

      <ShopByCategory />

      <h2 className='font-semibold text-3xl ms-16'>
        <span className='bg-green-600 text-green-600 rounded-3xl me-2'>.</span>
        Featured <span className='text-green-700'>Products</span>
      </h2>

      <div className='w-10/11 mx-auto bg-slate-50 p-5 grid gap-5 md:grid-cols-4 xl:grid-cols-5'>
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  )
}