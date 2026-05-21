import React from 'react'
import { TailSpin } from 'react-loader-spinner'

export default function loading() {
    return (
        <>
            <div className='bg-gray-200 h-screen flex items-center justify-center'>
                <TailSpin
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>



        </>
    )
}
