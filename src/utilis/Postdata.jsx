import React, { useEffect, useState } from 'react'
import HelmetExport, { Helmet } from 'react-helmet';
import { FaEye, FaInstagram, FaStopwatch, FaWhatsapp } from 'react-icons/fa';
import { IoShareSocial } from 'react-icons/io5';
import { RiFacebookFill } from 'react-icons/ri';


const Postdata = ({ title, moreData, profile, heroData }) => {

    const [more, setMore] = useState(false)
    const [share, setShare] = useState(false)

    const protocol = window.location.protocol;  // 'http:' or 'https:'
    const host = window.location.hostname;      // e.g., '192.168.29.202'
    const port = window.location.port;

    const updateOGTags = () => {
        console.log(title)
        const description = typeof moreData === 'string' ? moreData.replace(/(<([^>]+)>)/gi, '') : ''; // Strip HTML tags
        const image = `https://img.youtube.com/vi/${heroData}/0.jpg`;
        const url = `${protocol}//${host}${port ? `:${port}` : ''}/?nid=${profile?.share}`;

        // Update Open Graph meta tags
        document.querySelector('meta[property="og:title"]').setAttribute("content", title);
        // document.querySelector('meta[property="og:description"]').setAttribute("content", description);
        document.querySelector('meta[property="og:image"]').setAttribute("content", `https://img.youtube.com/vi/${profile?.video_img}/0.jpg`);
        document.querySelector('meta[property="og:url"]').setAttribute("content", `${protocol}//${host}${port ? `:${port}` : ''}/?nid=${profile?.share}`);
        document.title = title;
    };

    useEffect(() => {
        updateOGTags();
    }, [profile?.share, moreData]);

    const shareUrl = `${protocol}//${host}${port ? `:${port}` : ''}/?nid=${profile?.share}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`;
    const imageUrl = `https://img.youtube.com/vi/nC8cu5bCgHg/sddefault.jpg`;




    return (
        <>
            <Helmet>
                <meta property="og:title" content={title} />
                <meta property="og:description" content={typeof moreData === 'string' ? moreData.replace(/(<([^>]+)>)/gi, '') : ''} />
                <meta property="og:image" content={`https://img.youtube.com/vi/nC8cu5bCgHg/sddefault.jpg`} />
                <meta property="og:url" content={`${protocol}//${host}${port ? `:${port}` : ''}/?nid=${profile?.share}`} />
                <title>{title}</title>
            </Helmet>
            {title &&
                <h1 className="gap-2 text-base place-items-start mt-2 px-1 font-semibold">
                    {title}
                    <button onClick={() => setMore(!more)} className="text-blue-500 font-extrabold mt-0 ms-3 text-sm md:text-base">{more ? 'Less' : 'More'}</button>
                </h1>
            }
            {more &&
                <div className="my-3 space-y-2 px-1">
                    <p
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: moreData }}
                    />
                </div>
            }
            {profile &&
                <div className="flex flex-row gap-3 place-items-center px-1 mt-2">
                    {profile?.name &&
                        <div className="flex flex-row gap-3 place-items-center">
                            {profile?.img ?
                                <img id="profile_5" src={profile?.img}
                                    className="h-5 w-5 aspact-square" alt="" />
                                :
                                <img id="profile_5" src={`https://ui-avatars.com/api/?name=${profile?.name}&size=20`}
                                    className="h-5 w-5 aspact-square" alt="" />
                            }
                            <span id="fullName_5" className="text-xs md:text-base">{profile?.name}</span>
                        </div>
                    }
                    {profile?.time &&
                        <div className="flex flex-row gap-1 place-items-center ">
                            <FaStopwatch />
                            <span id="day_5" className="text-xs md:text-base">{profile?.time}</span>
                        </div>
                    }
                    {profile?.view &&
                        <div className="flex flex-row gap-1 place-items-center">
                            <FaEye />
                            <span id="view_5" className="text-xs md:text-base">{profile?.view}</span>
                        </div>
                    }
                    {profile?.share &&
                        <button onClick={() => setShare(!share)} className="text-lg text-blue-500 relative">
                            <IoShareSocial />
                            {share &&
                                <div
                                    className="absolute flex rounded-md z-40 flex-row gap-3 text-2xl left-0 -translate-x-[100%] top-7 bg-white border border-gray-300 p-2">
                                    <a
                                        target='_blank'
                                        href={whatsappUrl}
                                        data-title={title}
                                        data-description={moreData}
                                        data-image={'https://img.youtube.com/vi/nC8cu5bCgHg/sddefault.jpg'}
                                        data-url={whatsappUrl}
                                        onClick={updateOGTags}
                                        id="whatsapp-share"
                                        className="text-green-600"><FaWhatsapp /></a>
                                    <a href="#" className="text-yellow-700"><FaInstagram /></a>
                                    <a href="#"><RiFacebookFill /></a>
                                </div>
                            }
                        </button>
                    }
                </div>
            }
        </>
    )
}

export default Postdata