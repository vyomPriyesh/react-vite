import React, { useState } from 'react';
import { FaEye, FaInstagram, FaStopwatch, FaWhatsapp } from 'react-icons/fa';
import { IoShareSocial } from 'react-icons/io5';
import { RiFacebookFill } from 'react-icons/ri';
import { Helmet } from 'react-helmet'; // Use react-helmet for managing <head>

const Postdata = ({ title, moreData, profile, heroData }) => {
    const [more, setMore] = useState(false); // State for "More/Less" toggle
    const [share, setShare] = useState(false); // State for share options

    // Strip HTML tags from the description
    const description = moreData?.replace(/(<([^>]+)>)/gi, '');

    // Generate the image URL
    const imageUrl = `https://img.youtube.com/vi/${profile?.video_img}/0.jpg`;

    // Generate the share URL
    const shareUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/?nid=${profile?.share}`;

    // WhatsApp share URL
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`;

    return (
        <>
            {/* Use Helmet to manage <head> elements */}
            <Helmet>
                <title>{title}</title>
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={shareUrl} />
            </Helmet>

            {/* Render the title and "More/Less" button */}
            {title && (
                <h1 className="gap-2 text-base place-items-start mt-2 px-1 font-semibold">
                    {title}
                    <button
                        onClick={() => setMore(!more)}
                        className="text-blue-500 font-extrabold mt-0 ms-3 text-sm md:text-base"
                    >
                        {more ? 'Less' : 'More'}
                    </button>
                </h1>
            )}

            {/* Render additional content if "More" is clicked */}
            {more && (
                <div className="my-3 space-y-2 px-1">
                    <p
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: moreData }}
                    />
                </div>
            )}

            {/* Render profile information */}
            {profile && (
                <div className="flex flex-row gap-3 place-items-center px-1 mt-2">
                    {profile?.name && (
                        <div className="flex flex-row gap-3 place-items-center">
                            {profile?.img ? (
                                <img
                                    id="profile_5"
                                    src={profile?.img}
                                    className="h-5 w-5 aspact-square"
                                    alt=""
                                />
                            ) : (
                                <img
                                    id="profile_5"
                                    src={`https://ui-avatars.com/api/?name=${profile?.name}&size=20`}
                                    className="h-5 w-5 aspact-square"
                                    alt=""
                                />
                            )}
                            <span id="fullName_5" className="text-xs md:text-base">
                                {profile?.name}
                            </span>
                        </div>
                    )}

                    {profile?.time && (
                        <div className="flex flex-row gap-1 place-items-center">
                            <FaStopwatch />
                            <span id="day_5" className="text-xs md:text-base">
                                {profile?.time}
                            </span>
                        </div>
                    )}

                    {profile?.view && (
                        <div className="flex flex-row gap-1 place-items-center">
                            <FaEye />
                            <span id="view_5" className="text-xs md:text-base">
                                {profile?.view}
                            </span>
                        </div>
                    )}

                    {profile?.share && (
                        <button
                            onClick={() => setShare(!share)}
                            className="text-lg text-blue-500 relative"
                        >
                            <IoShareSocial />
                            {share && (
                                <div className="absolute flex rounded-md z-40 flex-row gap-3 text-2xl left-0 -translate-x-[100%] top-7 bg-white border border-gray-300 p-2">
                                    <a
                                        href={whatsappUrl}
                                        data-title={title}
                                        data-description={description}
                                        data-image={imageUrl}
                                        data-url={whatsappUrl}
                                        id="whatsapp-share"
                                        className="text-green-600"
                                    >
                                        <FaWhatsapp />
                                    </a>
                                    <a href="#" className="text-yellow-700">
                                        <FaInstagram />
                                    </a>
                                    <a href="#">
                                        <RiFacebookFill />
                                    </a>
                                </div>
                            )}
                        </button>
                    )}
                </div>
            )}
        </>
    );
};

export default Postdata;