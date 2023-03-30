import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Footer () {
    return(
        <div className='flex md:justify-evenly items-center justify-between w-full h-20 px-2 2xl:px-16 bg-black my-4'>
            <a href="https://Opensea.io" className='md:Text-2xl text-1xl text-gray-600' target="_blank" rel="noreferrer">Opeansea</a>
            <a href="https://twitter.com" className='md:Text-2xl text-1xl text-gray-600' target="_blank" rel="noreferrer">Twitter</a>
            <Link href="/"><Image src="/../public/Logo.png" height='80px' width="80px" className='cursor-pointer'/></Link>
            <a href="https://etherscan.io" className='md:Text-2xl text-1xl text-gray-600' target="_blank" rel="noreferrer">Etherscan</a>
            <a href="https://discord.gg" className='md:Text-2xl text-1xl text-gray-600' target="_blank" rel="noreferrer">Discord</a>

        </div>
    )
}

export default Footer