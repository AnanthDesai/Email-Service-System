import React, { useState } from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import EmailPanel from './EmailPanel'


const MainContent = () => {

    const [newEmail, setNewEmail] = useState(false);
    const [selected, setSelected] = useState(0);

    return (
        <div>
            <Wrapper>
                <Sidebar
                    setNewEmail={setNewEmail}
                    selected={selected}
                    setSelected={setSelected}
                />
                <EmailPanel
                    newEmail={newEmail}
                    setNewEmail={setNewEmail}
                    selected={selected}
                />
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 270px auto; 
`

export default MainContent
