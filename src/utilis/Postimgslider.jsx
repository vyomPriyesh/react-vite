import React, { useState } from 'react'
import Postdata from './Postdata'
import { Modal } from 'flowbite-react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { RxCross2 } from 'react-icons/rx';

const Postimgslider = ({ list ,key}) => {

    const [open, setOpen] = useState(false)
    const [single, setSingle] = useState(null)

    const openModal = (data) => {
        setSingle(data)
        setOpen(true)
    }

    return (
        <>
            <div className="border-b border-gray-200 pb-2" key={key}>
                <div className="flex flex-row gap-2 overflow-y-auto heading" onClick={() => openModal(list)}>
                    {list?.blog_image.map((item, i) => (
                        <img className={` ${list?.blog_image.length == 1 ? 'w-full' : 'w-1/2'} `} key={i} src={`https://infogujarat.in/news/${item?.details}`} alt="" />
                    ))}
                </div>
                <Postdata title={list?.title} moreData={list?.description} profile={list?.profile} />
            </div>
            <Modal show={open} className='bgg flex justify-center place-items-center h-full text-white p-5 relative'>
                <button onClick={() => setOpen(false)} className='absolute right-0 z-50 bg-white rounded-full h-7 w-7 aspect-square flex justify-center place-items-center text-black'><RxCross2 /></button>
                <Modal.Body className='p-2 bgg text-white relative h-screen'>
                    <div className="space-y-6 h-1/2 flex justify-center place-items-center">
                        <Swiper
                            direction={'vertical'}
                            className="mySwiper h-full"
                        >
                            {single?.image.map((l, i) => (
                                <SwiperSlide className=' flex justify-end'>
                                    <div className="h-full flex justify-center place-items-center">
                                        <img className='' key={i} src={l} alt="" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className=" h-1/2">
                        <div className="bg_2 p-2">
                            <Postdata title={single?.title} moreData={single?.moreData} profile={single?.profile} />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Postimgslider