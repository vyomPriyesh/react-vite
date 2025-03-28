import React, { useState } from 'react'
import { IoLocationSharp } from 'react-icons/io5'

const Location = ({ data }) => {
    
    return (
        <>
            {data &&
                <div  className={`flex flex-row gap-2 px-1 top-2 bg-white  absolute location pe-10 justify-center place-items-center capitalize location`}>
                    <IoLocationSharp className='text-red-500' />
                    <h1>{data}</h1>
                </div>
            }
        </>
    )
}

export default Location