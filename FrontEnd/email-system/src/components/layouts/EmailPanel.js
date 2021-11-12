import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import EmailRow from './EmailRow'

import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import RefreshIcon from '@material-ui/icons/Refresh'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import NewEmail from './NewEmail'
import axios from 'axios'
import ShowEmail from './ShowEmail'
import { Delete } from '@material-ui/icons'

const EmailPanel = ({ newEmail, setNewEmail, selected }) => {

    const [emails, setEmails] = useState([]);
    const [showEmail, setShowEmail] = useState(false);
    const [object, setObject] = useState({
        starred: false,
        from: '',
        recieved: '',
        read: false,
        subject: '',
        message: ''
    })
    const [readIndex, setReadIndex] = useState(null);

    const [deleteIndexes, setDeleteIndexes] = useState([]);
    const [checkAll, setCheckAll] = useState(false);

    useEffect(() => {
        console.log(deleteIndexes)
        if (deleteIndexes.length === emails.length)
            setCheckAll(true);
    }, [deleteIndexes])

    useEffect(() => {
        if (emails.length !== 0 && selected === 0) {
            emails[readIndex].read = true;
            axios.post('http://localhost:5000/markRead', {
                user: window.localStorage.getItem("User"),
                index: readIndex,
            })
                .then(() => getRecievedEmails())
                .catch((err) => console.log(err));
        }
    }, [readIndex]);

    useEffect(() => {
        if (selected === 0) {
            getRecievedEmails();
        }
        else {
            getSentEmails();
        }
    }, [selected])

    const getRecievedEmails = () => {
        axios.get('http://localhost:5000/recieved', {
            params: {
                user: window.localStorage.getItem("User")
            },
        })
            .then((res) => {
                console.log(res.data.emails);
                setEmails(res.data.emails);
            })
            .catch((err) => console.log(err))
    }

    const getSentEmails = () => {
        axios.get('http://localhost:5000/sent', {
            params: {
                user: window.localStorage.getItem("User")
            },
        })
        .then((res) => {
            console.log(res.data.emails);
            setEmails(res.data.emails);
        })
        .catch((err) => console.log(err))
    }

    const deleteEmails = () => {
        axios.post('http://localhost:5000/delete', {
            indexes: deleteIndexes,
            user: window.localStorage.getItem("User"),
            inbox: selected === 0 ? true : false,
        })
            .then(() => selected === 0 ? getRecievedEmails() : getSentEmails())
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <Wrapper>
                <TaskbarWrapper>
                    <Checkbox checked={checkAll} onChange={(e) => {
                        setCheckAll(e.target.checked);
                        if(e.target.checked)
                            setDeleteIndexes(Array.from(Array(emails.length).keys()))
                        else
                            setDeleteIndexes([])
                    }} />
                    <IconButton onClick={() => selected === 0 ? getRecievedEmails() : getSentEmails()} >
                        <RefreshIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteEmails()}>
                        <Delete />
                    </IconButton>
                </TaskbarWrapper>
                <EmailsWrapper>
                    {
                        emails.map(({ starred, from, recieved, read, subject, message }, index) => (
                            <EmailRow
                                index={index}
                                setReadIndex={setReadIndex}
                                setShowEmail={setShowEmail}
                                setObject={setObject}
                                starred={starred}
                                from={from}
                                recieved={new Date(recieved).toString().slice(0, 21)}
                                read={read}
                                subject={subject}
                                message={message}
                                checkAll={checkAll}
                                setCheckAll={setCheckAll}
                                setDeleteIndexes={setDeleteIndexes}
                                deleteIndexes={deleteIndexes}
                            />
                        ))
                    }
                </EmailsWrapper>
                {
                    newEmail ? <NewEmail setNewEmail={setNewEmail} /> : null
                }
                {
                    showEmail ? <ShowEmail selected={selected} email={object} setShowEmail={setShowEmail} /> : null
                }
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div``

const TaskbarWrapper = styled.div`
    border-bottom: 1px solid lightgrey;
    padding-left: 15px;
`

const EmailsWrapper = styled.div`
`

export default EmailPanel
