import React from 'react'

function InputComponent(props) {
    const {name, onChange, label, error, type} = props;

    
    
  return (


    <div>
        <label className="form-label">{label}</label>
        <input className={error ? "form-control is-invalid" : "form-control"} name={name} onChange={onChange} type={type}></input>
        <div className="invalid-feedback">
            {error}
        </div>
    </div>
  )
}

export default InputComponent