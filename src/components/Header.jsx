import React, { useContext, useEffect,useState} from 'react';
import axios from 'axios';
import logo from '../images/logo.svg';
import Select from 'react-select';
import { cityContext } from '../context';


const Header = () => {
    const{citys, setCitys } = useContext(cityContext)
    const options = [];
    const [cityArray, setCityArray] = useState([]);
    function forEachCityArray (){
        cityArray.forEach((item) => {
          const itemValue = item.toLowerCase();
          options.push({value:`${itemValue}`,label:`${item}`});
        })
    
      }
    
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
      
    return (
        <header className='header' >
        <a href="/" className='header__logo'>
                <img src={logo} width="65" height="65" alt="" />
                <p>React weather</p>
            </a>
        <Select options={options} onChange={(event) => setCitys(event.label)} unstyled className='header-select-container'
              classNamePrefix='header-select' placeholder={citys} />
        </header>
    );
};

export default Header;