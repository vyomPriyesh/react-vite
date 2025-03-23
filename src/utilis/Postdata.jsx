import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import { IoShareSocial } from 'react-icons/io5';
import { RiFacebookFill } from 'react-icons/ri';
import { FaStopwatch, FaEye } from 'react-icons/fa';

const Postdata = ({ title, moreData, profile, heroData }) => {
  const [more, setMore] = useState(false);
  const [share, setShare] = useState(false);

  // Get the protocol, host, and port of the current page
  const protocol = window.location.protocol;  // 'http:' or 'https:'
  const host = window.location.hostname;      // e.g., '192.168.29.202'
  const port = window.location.port;          // Port, if available

  // Dynamically update Open Graph meta tags
  useEffect(() => {
    // Clean the description to remove HTML tags
    const description = typeof moreData === 'string' ? moreData.replace(/(<([^>]+)>)/gi, '') : '';

    // Update Open Graph meta tags in the head
    document.querySelector('meta[property="og:title"]').setAttribute('content', title);
    document.querySelector('meta[property="og:description"]').setAttribute('content', description);
    document.querySelector('meta[property="og:image"]').setAttribute('content', `https://img.youtube.com/vi/${profile?.video_img}/0.jpg`);
    document.querySelector('meta[property="og:url"]').setAttribute('content', `${protocol}//${host}${port ? `:${port}` : ''}/?nid=${profile?.share}`);
    document.querySelector('meta[property="og:site_name"]').setAttribute('content', 'Info Gujrat');
    document.title = title; // Update the page title
  }, [title, moreData, profile]);

  const shareUrl = `${protocol}//${host}${port ? `:${port}` : ''}/?nid=${profile?.share}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="container mx-auto p-4">
      {/* Post Title */}
      {title && (
        <h1 className="gap-2 text-base place-items-start mt-2 px-1 font-semibold">
          {title}
          <button onClick={() => setMore(!more)} className="text-blue-500 font-extrabold mt-0 ms-3 text-sm md:text-base">
            {more ? 'Less' : 'More'}
          </button>
        </h1>
      )}

      {/* More Content */}
      {more && (
        <div className="my-3 space-y-2 px-1">
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: moreData }} />
        </div>
      )}

      {/* Profile Information */}
      {profile && (
        <div className="flex flex-row gap-3 place-items-center px-1 mt-2">
          {profile?.name && (
            <div className="flex flex-row gap-3 place-items-center">
              {profile?.img ? (
                <img
                  id="profile_5"
                  src={profile?.img}
                  className="h-5 w-5 aspect-square"
                  alt="Profile"
                />
              ) : (
                <img
                  id="profile_5"
                  src={`https://ui-avatars.com/api/?name=${profile?.name}&size=20`}
                  className="h-5 w-5 aspect-square"
                  alt="Profile"
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
              <span id="day_5" className="text-xs md:text-base">{profile?.time}</span>
            </div>
          )}
          {profile?.view && (
            <div className="flex flex-row gap-1 place-items-center">
              <FaEye />
              <span id="view_5" className="text-xs md:text-base">{profile?.view}</span>
            </div>
          )}

          {/* Share Button */}
          {profile?.share && (
            <button onClick={() => setShare(!share)} className="text-lg text-blue-500 relative">
              <IoShareSocial />
              {share && (
                <div className="absolute flex rounded-md z-40 flex-row gap-3 text-2xl left-0 -translate-x-[100%] top-7 bg-white border border-gray-300 p-2">
                  <a
                    target="_blank"
                    href={whatsappUrl}
                    data-title={title}
                    data-description={moreData.replace(/(<([^>]+)>)/gi, '')}
                    data-image={`https://img.youtube.com/vi/${profile?.video_img}/0.jpg`}
                    data-url={whatsappUrl}
                    onClick={() => console.log('Updating OG Tags...')}
                    id="whatsapp-share"
                    className="text-green-600"
                  >
                    <FaWhatsapp />
                  </a>
                  <a href="#" className="text-yellow-700">
                    <FaInstagram />
                  </a>
                  <a href="#" className="text-blue-700">
                    <RiFacebookFill />
                  </a>
                </div>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Postdata;
