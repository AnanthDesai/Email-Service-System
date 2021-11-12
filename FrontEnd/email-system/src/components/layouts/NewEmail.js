import axios from 'axios';
import React, { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core';

const NewEmail = ({ setNewEmail }) => {

    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [sent, setSent] = useState(false);

    const sendEmail = () => {
        axios.post('http://localhost:5000/send', {
            from: window.localStorage.getItem("User"),
            to: to,
            subject,
            message,
            timestamp: Date.now()
        })
            .then((res) => {
                if (res.status === 200) {
                    setSent(true);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Wrapper>
            {!sent && <>
                <BodyWrapper>
                <div>
                    <b>To:</b>
                    <input type='text' placeholder='Email' onChange={(e) => setTo(e.target.value)} />
                </div>
                <div>
                    <b>Subject:</b>
                    <input type='text' placeholder='Enter the subject'  onChange={(e) => setSubject(e.target.value)} />
                </div>
                <div>
                    <b>Message: </b>
                    <textarea type='text' placeholder='Start typing...'  onChange={(e) => setMessage(e.target.value)} />
                </div>
                </BodyWrapper>
                <ButtonWrapper>
                    <button
                        onClick={() => setNewEmail(false)}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => sendEmail()}
                    >
                        Send
                    </button>
                    
                </ButtonWrapper>
                </>}
            {sent && 
                <SentWrapper>
                <b>Email Sent Successfully!</b>
                <IconButton onClick={() => setNewEmail(false)} >
                    <CloseIcon />
                </IconButton>
                </SentWrapper>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: fixed;
    right: 20px;
    bottom: 20px;
    padding: 10px 20px;
    border: 1px solid darkgrey;
    max-width: 600px;
`

const BodyWrapper = styled.div`
    min-width: 600px;
    div {
        display: grid;
        align-items: center;
        grid-template-columns: 150px auto;
        margin-bottom: 10px;
        input {
            height: 40px;
            font-size: 18px;

            :focus {
                outline: none;
            }
        }
        textarea {
            min-height: 200px;
            font-size: 18px;
            margin-bottom: 40px;
            :focus {
                outline: none;
            }
        }
    }
`

const ButtonWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: 50px;

    button {
        padding: 10px 15px;
    }
`

const SentWrapper = styled.div`
    display: grid;
    align-items: center;
    color: green;
    grid-template-columns: auto 40px;
`


export default NewEmail
