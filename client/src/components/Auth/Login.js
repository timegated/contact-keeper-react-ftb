import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {
    const [user, setUser] = useState({ email: '', password: '' });
    const { email, password } = user;

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            // redirect
            props.history.push('/');
        };

        if (error === 'invalid credentials') {
            setAlert(error, 'danger');
            clearErrors()
        };
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        if (email === '' || password === '') {
           setAlert('Fields can\'t be empty', 'danger')
        } else {
            login({
                email,
                password
            })
       }
        e.preventDefault();
    };

    return (
        <div className="form-container" >
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block" required />
            </form>
        </div>
    );
};

export default Login;
