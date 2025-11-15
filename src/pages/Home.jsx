import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'

const Home = () => {
    const [city ,setCity] = useState("");
    const [data ,setData] = useState([]);
    const [location , setLocation] = useState({});
    const [weather , setWeather] = useState({currTime : "N/A" ,currTemp : "N/A"});
    
    async function getCities(){
        try {
            const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`);
            if(!res.ok){
                throw new Error(`http error : ${res.status}`);
            }
            const data = await res.json();
            setData(data.results)
            
        } catch (error) {
            setData([{name:`Error ${error}`}])
            console.error(error);
        }
    }

    useEffect(()=>{
        async function fetchWeather(){

            try {
                console.log(location);
                const {latitude,longitude} =location || {};
                if (latitude && longitude ){
                    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`)
                    if (!res.ok){
                        throw new Error(`error : status code ${res.status}`)
                    }
                    const data = await res.json();
                    console.log(data.hourly);
                    // data.hourly.time.forEach((time)=>{
                    //     const convertedTime = new Date(time);
                    //     if (convertedTime.getTime() >= Date.now()){
                    //         console.log(convertedTime);
                            
                    //     }
                    // })
                    let index=0;
                    for(const time of data.hourly.time){
                        const convertedTime = new Date(time);
                        if (convertedTime.getTime() >= Date.now()){
                            console.log(convertedTime);
                            break;
                        }
                        index++;
                    }
                    const currDate =new Date();
                    setWeather({currDate: currDate.toISOString().split('T')[0] ,currTime : currDate.toLocaleTimeString() ,currTemp : data.hourly.temperature_2m[index] })
                    console.log("current temperature :",data.hourly.temperature_2m[index])
                }
    
            } catch (error) {
                console.error(error)
            }
        }
        fetchWeather();

    },[location]);

    // const getWeather = (e)=>{
    //     console.log(e.target)
    //     console.log(e.target.dataset.latitude)
    //     console.log(e.target.dataset.longitude)
    // }

  return (
    <>
        <SearchBar city={city} setCity={setCity} getCities={getCities} />
        
        <div className='flex h-[80vh] w-full'>
            <div className='overflow-y-scroll w-1/2'>
                <div >
                    {data.map((el,idx)=>
                    <div key={idx} data-latitude={el.latitude} data-name={el.name} data-longitude={el.longitude} 
                    className='odd:bg-gray-400 cursor-pointer hover:bg-blue-400 duration-200'
                    onClick={(e)=>setLocation({name:el.name,latitude:e.target.dataset.latitude,longitude:e.target.dataset.longitude})}
                    >
                        {idx+1} {")"} {el.name} ,{el.admin1} , {el.country} , <br /> <b>TimeZone:</b> {el.timezone}
                    </div>)}
                </div>
            </div>
            <div className='w-1/2'>
                <img src="cloudy.png"
                className='w-1/2 m-auto mt-10'
                alt="cloudy" />
                <h2 className='text-xl font-medium mt-10 mx-10'>
                    Current Time : {weather.currTime}
                </h2>
                <h2 className='text-xl font-medium mx-10'>
                    Current Date : {weather.currDate}
                </h2>
                <h2 className='text-xl font-medium mx-10' >
                    Current Temperature : {weather.currTemp}
                </h2>
            </div>
        </div>
    </>
  )
}

export default Home
