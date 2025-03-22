import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { Autoplay } from 'swiper/modules';
import Redbanner from '../utilis/Redbanner';
import Location from '../utilis/Location';
import Menu from './Menu';
import { FaEye, FaInstagram, FaStopwatch, FaWhatsapp } from 'react-icons/fa';
import { IoShareSocial } from 'react-icons/io5';
import { RiFacebookFill } from 'react-icons/ri';
import Postdata from '../utilis/Postdata';

const First = ({ title, moreData, profile, heroData, scrollNews, bannerImg, newsData, delay, bannerDelay, bannerText }) => {


    const [show, setShow] = useState(false)
    const [data, setData] = useState('')
    const [refresh, setRefresh] = useState(0)
    const [refresh2, setRefresh2] = useState(0)
    const [refresh3, setRefresh3] = useState(0)
    const [refresh4, setRefresh4] = useState(0)
    const [showNews, setShownews] = useState(true)
    const [news, setNews] = useState(false)
    const [img, setImg] = useState(false)
    const [singleNews, setSinglenews] = useState(null)
    const [time, setTime] = useState(10);
    const [banner, setBanner] = useState()
    const [showBanner, setShowbanner] = useState(true)
    const [text, setText] = useState(null)

    const bannerData = () => {
        const delays = [1000, 8000, 12000]; // Delays for each text update
        const totalTexts = bannerText.length;

        bannerText.forEach((text, index) => {
            setTimeout(() => {
                setText(text);

                if (index === totalTexts - 1) {
                    setTimeout(() => {
                        setRefresh((prev) => prev + 1);
                    }, delays[index] - delays[index - 1]);
                }
            }, delays[index]);
        });
    };

    const newsDatachange = () => {
        let initialDelay = 1500;
        let showDuration = 3500;
        let hideDuration = 1500;

        newsData.forEach((newsItem, index) => {
            setTimeout(() => {
                setNews(true);
                setSinglenews(newsItem);
            }, initialDelay + index * (showDuration + hideDuration));

            setTimeout(() => {
                setNews(false);
            }, initialDelay + showDuration + index * (showDuration + hideDuration));
        });

        setTimeout(() => {
            setShownews(false)
        }, initialDelay + newsData.length * (showDuration + 1000));
    };

    const bannerDatachange = () => {
        let initialDelay_2 = 1000; // 1 second before the first setImg and setBanner
        let showDuration_2 = 3000; // Show the item for 3 seconds
        let hideDuration_2 = 100;  // Duration to hide the item (optional, could be 0)

        let totalItems = bannerImg.length; // Get the total number of banner items
        let itemsShown = 0; // Counter to track how many items have been shown

        bannerImg.forEach((newsItem, index) => {
            // Set the first delay and show the image after 1 second
            setTimeout(() => {
                setImg(true);             // Show the image
                setBanner(newsItem);      // Set the new banner
            }, initialDelay_2 + index * (showDuration_2 + hideDuration_2));

            // Hide the image after 4 seconds (1s + 3s)
            setTimeout(() => {
                setImg(false);            // Hide the image
                itemsShown++;             // Increment the counter after hiding each item

                // When all items have been shown, hide the entire banner
                if (itemsShown === totalItems) {
                    setShowbanner(false); // Hide the banner
                }
            }, initialDelay_2 + showDuration_2 + index * (showDuration_2 + hideDuration_2));
        });
    };




    useEffect(() => {
        if (!showNews) {
            setTimeout(() => {
                setShownews(true)
                newsDatachange();
            }, delay * 1000);
        }
    }, [showNews, delay])

    useEffect(() => {
        if (!showBanner) {
            setTimeout(() => {
                setShowbanner(true)
                bannerDatachange();
            }, bannerDelay * 1000);
        }
    }, [showBanner, bannerDelay])


    useEffect(() => {
        if (!news && newsData.length > 0) {
            newsDatachange();
        }
    }, [refresh2, newsData]);

    useEffect(() => {
        if (!img && bannerImg.length > 0) {
            bannerDatachange();
        }
    }, [refresh4, bannerImg]);

    useEffect(() => {
        bannerData();
    }, [refresh]);

    const dateFormate = (startDate) => {
        const start = new Date(startDate);

        const formatDate = (date) => {
            const day = date.getDate();
            const month = date.toLocaleString("en-US", { month: "short" }); // Short month name
            return `${month} ${day}`;
        };

        return `${formatDate(start)}`;
    }

    const getShowTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let period = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return hours + ':' + minutes + ' ' + period;
    };

    useEffect(() => {

        const daysInGujarati = [
            'રવિવાર',  // Sunday
            'સોમવાર',  // Monday
            'મંગળવાર',  // Tuesday
            'બુધવાર',  // Wednesday
            'ગુરુવાર',  // Thursday
            'શુક્રવાર',  // Friday
            'શનિવાર'   // Saturday
        ];

        const date = new Date();
        const dayIndex = date.getDay();


        setTimeout(() => {
            setData(dateFormate(new Date()));
            setShow(true);
        }, 1000);

        setTimeout(() => {
            setShow(false);
        }, 4000);

        setTimeout(() => {
            setData(getShowTime(new Date()));
            setShow(true);
        }, 6000);

        setTimeout(() => {
            setShow(false);
        }, 8000);

        setTimeout(() => {
            setData(daysInGujarati[dayIndex]);
            setShow(true);
        }, 10000);

        setTimeout(() => {
            setShow(false);
            setRefresh3((prev) => prev + 1)
        }, 12000);

    }, [refresh3]);

    return (
        <>
            {/* <div className="sticky top-0"> */}
            <div className='relative'>
                {profile?.logo &&
                    <img className='md:h-16 md:w-16 h-10 w-10 absolute aspect-square right-2 top-2 logo' src={profile?.logo} />
                }
                <div className='flex justify-center place-items-center mt-1'>
                    <iframe width="100%" height="240" src={`https://www.youtube.com/embed/${heroData}?enablejsapi=1&rel=0&amp;autoplay=1&mute=1&controls=0&modestbranding=1`} className=" not-allowed"
                        allow="autoplay;  encrypted-media; "
                        allowFullScreen ></iframe>
                </div>
                {/* <Location data={'surat'} /> */}
                <Redbanner data={text} />
            </div>
            <div className='bg-[#002793] relative h-6'>
                <div>
                    <marquee className="marq text-white" direction="left" loop="">
                        <p className="space-x-4 flex flex-row">
                            {scrollNews?.map((list, index) => (
                                <>
                                    <span className='place-items-center flex flex-row gap-2' key={index}><img src={profile?.logo} alt="" className='h-4 w-4' />{list + '\u00A0'}</span>
                                </>
                            ))}
                        </p>
                    </marquee>
                </div>
                <span className={`${show ? 'translate-x-0 ' : '-translate-x-full `'} uppercase transition-all duration-1000 ease-in-out bg-white px-2 absolute top-0`}>{data}</span>
            </div>
            <div className="bg-white pt-0.5 h-12 relative">
                <div className={`bg overflow-y-auto heading absolute z-30 w-full`}>
                    {showNews &&
                        <>
                            {news ?
                                <div key={news} data-aos="fade-left" className="text-white text-center  flex justify-center place-items-center" >
                                    <h1 className="text-lg py-0.5 h-11 flex justify-center place-items-center font-semibold">
                                        {singleNews}
                                    </h1>
                                </div>
                                :
                                <div key={news} className="flex flex-row" data-aos="fade-left">
                                    <div className="w-1/2 bg-yellow-400 flex justify-center place-items-center h-11 text-xl font-bold">
                                        <h1 className="">Breaking</h1>
                                    </div>
                                    <div className="w-1/2 bg h-11 py-1 flex justify-center place-items-center text-white text-xl font-bold">
                                        <h1 className="">News</h1>
                                    </div>
                                </div>
                            }
                        </>
                    }
                </div>
                <div className="absolute z-20 overflow-y-auto heading">
                    {showBanner &&
                        <img src={banner} data-aos="fade-left" key={img} alt="" />
                    }
                </div>
            </div>
            <div className="">

                {/* <Swiper

                    data-aos="fade-left"
                    spaceBetween={30}
                    loop={true}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                    {bannerImg.map((list, i) => (
                        <SwiperSlide key={i}>
                            <img src={list} />
                        </SwiperSlide>
                    ))}
                </Swiper> */}
            </div>
            {/* </div> */}

        </>
    )
}

export default First