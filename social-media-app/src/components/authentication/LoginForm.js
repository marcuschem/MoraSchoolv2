import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useUserActions} from "../../hooks/user.actions.js";


function LoginForm() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({});
    const [error, setError] = useState(null);
    const userActions = useUserActions();

    const handleSubmit = (event) => {
        event.preventDefault();
        const loginForm = event.currentTarget;

        if (loginForm.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        const data = {
            username: form.username,
            password: form.password
        };
        userActions.login(data).catch(
    (err) => {
        if (err.message){
            setError(err.request.response);
        }
    }
)
        axios.post("http://localhost:8000/api/auth/login/", data)
            .then(
                (res) => {
                    localStorage.setItem(
                        "auth", JSON.stringify(
                            {
                                access: res.data.access,
                                refresh: res.data.refresh,
                                user: res.data.user,
                            }
                        )
                    );
                    navigate("/");
                }
            ).catch((err) => {
                if (err.message) {
                    setError(err.request.response);
                }
        });
    };
    return(
        <Form id="registration-form"
              className="border p-4 rounded"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    value={form.username}
                    onChange={(e) => setForm({
                        ...form, username: e.target.value
                    })}
                    required
                    type="text"
                    placeholder="Enter username"
                >
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    This field is required.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    value={form.password}
                    minLength={8}
                    onChange={(e) => setForm(
                        {
                            ...form, password: e.target.value
                        }
                    )}
                    required
                    type="password"
                    placeholder="Password"
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                    Please provide a valid password
                </Form.Control.Feedback>
            </Form.Group>
            <section className="text-content text-danger">
                {error && <p>{error}</p>}
            </section>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
}


export default LoginForm;