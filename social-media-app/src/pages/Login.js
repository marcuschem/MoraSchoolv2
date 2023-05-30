import React from "react";
import {Link} from "react-router-dom";
import LoginForm from "../components/authentication/LoginForm.js";


function Login() {
    return(
        <section className="container-fluid">
            <section className="row">
                <section className="col-md-6 d-flex align-items-center">
                    <section className="content text-center px-4">
                        <h1 className="text-primary">Welcome to the Jungle!</h1>
                        <p className="content">
                            Login now and start enjoying! <br/>
                            Or if you don't have an account, please {
                            <Link to="/register/">Register</Link>
                        }
                        </p>
                    </section>
                </section>
                <section className="col-md-6 p-5">
                    <LoginForm/>
                </section>
            </section>
        </section>
    )
}


export default Login;