import React,{useContext} from 'react';
import thermometer from '../images/thermometer.svg';
import humidity from '../images/humidity.svg';
import rainfall from '../images/rainfall.svg';
import wind from '../images/wind.svg';
import bgCloud from '../images/Cloud image.png';
import { dataContext } from '../context';

const TodayInfo = () => {
  const{nowWeather} = useContext(dataContext)
    return (
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
    );
};

export default TodayInfo;