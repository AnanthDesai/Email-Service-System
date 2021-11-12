import { IconButton } from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import React from 'react'
import styled from 'styled-components'

const ShowEmail = ({ email, setShowEmail, selected }) => {
    return (
        <>
        
        <Wrapper>
            <HeaderWrapper>
                <div>
                    <p>Sent at -</p>
                    <b>{ email.recieved }</b>
                </div>
                <IconButton size='small' onClick={() => setShowEmail(false)} >
                    <Close fontSize='small' />
                </IconButton>
            </HeaderWrapper>
            <BodyWrapper>
                <div>
                    {selected === 0 ? <p>From:</p> : <p>To: </p>}
                    <b>{email.from}</b>
                </div>
                <div>
                    <p>Subject:</p>
                    <b>{ email.subject }</b>
                </div>
                <div>
                    <p>Message: </p>
                    <b>{ email.message }</b>
                </div>
            </BodyWrapper>
            </Wrapper>
        </>
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

const HeaderWrapper = styled.div`
    display: grid;
    grid-template-columns: 90% auto;
    color: grey;
    margin-bottom: 10px;
    border-bottom: 1px solid darkgrey;

    div {
        display: grid;
        grid-template-columns: 80px auto;
        align-items: center;
    }

`

export default ShowEmail
