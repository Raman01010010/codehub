"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'
const Nav = () => {
  const [provider,setProvider]=useState(null)
  const {data:session}=useSession()
  console.log(session)
  useEffect(()=>{
const setProvidr=async ()=>{
  const response=await getProviders()
  setProvider(response)
  console.log(response)
}
setProvidr()

  },[])
  return (
    <header className="text-gray-400 bg-gray-900 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
      <Image src="https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fapp-getting-started.png&w=3840&q=75&dpl=dpl_BgDMtkMC7Ys3CBykeL1toqez4tqp"
      width={30}
      height={30}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        className="w-10 h-10 text-white p-2 bg-green-500 rounded-full"
        viewBox="0 0 24 24"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      <span className="ml-3 text-xl">Tailblocks</span>
    </a>
    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      <Link href='l1' className="mr-5 hover:text-white">First Link</Link>
      <Link href='l1' className="mr-5 hover:text-white">Second Link</Link>
      <Link href='l1' className="mr-5 hover:text-white">Third Link</Link>
      <Link href='l1' className="mr-5 hover:text-white">Fourth Link</Link>
      {provider&&Object.values(provider).map((provider1)=>(
        <button type="button"
        key={provider1.name}
        onClick={()=>signIn(provider1.id)}>signinggg</button>
    ))}
    </nav>
    <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
      Button
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        className="w-4 h-4 ml-1"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</header>

  )
}

export default Nav