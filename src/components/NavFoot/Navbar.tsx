import { Mobile } from '@/config/MediaQuery'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Logo from '@/assets/images/logo-smilecare.svg'
import { navData } from '@/libs/PatientData/NavData'
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
    const isMobile = Mobile()
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const handleOpenMenu = () => {
      setOpenMenu(true)
    }
  return (
    <div className={`${isMobile&&openMenu ? "bg-gray-100" : "lg:px-20 md:px-8"} py-4`}>
        {
          isMobile? 
          (<div className={`relative ${openMenu &&"sticky top-0"}`}>
            <div className='flex items-center justify-between px-3'>
              <Link href={'/'}>
                <Image src={Logo} alt='logo-smilecare.svg' className='w-28'/>
              </Link>
              <div className={`${openMenu&& "rotate-180"} transition-all duration-300`}>
                  {
                    openMenu? (<IoClose onClick={() => setOpenMenu(false)} className='text-2xl'/>) : (<HiOutlineMenu onClick={handleOpenMenu} className='text-2xl'/>)
                  }
              </div>
            </div>
            <div className={` ${openMenu ? "h-52 mt-4" : "h-0 -top-56"} bg-gray-100 w-full shadow-sm absolute transition-all duration-300 px-3 space-y-6`}>
                <ul className='space-y-4 text-[16px] text-gray-500 mt-5'>
                  {
                    navData.map((list, idx) => (
                      <li key={idx}>
                        <Link href={list.link}>{list.page}</Link>
                      </li>
                    ))
                  }
                </ul>
                <button className=' text-center bg-gray-200 text-gray-500 font-medium w-full py-3 rounded-full'>
                  <Link href={'/'}>Sign In</Link>
                </button>
            </div>
          </div>) : 
          (<div className='flex items-center justify-between'>
            <Link href={'/'}>
              <Image src={Logo} alt='logo-smilecare'/>
            </Link>
            <div className='flex items-center space-x-14'>
              <ul className='flex items-center space-x-8 text-sm text-gray-500'>
                {
                  navData.map((list, idx) => (
                    <li key={idx} className='hover:text-blue-500'>
                      <Link href={list.link}>{list.page}</Link>
                    </li>
                  ))
                }
              </ul>
              <button className='text-sm bg-gray-200 text-gray-500 px-6 py-2.5 rounded-full'>
                <Link href={'/'}>Sign In</Link>
              </button>
            </div>
          </div>)
        }
    </div>
  )
}

export default Navbar