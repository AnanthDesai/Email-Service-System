import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios';

const Login = () => {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [tab, setTab] = useState(0)

    useEffect(() => {
        axios.defaults.headers.common['Content-Type'] = 'application/json';
    }, [])

    const handleLogin = () => {
        axios.post('http://localhost:5000/login', {
            username: username,
            password: password
        })
            .then((res) => {
                if (res.status === 202) {
                    window.localStorage.setItem("User", username);
                    window.location.reload();
            }
        })
    }

    const handleRegister = () => {
        axios.post('http://localhost:5000/register', {
            name,
            username,
            password
        })
            .then((res) => {
                if (res.status === 201) {
                    window.location.reload();
                }
            })
    }

    return (
        <div>
            <Wrapper>
                <ButtonsWrapper>
                    <button
                        className={tab === 0 ? 'selected' : ''}
                        onClick={() => setTab(0)}
                    >
                        Login
                    </button>
                    <button
                        className={tab === 1 ? 'selected' : ''}
                        onClick={() => setTab(1)}
                    >
                        Register
                    </button>
                </ButtonsWrapper>
                
                {tab === 0 &&
                    <>
                        <b>
                            LOGIN
                        </b>
                        
                        <div>
                            Username : <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value) } />
                        </div>
                        <div>
                            Password : <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </>
                }

                {tab === 1 &&
                    <>
                    <b>
                        REGISTER
                    </b>
                
                    <div>
                        Name : <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value) } />
                    </div>
                    <div>
                        Email : <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value) } />
                    </div>
                    <div>
                        Password : <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    </>
                }
                
                <button
                    onClick={() => tab === 0 ? handleLogin() : handleRegister()}
                >
                    Submit
                </button>
               
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    display: grid;
    justify-items: center;
    border: 1px solid lightgrey;
    div {
        padding-top: 30px;

        input {
            height: 35px;
        }
    }

    button {
        padding: 10px 20px;
        margin: 20px;
    }
`

const ButtonsWrapper = styled.div`
    .selected {
        border: 5px solid darkgrey;
    }
`

export default Login
