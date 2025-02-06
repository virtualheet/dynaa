'use client'

import { useUser } from '@clerk/nextjs'
import React from 'react'

const page = () => {
    const {user} = useUser()
  return (
    <div className='text-black text-2xl'>
      {user?.firstName}
    </div>
  )
}

export default page
