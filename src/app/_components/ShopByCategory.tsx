import { getAllCategories } from '@/services/Categories'
import Link from 'next/link'
import React from 'react'

export default async function ShopByCategory() {

  const Categories = await getAllCategories()
  return (
    <div className='w-100% p-5  mb-20 '>
      <div className='flex justify-between my-2 ms-10'>

        <h2 className='font-semibold text-3xl '>
          <span className='bg-green-600 text-green-600 rounded-3xl me-2'>.</span>
          Shop By <span className='text-green-700'>Category</span>
        </h2>
        <Link className='text-xl text-emerald-600' href={"/Categories"}>View All Category</Link>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-6 gap-6 ms-15'>
        {Categories.map(item => <div key={item._id} className='border-2 shadow-2xl p-3 rounded-2xl'>


          <img className='h-20 w-20 rounded-full m-auto' src={item.image} alt={item.name} />
          <h3 className='text-center text-lg'>{item.name}</h3>
        </div>)

        }
      </div>
    </div>
  )
}
