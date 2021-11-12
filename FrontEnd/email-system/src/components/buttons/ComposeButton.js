import React from 'react'
import styled from 'styled-components'

import AddIcon from '@material-ui/icons/Add'

const ComposeButton = () => {
    return (
        <div>
            <Wrapper>
                <AddIcon fontSize="large" />
                New Email
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 35% auto;
    width: auto;
    color: #3c4043;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302), 0 1px 3px 1px rgba(60, 64, 67, 0.149);
    align-items: center;
    padding: 6px 32px 6px 8px;
    border-radius: 50px; 
    cursor: pointer;
    font-size: 0.975rem;
    font-weight: 500;
    transition: box-shadow .08s linear,min-width .15s cubic-bezier(0.4,0.0,0.2,1);
    :hover {
        box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%);
        background-color: #fafafb;
    }
`

export default ComposeButton
