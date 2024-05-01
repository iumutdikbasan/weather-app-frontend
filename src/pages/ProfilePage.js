import React, {  useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import InputComponent from "../components/InputComponent";
import { useDispatch } from "react-redux";
import {  logout } from "../redux/logSlice";

const ProfilePage = () => {
  const [user, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { username } = useSelector((store) => store.log);

  const Logout = () => {
    dispatch(logout());
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  axios.get(`/api/1.0/users`).then((response) => {
    // İstek başarılı olduğunda geri dönüşü işle

    response.data.data.forEach((item) => {
      if (item.username === username) {
        setId(item.id);
      } else if (item.username !== username) {
        console.log("hata");
      }
    });
  });
  console.log(id);
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: user,
      password: password,
    };

    axios
      .put(`/api/1.0/users/${id}`, userData)
      .then((response) => {
        // İstek başarılı olduğunda geri dönüşü işle
        console.log(response);

        alert("Profil Güncellendi");
        Logout();
        navigate.push("/login");
      })
      .catch((error) => {
        // İstek başarısız olduğunda hata işle
        console.error(error);
      });
  };


  


  return (
    <div className=" my-5 rounded welcome-other">
      <div className="shadow-sm bg-light mx-5 rounded">
        <div
          className="card px-4 py-4"
          style={{ width: "700px", height: "400px" }}
        >
          <div className="card-body">
            <h1 className="card-title text-center mb-4">Profil Güncelle</h1>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <InputComponent
                  label="Kullanıcı Adı"
                  type="text"
                  value={user}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="mb-3">
                <InputComponent
                  label="Şifre"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="text-center mt-4">
                <button className="btn btn-primary" type="submit">
                  Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      
    </div>
    
  );
};

export default ProfilePage;