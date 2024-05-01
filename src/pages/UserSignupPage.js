import React,{useState} from 'react';
import axios from 'axios';
import InputComponent from '../components/InputComponent';
import {useNavigate} from 'react-router-dom'





function UserSignupPage(){

    const navigate = useNavigate();
    const [form,setForm]    = useState({
        username: undefined,
        password: undefined,
        passwordRepeat: undefined
    });
    
    const [errors, setErrors] = useState({});
    
    
    



    const onChange = (e) =>{
        const {name, value} = e.target;
        
        console.log(name, value);
        setErrors({...errors, [name]: undefined});
        setForm({...form, [name]: value});
       
    }


    const onClickSignup = async (e) => {
        e.preventDefault();
        const {username, password} = form;
        const body = {
            username,
          
            password
        }

    
        try{
        await axios.post('/api/1.0/users', body)
        alert('Üyelik Başarıyla Oluşturuldu')
        navigate('/login')
        } catch(error){
            console.log(error.response.data)
            if(error.response.data.validationErrors){
                setErrors(error.response.data.validationErrors)
            }
            
        }
    }


    
        const {username: usernameError , password: passwordError} = errors;
  
        let passwordRepeatError;
        if(form.password !== form.passwordRepeat){
            passwordRepeatError = 'Şifreler eşleşmiyor';
        }

      
        return(
            /*
            <div className='container'>
                <form>
                    <h1 className="text-center">Sign Up</h1>
                    <InputComponent name="username" onChange={onChange} label="Username" error={usernameError} type="text"></InputComponent>
                    <InputComponent name="displayName" onChange={onChange} label="Display Name" error={displayNameError} type="text"></InputComponent>
                    <InputComponent name="password" onChange={onChange} label="Password" error={passwordError} type="password"></InputComponent>

                    <InputComponent name="passwordRepeat" onChange={onChange} label="Password Repeat" error={passwordRepeatError} type="password"></InputComponent>
                    
                    <div className="text-center mt-4">
                        <button className='btn btn-primary' onClick={onClickSignup} disabled={passwordRepeatError !== undefined}>Sign Up</button>
                    </div>
                </form>
            </div> */
            

            <div className=" my-5 rounded welcome-other" >
              <div className="shadow-sm bg-light mx-5 rounded">
                <div className="card px-4 py-4" style={{ width:"700px", height:"500px" }}>
                  <div className="card-body">
                    <h1 className="card-title text-center mb-4">Üye Ol</h1>
                    <form>
                      <div className="mb-3">
                        <InputComponent
                          name="username"
                          onChange={onChange}
                          label="Kullanıcı Adı"
                          error={usernameError}
                          type="text"
                        />
                      </div>
                     
                      <div className="mb-3">
                        <InputComponent
                          name="password"
                          onChange={onChange}
                          label="Şifre"
                          error={passwordError}
                          type="password"
                        />
                      </div>
                      <div className="mb-3">
                        <InputComponent
                          name="passwordRepeat"
                          onChange={onChange}
                          label="Şifre Tekrarı"
                          error={passwordRepeatError}
                          type="password"
                        />
                      </div>
                      <div className="text-center mt-4">
                        <button
                          className="btn btn-primary"
                          onClick={onClickSignup}
                          disabled={passwordRepeatError !== undefined}
                        >
                          Üye Ol
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

        );
    
}

export default UserSignupPage;