import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {

    const [usuarioname, usernamechange] = useState("");
    const [email, emailchange] = useState("");
    const [password, passwordchange] = useState("");


    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (usuarioname === null || usuarioname === '') {
            isproceed = false;
            errormessage += ' Username';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' email';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' password';
        }
        return isproceed;
    }


    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { usuarioname, email, password };
        if (IsValidate()) {
            //console.log(regobj);
            fetch("http://localhost:8099/api/v1/usuario/save", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Registered successfully.')
                navigate('/login');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }
    return (
        <div className="container">
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                    <h1 className='text-center fw-bold'>TCMFriends</h1>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav><hr></hr>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>Registro de Usuario</h1>
                        </div>
                        <div className="card-body">

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Usuario: <span className="errmsg"></span></label>
                                        <input value={usuarioname} onChange={e => usernamechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Email:<span className="errmsg"></span></label>
                                        <input value={email} onChange={e => emailchange(e.target.value)} type="email" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Contraseña: <span className="errmsg"></span></label>
                                        <input value={password} onChange={e => passwordchange(e.target.value)} className="form-control" type="password"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div class="d-grid gap-2 col-6 mx-auto">
                                <button type="submit" class="btn btn-primary">Registrarse</button>
                                <Link to={'/login'} className="btn btn-success">Iniciar Sesion</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div><hr></hr>
            <footer className="text-center">
                <span>TCMFriends 2023 I - G5</span>
            </footer>
        </div>
    );
}

export default Register;