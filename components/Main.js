import Link from 'next/link';
import React from 'react';

export default function Main() {
    return(
    <div id="home" className='overflow-hidden'>
        <div className="w-full h-full flex flex-col items-center justify-center mt-20 ">
        <img
          src="/Banner2.png"
          className="w-screen h-auto  object-fill"
        />
        </div>
        
        <div  className="cursor-pointer w-screen h-auto mt-5 flex justify-center my-5 md:my-8">
          <div><Link className="cursor-pointer" href='/mint'>
            <div
            className="cursor-pointer font-Righteous p-2 bg-gradient-to-br from-brand-03 to-brand-04
            shadow-md rounded-md md:text-2xl text-[20px] text-black hover:shadow-gray-400/50 hover:text-bold tracking-wide uppercase">
                  <span className="cursor-pointer p-4 md:px-20 lg:px-32">Go To Minting portal </span>
            </div>
            </Link>
          </div>

        
        </div>
      </div>
    )
}
