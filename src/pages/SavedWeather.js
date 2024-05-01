
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";





const SavedWeathers = () => {
    const [weatherData, setWeatherData] = useState([]);
    const { username } = useSelector((store) => store.log);
    const [id, setId] = useState("");

    const fetchWeatherData = async () => {
        await axios.get(`/api/1.0/users`).then((response) => {
        
            response.data.data.forEach((item) => {
            if (item.username === username) {
                setId(item.id);
            } else if (item.username !== username) {
                console.log("hata");
            }
            });
        });
    };
  
  useEffect(() => {
    fetchWeatherData();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/1.0/cities/user/${id}`);
      console.log(response.data);
      setWeatherData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);
 

  if (weatherData.length === 0) {
    return (
        <div>
      <h1 className="text-center mb-5 align-items-center" style={{ fontWeight: "bold", fontSize: "60px" }}>Kayıtlı Hava Durumu Bilgileri</h1>
      <div style={{ textAlign: 'center', marginTop: '25vh' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '30px', opacity: '0.6' }}>Henüz Hava Durumu Kaydı Yapmadınız</h1>
      </div>
    </div>
    );
  }
  return (
    <div>
    <h1 className="text-center mb-5 align-items-center" style={{ fontWeight: "bold", fontSize: "60px" }}>Kayıtlı Hava Durumu Bilgileri</h1>
  <div style={{ margin: "70px 10px 20px 50px" ,display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 30 }}>
    {weatherData.map((item) => (
      <div className="weather" style={{ margin: 15 }} key={item.id}>
        <div className="top">
          <div>
            <p className="city">{item.cityName}</p>
          </div>
          <img className="weather-icon" src={`icons/${item.icon}.png`} alt="weather icon" />
        </div>
        <div className="bottom">
          <p className="temperature">{item.temp}°C</p>
          <div className="details">
          <span className='parameter-label ' style={{ fontWeight: "bold", fontSize: "20px" }}>Time</span>
            <div className='parameter-row'>
              
              <div className='parameter-row' style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <span className='parameter-label' style={{ fontWeight: "bold", fontSize: "15px", color: "red" }}>{item.infoDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );


}

export default SavedWeathers;