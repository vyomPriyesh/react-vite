import React, { useEffect, useRef, useState } from 'react'
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
import { GoMute, GoUnmute } from 'react-icons/go';

const First = ({ type, location, title, moreData, profile, heroData, scrollNews, bannerImg, newsData, delay, bannerDelay, bannerText }) => {

    // console.log(object)

    const [show, setShow] = useState(false)
    const [mute, setMute] = useState(false)
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

        bannerText.forEach((textt, index) => {
            setTimeout(() => {
                setText(textt);
                if (index === totalTexts - 1) {
                    setTimeout(() => {
                        setRefresh((prev) => prev + 1);
                    }, delays[index] - delays[index - 1]);
                }
            }, delays[index]);
        });
    };

    const newsDatachange = async () => {

        let i = 0;
        while (true) {
            await delay2(2000);
            setNews(true);
            setSinglenews(newsData[i]);
            await delay2(4000);
            setNews(false);
            await delay2(2000);
            i = (i + 1) % newsData.length;
            if (i === 0) {
                setShownews(false);
                await delay2(delay * 1000);
            }
        }

        // let initialDelay = 1500;
        // let showDuration = 3500;
        // let hideDuration = 1500;

        // newsData.forEach((newsItem, index) => {
        //     setTimeout(() => {
        //         setNews(true);
        //         setSinglenews(newsItem);
        //     }, initialDelay + index * (showDuration + hideDuration));

        //     setTimeout(() => {
        //         setNews(false);
        //     }, initialDelay + showDuration + index * (showDuration + hideDuration));
        // });

        // setTimeout(() => {
        //     setShownews(false)
        // }, initialDelay + newsData.length * (showDuration + 1000));
    };


    useEffect(() => {
        if (!showNews) {
            setTimeout(() => {
                setShownews(true)
                newsDatachange();
            }, delay * 1000);
        }
    }, [showNews, delay])


    const delay2 = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const loopWithDelay = async () => {
        let i = 0;
        while (true) {
            setBanner(bannerImg[i]);
            await delay2(4000);
            i = (i + 1) % bannerImg.length;
            if (i === 0) {
                await delay2(bannerDelay * 1000);
            }
        }
    };


    useEffect(() => {
        loopWithDelay();
    }, [bannerImg]);


    useEffect(() => {
        if (!news && newsData.length > 0) {
            newsDatachange();
        }
    }, [refresh2, newsData]);

    useEffect(() => {
        bannerData();
    }, [refresh, bannerText]);

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


    const [isMuted, setIsMuted] = useState(true);
    const playerRef = useRef(null);

    // This function is called when the YouTube API is ready
    const onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player('youtube-player', {
            videoId: heroData,
            playerVars: {
                autoplay: 1,
                mute: 1,
                controls: 0,
                modestbranding: 1,
                rel: 0
            },
            events: {
                onReady: onPlayerReady
            }
        });
    };

    const onPlayerReady = (event) => {
        // Player is ready
    };

    useEffect(() => {
        // Load the YouTube API script if not already loaded
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        } else {
            onYouTubeIframeAPIReady();
        }

        return () => {
            // Clean up
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, [heroData]);

    const toggleMute = () => {
        if (playerRef.current) {
            if (isMuted) {
                playerRef.current.unMute();
            } else {
                playerRef.current.mute();
            }
            setIsMuted(!isMuted);
        }
    };

    return (
        <>
            {/* <div className="sticky top-0"> */}
            <div className='relative'>
                {profile?.logo &&
                    <img className='md:h-16 md:w-16 h-10 w-10 absolute aspect-square right-2 top-2 logo' src={profile?.logo} />
                }
                <div className='flex justify-center place-items-center mt-1'>
                    {/* <iframe width="100%" height="240" src={`https://www.youtube.com/embed/${heroData}?enablejsapi=1&rel=0&amp;autoplay=1&mute=${mute ? '1':'0'}&controls=0&modestbranding=1`} className=" not-allowed"
                        allow="autoplay;  encrypted-media;"
                        allowFullScreen ></iframe> */}
                    <div id="youtube-player" className={`w-full ${type == 1 ? 'h-[240px]' : type == 2 ? 'h-[620px]' : 'h-[240px]'}`}></div>
                </div>
                <button className="absolute bg-white aspect-square left-0 bottom-2 text-2xl p-1" onClick={toggleMute}>{isMuted ? <GoMute /> : <GoUnmute />}</button>
                <Location data={location} />
                <Redbanner data={text} />
            </div>
            <div className='bg-[#002793] relative h-5'>
                <div>
                    <marquee className="marq text-white" direction="left" loop="" scrollAmount={4}>
                        <p className="space-x-4 flex flex-row">
                            {scrollNews?.map((list, index) => (
                                <>
                                    <span className='place-items-center font-bold flex text-sm flex-row gap-2' key={index}><img src={profile?.logo} alt="" className='h-4 w-4' />{list + '\u00A0'}</span>
                                </>
                            ))}
                        </p>
                    </marquee>
                </div>
                <span className={`${show ? 'translate-x-0 ' : '-translate-x-full `'} uppercase transition-all duration-1000 ease-in-out bg-white px-1 absolute top-0`}>{data}</span>
            </div>
            <div className="bg-white pt-[2px] h-12 relative">
                {showNews &&
                    <div className={`bg overflow-y-auto heading absolute h-full z-30 w-full`}>
                        <>
                            {news ?
                                <div key={singleNews} data-aos="fade-left" className="text-white text-center  h-full flex justify-center place-items-center" >
                                    <h1 className="text-lg py-0.5 h-11 flex justify-center place-items-center font-semibold">
                                        {singleNews}
                                    </h1>
                                </div>
                                :
                                <div key={news} className="flex flex-row h-full" data-aos="fade-left">
                                    <div className="w-1/2 bg-yellow-400 flex justify-center place-items-center h-full text-xl font-bold">
                                        <h1 className="">Breaking</h1>
                                    </div>
                                    <div className="w-1/2 bg h-full py-1 flex justify-center place-items-center text-white text-xl font-bold">
                                        <h1 className="">News</h1>
                                    </div>
                                </div>
                            }
                        </>
                    </div>
                }
                <div className="absolute z-20 overflow-y-auto h-full heading">
                    <img src={banner} data-aos="fade-left" className='h-full w-full' key={banner} alt="" />
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