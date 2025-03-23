import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './components/Hero'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landingpage from './pages/Landingpage'
import Aos from 'aos'
import 'aos/dist/aos.css';
import Menu from './components/Menu'
import First from './components/First'
import Postdata from './utilis/Postdata'
import { Modal } from 'flowbite-react'
import axios from 'axios'
import { Userstate } from './context/Userstate'

function App() {

  const params = new URLSearchParams(window.location.search);
  const nidValue = params.get('nid');

  Aos.init({
    duration: 2000,
    easing: 'ease',
  });

  const [active, setActive] = useState(0)

  const [title, setTitle] = useState('')

  const [moreData, setMoreData] = useState([])

  const [profile, setProfile] = useState({
    name: '',
    logo: '',
    img: '',
    time: '',
    view: '',
    share: '',
  })

  const [heroData, setHerodata] = useState()
  const [menu, setMenu] = useState([])
  const [menu2, setMenu2] = useState([])
  const [scrollNews, setNews] = useState()
  const [bannerImg, setBannerimg] = useState([])
  const [newsData, setNewsData] = useState([])
  const [delay, setDelay] = useState(null)
  const [bannerDelay, setBannerdelay] = useState(null)
  const [bannerText, setBannerText] = useState([]);
  const [allData, setAlldata] = useState()
  const [shareImg, setShareimg] = useState(null)

  const apiUrl = import.meta.env.VITE_APP_BASEURL;

  useEffect(() => {
    if (!nidValue) {
      const allMenu = async () => {
        try {
          const response = await axios.get(`${apiUrl}common/1`);
          if (response.data.status) {
            setProfile({
              ...profile,
              logo: response.data.data.Setting.news_logo ? response.data.data.Setting.news_logo_path : '',
            })
            setMenu(response.data.data.Category.map(list => ({
              to: list.id,
              name: list.name
            })))
            setMenu2(response.data.data.Cms.map(list => ({
              to: list.id,
              name: list.title
            })))
            setHerodata(response.data.data.Video[0].video)
            const allNews = response.data.data.ScrollNews.map(list => list.news)
            setNews(allNews)
            setBannerimg(response.data.data.BannerAds.map(list => list.image ? list.image_path : ''))
            setNewsData(response.data.data.BottomNews.map(list => list.name))
            setDelay(response.data.data.Setting.bottom_news_cycle)
            setBannerdelay(response.data.data.Setting.banner_ads_cycle)
            setProfile({
              ...profile,
              name: response.data.data.user?.name,
              img: response.data.data.user?.image ? response.data.data.user.image_path + '/' + response.data.data.user.image : null,
              time: response.data.data.create_date,
              view: response.data.data.count,
              share: response.data.data.id,
            })
          }
        } catch (err) {
          console.log(err)
        }
      }
      allMenu()
    }
  }, [])

  const protocol = window.location.protocol;  // 'http:' or 'https:'
  const host = window.location.hostname;      // e.g., '192.168.29.202'
  const port = window.location.port;

  const changeVideo = async (list) => {
    setHerodata(null)
    setShareimg(null)
    setBannerText([])
    setTitle('')
    setMoreData('')
    setProfile({
      name: '',
      logo: '',
      img: '',
      time: '',
      view: '',
      share: '',
      video_img: '',
    })
    try {
      const response = await axios.get(`${apiUrl}news_details/1/${list?.id}`);
      if (response.data.status) {
        setHerodata(response.data.data.blog_image[0].details)
        setShareimg(response.data.data.blog_image[0].details)
        setBannerText(response.data.data.blog_ticker.map(list => list.details))
        setTitle(response.data.data.title)
        setMoreData(response.data.data.description)
        setProfile({
          ...profile,
          video_img: response.data.data.blog_image[0].details,
          name: response.data.data.user.name,
          img: response.data.data.user.image ? response.data.data.user.image_path + '/' + response.data.data.user.image : null,
          time: response.data.data.create_date,
          view: response.data.data.count,
          share: response.data.data.id,
        })
        document.querySelector('meta[property="og:title"]').setAttribute("content", response.data.data.title);
        document.querySelector('meta[property="og:site_name"]').setAttribute("content", 'Info Gujarat');
        document.querySelector('meta[property="og:description"]').setAttribute("content", typeof response.data.data.description === 'string' ? response.data.data.description.replace(/(<([^>]+)>)/gi, '') : '');
        document.querySelector('meta[property="og:image"]').setAttribute("content", `https://img.youtube.com/vi/${response.data.data.blog_image[0].details}/0.jpg`);
        document.querySelector('meta[property="og:url"]').setAttribute("content", `${protocol}//${host}${port ? `:${port}` : ''}/?nid=${list?.id}`);
        document.title = response.data.data.title;
      }
    } catch (err) {
      console.log(err)
    }
  }


  const data = {
    title,
    moreData,
    shareImg,
    profile,
    heroData,
    scrollNews,
    bannerImg,
    newsData,
    delay,
    bannerDelay,
    active,
    setActive,
    bannerText,
    changeVideo,
  }


  useEffect(() => {
    if (nidValue) {
      changeVideo({
        id: nidValue
      })
    }
  }, [nidValue])

  return (
    <>
      <div className='sticky top-0 z-50 bg-white'>
        <Menu menu={menu} first={true} setActive={setActive} />
        <First {...data} />
      </div>
      <Menu menu={menu2} />
      <Postdata {...data} />
      <Routes>
        <Route path='/' element={<Landingpage {...data} />} />
      </Routes>
    </>
  )
}

export default App
