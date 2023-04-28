import React,{useContext} from 'react';
import { dataContext } from '../context';
import { currentIcon}  from '../constants/IconsWeather';
const TodayData= () => {
  const{nowWeather, todayClock} = useContext(dataContext)

  return (
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
              <img src={currentIcon} className='today__icon' alt="" width="119" height="119" />
            </div>
            <p className='today__time'>
              Время: {todayClock}
            </p>
              <p className='today__city'>
                Город: {nowWeather.name}
              </p>
          </div>

    );
};

export default TodayData;