import React, { useState } from 'react'
import styled from 'styled-components'

import Checkbox from '@material-ui/core/Checkbox'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import { IconButton } from '@material-ui/core'

const EmailRow = ({
    starred,
    from,
    recieved,
    read,
    subject,
    message,
    setShowEmail,
    setObject,
    index,
    setReadIndex,
    checkAll,
    setCheckAll,
    deleteIndexes,
    setDeleteIndexes
}) => {

    const [checked, setChecked] = useState(false);

    return (
        <div>
            <Wrapper  >
                <Checkbox checked={deleteIndexes.includes(index)} onChange={(e) => {
                    if (checkAll) {
                        setCheckAll(false);
                    }
                    setChecked(!checked);
                    if (!deleteIndexes.includes(index) && e.target.checked === true)
                        setDeleteIndexes([...deleteIndexes, index])
                    if (deleteIndexes.includes(index) && e.target.checked === false)
                        setDeleteIndexes(deleteIndexes.filter((item) => item !== index))
                }} />
                <IconButton >
                    { starred ? <StarIcon htmlColor="#f7cb69" /> : <StarBorderIcon /> }
                </IconButton>
                <p onClick={() => {
                        setShowEmail(true);
                        setObject({
                            starred,
                            from,
                            read,
                            recieved,
                            message,
                            subject
                        })
                    if(!read)
                        setReadIndex(index);
                    }}
                    className={read ? "" : "unread"}
                >
                    {from}
                </p>
                <div onClick={() => {
                        setShowEmail(true);
                        setObject({
                            starred,
                            from,
                            read,
                            recieved,
                            message,
                            subject
                        })
                    if(!read)
                        setReadIndex(index);
                    }}
                    className={read ? "" : "unread"}>
                    <b>{subject} - </b> <p>{ message }</p>
                </div>
                <p onClick={() => {
                        setShowEmail(true);
                        setObject({
                            starred,
                            from,
                            read,
                            recieved,
                            message,
                            subject
                        })
                    if(!read)
                        setReadIndex(index);
                    }}
                    className={read ? "" : "unread"}>
                    {recieved}
                </p>
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    padding-left: 15px;
    border-bottom: 1px solid lightgrey;
    display: grid;  
    grid-template-columns: min-content min-content 250px auto 200px;
    align-items: center;
    cursor: pointer;
    gap: 10px;

    div {
        display: flex;
        color: grey;

        p {
            color: darkgrey;
            padding-left: 10px;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 600px;
            overflow: hidden;
        }
    }

    .unread {
        color: black;
        font-weight: bolder;
    }

    :hover {
        border: 1px solid black;
    }
`

export default EmailRow
