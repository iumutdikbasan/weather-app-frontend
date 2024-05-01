import React,{ useState } from 'react'
import {useSelector} from 'react-redux'
import Search from '../components/Search'
import CurrentWeather from '../components/CurrentWeather'
import Forecast from '../components/Forecast'
import axios from 'axios';

function HomePage() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [id, setId] = useState(null);

  const {username} = useSelector(store => store.log)
  const [cityName, setCityName] = useState(null);

  const date = new Date(); 
  const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
  const newDate = formattedDate + " " + formattedTime;
  function handleOnPostCity(cityName, userId){
    
    const requestBody = {
      cityName: cityName,
      userId: userId,
      temp: Math.floor(currentWeather.data.main.temp),
      infoDate: newDate,
      icon:  currentWeather.data.weather[0].icon,
    };
  
    axios.post(`/api/1.0/cities`, requestBody)
      .then((response) => {
        // İstek başarılı olduğunda geri dönüşü işle
        console.log(response.data);
        alert("Kayıt Başarılı")
      }) 
      .catch((error) => {
        // İstek başarısız olduğunda geri dönüşü işle
        console.log(error);
        alert("Hata")
      }
    );
  };
  
  const handleOnSearchChange =(searchData) =>{
    
    const city = searchData.label;
    setCityName(city)
    axios.get(`/api/1.0/users`).then((response) => {
      // İstek başarılı olduğunda geri dönüşü işle
          
          response.data.data.forEach((item) => {
             
              if(item.username === username){
                  console.log("basarili")
                  setId(item.id)
              }
            });
           
      });
    
    
    
    const currentWeatherFetch = fetch(`/weather/currentWeather?cityName=${city}`);
    const forecastWeatherFetch = fetch(`/weather/data?cityName=${city}`);
    
    Promise.all([currentWeatherFetch, forecastWeatherFetch])
    .then(async (responses) => {
        const weatherResponse = await responses[0].json();
        const forecastResponse = await responses[1].json();
        

        setCurrentWeather({city: searchData.label , ...weatherResponse});
        setForecastWeather({city: searchData.label , ...forecastResponse});

        console.log(weatherResponse.data.main.temp);
    })
    .catch(err => console.log(err));
  }
  
  

  

  return (
       <>
        {
          !username ? (
            <div className="my-5 welcome">
            <div className="container">
              <div className="row">
                <div className="col text-center">
            <div>
              <h1 style={{ color: 'white', fontWeight: 'bold', marginTop: '20px', marginLeft: '-500px', fontSize: '32px' }}>Hoşgeldiniz</h1>
              <h1 style={{ color: 'white', fontWeight: 'bold', marginTop: '20px', marginLeft: '-500px', fontSize: '28px' }}>Hava Durumunu Görmek İçin</h1>
              <h1 style={{ color: 'white', fontWeight: 'bold', marginTop: '20px', marginLeft: '-500px', fontSize: '28px' }}>Üye Ol ve Giriş Yap</h1>
            
            </div>
            </div>
        <div className="col text-center">
        <h1 style={{ color: 'white', fontWeight: 'bold', marginTop: '20px', marginRight: '-500px' }}>WeatherApp </h1>
          </div>
          </div>
        </div>
        </div>
          ) : (
            <div className="container" style={{ marginBottom:"150px" }}>
            <div className="col text-center">
              <div className="card rounded shadow" style={{ padding: '20px' }}>
                <div className="card-body">
                  <h1 className="mb-4"style={{fontWeight:"bold"}}>Hoşgeldin {username}</h1>
                  {
                    cityName && <button className="add-button" onClick={() => handleOnPostCity(cityName, id)}>Bilgileri Kaydet</button>
                  }
                  <Search onSearchChange={handleOnSearchChange} />
                  
                  {currentWeather && <CurrentWeather data={currentWeather} />}
                  {forecastWeather && <Forecast data={forecastWeather} />}
                  {!currentWeather && !forecastWeather && 
                    <div>
                      
                      <div style={{ textAlign: 'center', marginTop: '10vh' }}>
                        <h1 style={{ fontWeight: 'bold', fontSize: '30px', opacity: '0.6' }}>Henüz Şehir Seçimi Yapmadınız</h1>
                      </div>
                    </div>}
                </div>
              </div>
            </div>
            
          </div>
          
          )
        }
        </>
  
  )
}

export default HomePage