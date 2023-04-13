import React, { useEffect,useState} from 'react';
import axios from 'axios';
import moment from "moment";
import logo from './images/logo.svg';
import Select from 'react-select';
import thermometer from './images/thermometer.svg';
import humidity from './images/humidity.svg';
import rainfall from './images/rainfall.svg';
import wind from './images/wind.svg';
import bgCloud from './images/Cloud image.png';
import './style/main.css';
import 'moment/locale/ru';
import { foreachIconsWeather, currentIcon }  from './constants/IconsWeather';

const format = {
  clock:"HH:mm",
}  
function App() {
  const [citys, setCitys] = useState('Agapovka');
  const options = [];
  const [cityArray, setCityArray] = useState([]);
  const [timezones, setTimeZones] = useState(420)
  const [nowWeather, setNowWeather] = useState([])
  const [todayClock,setTodayClock] = useState();

  function forEachCityArray (){
    cityArray.forEach((item) => {
      const itemValue = item.toLowerCase();
      options.push({value:`${itemValue}`,label:`${item}`});
    })

  }
  useEffect ( () => {
    const newTimeZone = setInterval(() => {
      setTodayClock(() => moment().utcOffset(timezones,false).locale("ru").format(format.clock))
   },1000);
   return () => clearInterval(newTimeZone);
  },[timezones])
  
  useEffect ( () => {
    async function fetchCitys () {
      try{
        const result = await axios.get(`https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/master/countries.json`)
        setCityArray(result.data.Russia);
      } catch (e) {
        alert(e);
      } 
    }
    fetchCitys ();
  },[])
  if(cityArray.length > 0){
    forEachCityArray ();
  }
  useEffect ( () => {
    async function fetchDataWeather () {
      try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${citys}&&lang=ru&appid=8fa6359189312e13113b04184b6b7f72&units=metric`)
        setTimeZones(response.data.timezone / 60);
        setNowWeather(response.data);
        foreachIconsWeather(response.data.weather[0].description);
      } catch (e) {
        alert(e);
      } 
    }
    fetchDataWeather();
  },[citys])
  
  return (
    <div className="App">
      <div className='container'>
        <header className='header' >
        <a href="/" className='header__logo'>
                <img src={logo} width="65" height="65" alt="" />
                <p>React weather</p>
            </a>
        <Select options={options} onChange={(event) => setCitys(event.label)} unstyled className='header-select-container'
              classNamePrefix='header-select' placeholder={citys} />
        </header>
        <section className='today'>
          <div className='today__data'>
            <div className='today__inner'>
              <div className='today__temp'>
                {nowWeather.main ? <p className='today__number'>
                  {Math.trunc(nowWeather.main.temp)}°
                </p> : null}
                <p className='today__text'>
                  Сегодня
                </p>
              </div>
              <img className='today__icon' src={currentIcon} alt="" width="119" height="119" />
            </div>
            <p className='today__time'>
              Время: {todayClock}
            </p>
              <p className='today__city'>
                Город: {nowWeather.name}
              </p>
          </div>
          <div className='today__info'>
            <img src={bgCloud} className="today__img" width="460" height="202" alt="" />
            <ul className='today-list'>
              <li className='today-list__item'>
                <div className='today-list__inner'>
                  <img className='today-list__img' src={thermometer} width='25' height='25' alt="" />
                </div>
                <div className='today-list__content'>
                  <p className='today-list__text'>
                    Температура
                  </p>
                  {nowWeather.main ?
                    <span className='today-list__span'>
                      {Math.trunc(nowWeather.main.temp)}°  ощущается как {Math.floor(nowWeather.main.feels_like)}°
                    </span> : null}
                </div>
              </li>
              <li className='today-list__item'>
                <div className='today-list__inner'>
                  <img className='today-list__img' src={humidity} width='25' height='25' alt="" />
                </div>
                <div className='today-list__content'>
                  <p className='today-list__text'>
                    Давление
                  </p>
                  {nowWeather.main ?
                    <span className='today-list__span'>
                      {Math.floor(nowWeather.main.pressure * 0.750)} ртутного столба
                    </span> : null}
                </div>
              </li>
              <li className='today-list__item'>
                <div className='today-list__inner'>
                  <img className='today-list__img' src={rainfall} width='25' height='25' alt="" />
                </div>
                <div className='today-list__content'>
                  <p className='today-list__text'>
                    Осадки
                  </p>
                  {nowWeather.weather ?
                    <span className='today-list__span'>
                      {nowWeather.weather[0].description}
                    </span> : null}
                </div>
              </li>
              <li className='today-list__item'>
                <div className='today-list__inner'>
                  <img className='today-list__img' src={wind} width='25' height='25' alt="" />
                </div>
                <div className='today-list__content'>
                  <p className='today-list__text'>
                    Ветер
                  </p>
                  {nowWeather.wind ?
                    <span className='today-list__span'>
                      {Math.ceil(nowWeather.wind.speed)} м/с  
                    </span> : null
                  }
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
