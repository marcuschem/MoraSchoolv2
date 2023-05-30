import React from "react";
import {Link} from "react-router-dom";
import RegistrationForm from "../components/authentication/RegistrationForm.js";


function Registration(){
    return(
        <section className="container-fluid">
            <section className="row">
                <section className="col-md-6 d-flex align-items-center">
                    <section className="content text-center px-4">
                        <h1 className="text-primary">
                            Welcome to The Jungle!
                        </h1>
                        <p className="content">
                            This is a new social media site that will
                            allow you to share your thoughts and experiences
                            with your friends. Register now and start enjoying! <br/>
                            Or if you already have an account, please {
                            <Link to="/login/">Login</Link>
                        }
                        </p>
                    </section>
                </section>
                <section className="col-md-6 p-5">
                    <RegistrationForm/>
                </section>
            </section>
        </section>
    )
}


export default Registration;