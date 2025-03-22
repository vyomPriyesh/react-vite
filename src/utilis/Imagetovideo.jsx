import React, { useEffect, useState } from 'react'
import Redbanner from './Redbanner';
import { FaEye, FaInstagram, FaStopwatch, FaWhatsapp } from 'react-icons/fa';
import { IoShareSocial } from 'react-icons/io5';
import { RiFacebookFill } from 'react-icons/ri';
import Postdata from './Postdata';
import Location from './Location';

const Imagetovideo = ({ title, moreData, list, changeVideo, key }) => {

    const [refresh, setRefresh] = useState(0)
    const [text, setText] = useState(null)
    const [all, setAll] = useState([])

    const [profile, setProfile] = useState({
        video_img: '',
        name: '',
        img: '',
        time: '',
        view: '',
        share: ''
    })

    useEffect(() => {
        if (list) {
            setProfile({
                video_img: list?.blog_image[0].details,
                name: list.user.name,
                img: list.user.image ? list.user.image_path + '/' + list.user.image : null,
                time: list.create_date,
                view: list.count,
                share: list.id
            })
        }
    }, [list])


    const bannerData = () => {
        const delays = [1000, 8000, 12000]; // Delays for each text update
        const totalTexts = all.length;

        all.forEach((text, index) => {
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

    useEffect(() => {
        if (list?.blog_ticker.length > 0)
            setAll(list?.blog_ticker.map(list => list.details))
        bannerData();
    }, [refresh, list]);

    return (
        <>
            <div className="border-b border-gray-200 pb-2 pt-1" key={key}>
                <div className="relative z-30 ">
                    <img className="w-full" onClick={() => changeVideo(list)} src={`https://img.youtube.com/vi/${list?.blog_image[0]?.details}/sddefault.jpg`} alt="" />
                    <Location data={list?.location} />
                    <Redbanner data={text} />
                </div>
                <Postdata title={list?.title} moreData={list?.description} profile={profile} />
            </div>
        </>
    )
}

export default Imagetovideo