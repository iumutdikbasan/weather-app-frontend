import React,{useState,useEffect} from 'react'
import InputComponent from '../components/InputComponent';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {login} from '../redux/logSlice'


function LoginPage() {

    


    
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        setError(undefined);

        
    }, [username, password])


    const onClickSignup = async (e) => {
        e.preventDefault();
        

        const creds = {
            username,
            password
        }
        try{
            await axios.post('/api/1.0/auth',{}, {auth: creds})
            dispatch(login(  {username: username}))
            navigate.push('/')
            
        }catch(err){
            
            setError(err.response.data.message);

        }
        
        
        
    }
    
    

   

    const disableInput  = username && password;
    
   

   

    return (

        
        /*
        <div className='container'>
            <form>
            
                <h1 className="text-center">Login</h1>
                <InputComponent name="username" onChange={(e) =>{
                    setUsername(e.target.value)
                }} label="Username" type="text"></InputComponent>
                <InputComponent name="password" onChange={(e) => {
                    setPassword(e.target.value)
                    
                }} label="Password" type="password"></InputComponent>
                <div className={error ? "alert alert-danger" : ""} role="alert">
                    {error}
                </div>
                
                <div className="text-center mt-4">
                    <button onClick={onClickSignup} disabled={!disableInput} className='btn btn-primary' >Login</button>
                    
                </div>
            </form>
        </div>
        */
       <div className="my-5 welcome-other">
        <div className="shadow-sm bg-light mx-5 rounded">
        <div className="card px-4 py-5" style={{ width:"700px", height:"450px" }}>
          <div className="card-body">
            <h1 className="card-title text-center mb-4">Giriş Yap</h1>
            <form>
              <div className="mb-3">
                <InputComponent
                  name="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  label="Kullanıcı Adı"
                  type="text"
                />
              </div>
              <div className="mb-3">
                <InputComponent
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  label="Şifre"
                  type="password"
                />
              </div>
              <div className={error ? "alert alert-danger" : ""} role="alert">
                {error}
              </div>
              <div className="text-center mt-4">
                <button
                  onClick={onClickSignup}
                  disabled={!disableInput}
                  className="btn btn-primary"
                >
                  Giriş
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
        </div>
    )
}


export default LoginPage