import './Login.css';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import tecsup from './assets/img/tecsup.jpeg';

const Login = () => {
    const [email, emailupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);
    const ProceedLoginusingAPI = (e) => {

        //Uso de Api
        e.preventDefault();
        if (validate()) {
            let inputobj = { "email": email, "password": password };
            fetch("http://localhost:8099/api/v1/usuario/login", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Login failed, invalid credentials');
                } else {
                    toast.success('Success');
                    sessionStorage.setItem('username', email);
                    sessionStorage.setItem('jwttoken', resp.jwtToken);
                    usenavigate('/')
                }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }
    return (
        <div className='container'>
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                   <h1 className='text-center fw-bold'>TCMFriends</h1>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav><hr></hr>
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                        <div className="row"  >
                            <div className="col-md-6 container" id='img'>
                                <img className='figure-img img-fluid rounded' style={{ height: 400, width: 500 }} src={tecsup} />
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div className="col-md-18" id='colu' >
                            <form onSubmit={ProceedLoginusingAPI} className="container">
                                <div className="card">
                                    <div className="card-header">
                                        <h2>User Login</h2>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>Email: <span className="errmsg">*</span></label>
                                            <input value={email} onChange={e => emailupdate(e.target.value)} className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Password <span className="errmsg">*</span></label>
                                            <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className='d-grid gap-2 col-6 mx-auto'>
                                            <button type="submit" class="btn btn-success">Iniciar Sesion</button>
                                            <Link to={'/register'} className="btn btn-primary">Registrarse</Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div><hr></hr>
                <footer>
                    <span>TCMFriends 2023 I - G5</span>
                </footer>
            </div>
        </div>

    );

}

export default Login;