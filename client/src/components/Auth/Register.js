import React, { useState, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Register = () => {
    const [user, setUser] = useState({ name: '', email: '', password: '', password2: '' });
    const { name, email, password, password2 } = user;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        if (name === '' || email === '' || password === '') {
            setAlert('Fields can\'t be empty');
        } else if (password !== password2) {
            setAlert('Passwords much match');
        } else {
            console.log('Register submit');
        }
        
        e.preventDefault();
    };

    return (
        <div className = "form-container" >
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" value={password} onChange={onChange} required minLength="6" />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="text" name="password2" value={password2} onChange={onChange} required minLength="6" />
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
        </div>
    );
};

export default Register;
