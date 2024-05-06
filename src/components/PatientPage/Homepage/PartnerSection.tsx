import { partnersData } from '@/libs/PatientData/HomeData'
import Image from 'next/image'
import React from 'react'

const PartnerSection = () => {
  return (
    <div className='flex items-center justify-center mt-20 lg:space-x-14 md:space-x-10'>
        {
            partnersData.map((list, idx) => (
                <div key={idx}>
                    <Image src={require(`@/assets/images/${list}`)} alt={list} className='lg:w-[85%] md:w-auto'/>
                </div>
            ))
        }
    </div>
  )
}

export default PartnerSection