import sun from '../images/sun.svg';
import rain from '../images/rain.svg';
import cloudy from '../images/cloudy.svg';
import mainlyCloudy from '../images/mainly_cloudy.svg'
import smallRain from '../images/small_rain.svg';
import smallRainSun from '../images/small_rain_sun.svg';
import show from '../images/snow.svg';

const iconsWeather = {
    mainlyCloudy: mainlyCloudy,
    cloudy:cloudy,
    rain:rain,
    sun:sun,
    show:show,
    smallRain:smallRain,
    smallRainSun:smallRainSun
}
export let currentIcon;
export function foreachIconsWeather(value){
    
    switch(value){
        case "ясно": currentIcon=iconsWeather.sun;
        break;
        case "пасмурно": currentIcon=iconsWeather.cloudy;
        break;
        case "небольшая облачность": currentIcon=iconsWeather.mainlyCloudy;
        break;
        case "переменная облачность": currentIcon=iconsWeather.mainlyCloudy;
        break;
        case "облачно с прояснениями": currentIcon=iconsWeather.mainlyCloudy;
        break;
        case "небольшой дождь": currentIcon=iconsWeather.smallRain;
        break;
        case "временами дождь": currentIcon=iconsWeather.smallRainSun;
        break;
        case "дождь": currentIcon=iconsWeather.rain;
        break;
        case "ливень": currentIcon=iconsWeather.rain;
        break;
        case "гроза": currentIcon=iconsWeather.rain;
        break;
        case "снег": currentIcon=iconsWeather.show;
        break;
        case "небольшой снег": currentIcon=iconsWeather.show;
        break;
        default: ;
    }
    return currentIcon;
}