import React from 'react'

const Redbanner = ({ data }) => {

    // console.log(data)

    return (
        <>
            <div className='flex absolute bottom-1 justify-center place-items-center w-full'>
                <div className={`${data && 'bg-red-500 banner  banner-animation'} text-white flex justify-center place-items-center px-8`}>
                    <span className='line-clamp-1'>
                        {data}
                    </span>
                </div>
            </div>
        </>
    )
}

export default Redbanner