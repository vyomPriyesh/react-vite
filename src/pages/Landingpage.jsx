import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import Hero from '../components/Hero'
import Redbanner from '../utilis/Redbanner';
import Imagetovideo from '../utilis/Imagetovideo';
import Postimgslider from '../utilis/Postimgslider';
import Multipost from '../utilis/Multipost';
import axios from 'axios';

const Landingpage = ({ active ,changeVideo}) => {

    const [title, setTitle] = useState('મહાત્માં ગાંઘીજીની જીવનગાથા | રાષ્ટ્રપિતા ગાંધીબાપુ જીવનકથા ગુજરાતી')

    const [moreData, setMoreData] = useState([
        'મહાત્માં ગાંઘીજીની જીવનગાથા | રાષ્ટ્રપિતા ગાંધીબાપુ જીવનકથા ગુજરાતી',
        'Mahatma Gandhi Bapu Life story in Gujarati'
    ])

    const [profile, setProfile] = useState({
        video_img: '',
        name: '',
        img: '',
        time: '',
        view: ''
    })

    const data = {
        title,
        moreData,
        profile,
        changeVideo,
    }

    const [all, setAll] = useState([])

    const [allPost, setAllpost] = useState([
        {
            image: [
                'https://infogujarat.in/news/2503160807090.jpg',
                'https://infogujarat.in/news/2503161032530.png',
                'https://infogujarat.in/news/2503161032530.png',
            ],
            title: 'મહાત્માં ગાંઘીજીની જીવનગાથા | રાષ્ટ્રપિતા ગાંધીબાપુ જીવનકથા ગુજરાતી',
            moreData: [
                'મહાત્માં ગાંઘીજીની જીવનગાથા | રાષ્ટ્રપિતા ગાંધીબાપુ જીવનકથા ગુજરાતી',
                'Mahatma Gandhi Bapu Life story in Gujarati',
            ],
            profile: {
                name: 'Ketan Savaliya',
                img: 'https://infogujarat.in/images/250227163049image.jpg',
                time: '1 day ago',
                view: '146'
            },
        },
        {
            image: [
                'https://infogujarat.in/news/2503160807090.jpg',
                'https://infogujarat.in/news/2503161032530.png',
                'https://infogujarat.in/news/2503161032530.png',
            ],
            title: 'મહાત્માં ગાંઘીજીની જીવનગાથા | રાષ્ટ્રપિતા ગાંધીબાપુ જીવનકથા ગુજરાતી',
            moreData: [
                'મહાત્માં ગાંઘીજીની જીવનગાથા | રાષ્ટ્રપિતા ગાંધીબાપુ જીવનકથા ગુજરાતી',
                'Mahatma Gandhi Bapu Life story in Gujarati',
            ],
            profile: {
                name: 'Ketan Savaliya',
                img: 'https://infogujarat.in/images/250227163049image.jpg',
                time: '1 day ago',
                view: '146'
            },
        },
    ])

    const [multiPost, setMulipost] = useState([
        {
            img: 'https://infogujarat.in/news/2503151721430.jpeg',
            title: 'PM નરેન્દ્ર મોદી એપ્રિલમાં ચોથી વખત શ્રીલંકાની લેશે મુલાકાત, સૌર ઉર્જા પ્લાન્ટનું કરશે ઉદ્ઘાટન',
        },
        {
            img: 'https://infogujarat.in/news/2503151711060.jpg',
            title: 'આગામી ૧૦૦ કલાકમાં રાજ્યભરના અસામાજીક ગુંડા તત્વોની યાદી તૈયાર કરવા રાજ્યના પોલીસ વડા વિકાસ સહાયનો આદેશ',
        },
        {
            img: 'https://infogujarat.in/news/2503151611330.jpg',
            title: 'PM નરેન્દ્ર મોદી એપ્રિલમાં ચોથી વખત શ્રીલંકાની લેશે મુલાકાત, સૌર ઉર્જા પ્લાન્ટનું કરશે ઉદ્ઘાટન',
        },
        {
            img: 'https://img.youtube.com/vi/j-vVQAUedzs/0.jpg',
            title: 'PM નરેન્દ્ર મોદી એપ્રિલમાં ચોથી વખત શ્રીલંકાની લેશે મુલાકાત, સૌર ઉર્જા પ્લાન્ટનું કરશે ઉદ્ઘાટન',
        },
    ])

    const apiUrl = import.meta.env.VITE_APP_BASEURL;


    useEffect(() => {
        const allMenu = async () => {
            const response = await axios.get(`${apiUrl}news/1/${active}`);
            if (response.data.status) {
                // const filter = response.data.data.filter(list => list.type == 3)
                setAll(response.data.data)
                // setProfile({
                //     ...profile,
                //     name: response.data.data.user.name,
                //     img: response.data.data.user.image ? response.data.data.user.image_path + '/' + response.data.data.user.image : null,
                //     time: response.data.data.create_date,
                //     view: response.data.data.count,
                //     share: response.data.data.id,
                //   })
                // setAll(filter)
            }
        }
        allMenu()
    }, [active])

    return (
        <>
            <div className="mb-20 space-y-2">
                {all.map((list, i) => (
                    <>
                        {list.type == 1 &&
                            <Imagetovideo key={i} {...data} list={list} bannerText={list?.blog_ticker[0]}/>
                        }
                        {list.type == 2 &&
                            <Postimgslider key={i} list={list} />
                        }
                        {/* {list.type == 3 &&
                            <Postimgslider key={i} list={list} />
                        } */}
                    </>
                ))}
                {/* <Multipost list={multiPost} />   


                <Imagetovideo {...data} /> */}
            </div>
        </>
    )
}

export default Landingpage