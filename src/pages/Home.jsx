import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'

const Home = () => {
    const [city ,setCity] = useState("");
    const [data ,setData] = useState([]);
    const [location , setLocation] = useState({});
    const [weather , setWeather] = useState({});
    // const [weather , setWeather] = useState({currTime : "N/A" ,currTemp : "N/A"});
    
    async function getCities(){
        if(!city) return alert("Enter a valid city")
        try {
            const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`);
            if(!res.ok){
                throw new Error(`http error : ${res.status}`);
            }
            const data = await res.json();
            if(!data.results) return alert("Enter a valid city")
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

                    // earlier approach
                    // let index=0;
                    // for(const time of data.hourly.time){
                    //     const convertedTime = new Date(time);
                    //     if (convertedTime.getTime() >= Date.now()){
                    //         console.log(convertedTime);
                    //         break;
                    //     }
                    //     index++;
                    // }

                    let index= data.hourly.time.findIndex(t => new Date(t) > new Date())
                    if(index === -1 ) index = data.hourly.time.length - 1;
                    if(index > 0) index-=1;

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


  return (
    <>
        <SearchBar city={city} setCity={setCity} getCities={getCities} />
        
        <div className='flex h-[80vh] w-full'>
            <div className='overflow-y-scroll w-1/2'>
                <div >
                    {data.map((el,idx)=>
                    <div key={idx} data-latitude={el.latitude} data-name={el.name} data-longitude={el.longitude} 
                    className='odd:bg-gray-300 cursor-pointer hover:bg-blue-400 duration-200'
                    onClick={(e)=>setLocation({name:el.name,latitude:Number(e.target.dataset.latitude),longitude:Number(e.target.dataset.longitude)})}
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
                    Current Time : {weather.currTime || "N/A"}
                </h2>
                <h2 className='text-xl font-medium mx-10'>
                    Current Date : {weather.currDate || "N/A"}
                </h2>
                <h2 className='text-xl font-medium mx-10' >
                    Current Temperature : {weather.currTemp}°C
                </h2>
            </div>
        </div>
    </>
  )
}

export default Home
