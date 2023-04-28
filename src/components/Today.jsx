import React, {useEffect,useState,useContext} from 'react';
import TodayData from './TodayData';
import TodayInfo from './TodayInfo';
import 'moment/locale/ru';
import { foreachIconsWeather}  from '../constants/IconsWeather';
import axios from 'axios';
import moment from "moment";
import { cityContext } from '../context';
import { dataContext } from '../context'; 

const format = {
    clock:"HH:mm",
  }  
const Today = () => {
  const{citys} = useContext(cityContext)
    const [timezones, setTimeZones] = useState(420)
    const [nowWeather, setNowWeather] = useState([])
    const [todayClock,setTodayClock] = useState();
    
    
    useEffect ( () => {
      const newTimeZone = setInterval(() => {
        setTodayClock(() => moment().utcOffset(timezones,false).locale("ru").format(format.clock))
     },1000);
     return () => clearInterval(newTimeZone);
    },[timezones])
    
    useEffect ( () => {
      async function fetchDataWeather () {
        try{
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${citys}&&lang=ru&appid=8fa6359189312e13113b04184b6b7f72&units=metric`)
          setTimeZones(response.data.timezone / 60);
          setNowWeather(response.data);
          console.log(response.data)
          foreachIconsWeather(response.data.weather[0].description);
        } catch (e) {
          alert(e);
        } 
      }
      fetchDataWeather();
    },[citys])
    return (
        <dataContext.Provider value={{
            nowWeather, 
            todayClock
          }}>
          <section className='today'>
              <TodayData></TodayData>
              <TodayInfo></TodayInfo>
          </section>
        </dataContext.Provider>
    );
};

export default Today;