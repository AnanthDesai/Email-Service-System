import React from 'react'
import styled from 'styled-components'

import ComposeButton from '../buttons/ComposeButton'

import InboxIcon from '@material-ui/icons/Inbox'
import SendIcon from '@material-ui/icons/Send'

const sidebarItems = [
    {
        icon: <InboxIcon />,
        name: 'Inbox'
    },
    {
        icon: <SendIcon />,
        name: 'Sent'
    }
]

const Sidebar = ({ selected, setSelected, setNewEmail }) => {
    return (
        <div>
            <Wrapper>
                <ComposeWrapper onClick={() => setNewEmail(true)}>
                    <ComposeButton />
                </ComposeWrapper>
                <ButtonsWrapper>
                    {
                        sidebarItems.map((item, index) => (
                            <SidebarButton
                                className={selected === index ? 'selected' : ''}
                                onClick={() => setSelected(index)}
                            >
                                { item.icon } { item.name }
                            </SidebarButton>
                        ))
                    }
                </ButtonsWrapper>
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    border-right: 1px solid lightgrey;
    height: calc(100vh - 77px);
`

const ComposeWrapper = styled.div`
    display: grid;
    place-items: start stretch;
    padding: 20px 20px;
`

const ButtonsWrapper = styled.div`
    margin-top: 20px;

    .selected {
        background: #f5f7f7;
    }
`

const SidebarButton = styled.div`
    display: grid;
    grid-template-columns: 14% auto;
    color: #3c4043;
    padding: 5px 25px;
    border-radius: 0 100px 100px 0;
    margin-right: 8px;
    align-items: center;

    :hover {
        background: #f5f7f7;
        cursor: pointer;
    }

    
`

export default Sidebar
