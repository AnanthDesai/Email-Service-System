import React from 'react'
import styled from 'styled-components'
import logo from '../../logo.png'

import SearchIcon from '@material-ui/icons/Search'
import AccountIcon from '@material-ui/icons/AccountCircle'
import ExitIcon from '@material-ui/icons/ExitToApp'
import { Tooltip } from '@material-ui/core'

import { IconButton } from '@material-ui/core'

const Navbar = () => {

	const handleLogout = () => {
		if (window.confirm("Are you sure you want to log out?")) {
			window.localStorage.removeItem("User");
			window.location.reload();
		}
	}

    return (
      <div>
				<Wrapper>
					<LogoWrapper>
						<img src={logo} alt='logo' />
					</LogoWrapper>
					<SearchBar>
						<SearchBarWrapper>
							<SearchIcon />
							<input type='text' placeholder="Search"/>
						</SearchBarWrapper>
					</SearchBar>
				<IconWrapper>
					<Tooltip
						arrow
						title={<p style={{ fontSize: 18, padding: '10px 20px' }}>User: <b>{window.localStorage.getItem("User")}</b></p>}
						placement='bottom-start'
					>
						<IconButton>
							<AccountIcon />
						</IconButton>
					</Tooltip>
					<Tooltip
						arrow
						title={<p style={{ fontSize: 18, padding: '10px 20px' }} >Log Out</p>}
					>
						<IconButton>
							<ExitIcon onClick={() => handleLogout()} />
						</IconButton>
					</Tooltip>
				</IconWrapper>
			</Wrapper>
		</div>
    )
}

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 270px auto 100px;
	align-items: center;
	border-bottom: 1px solid lightgrey; 
`

const LogoWrapper = styled.div`
	height: 70px;
	display: flex;
`

const SearchBar = styled.div``

const SearchBarWrapper = styled.div`
	background-color: #f1f3f4;
	width: 100%;
	max-width: 1050px;
	display: grid;
	grid-template-columns: 10% auto;
	place-items: center;
	height: 45px;
	border-radius: 6px;

	.MuiSvgIcon-root {
		color: #5f6368;
	}

	input {
		width: 100%;
		height: 30px;
		background: none;
		border: none;
		font-size: 18px;

		:focus {
			outline: none;
		}
	}
`

const IconWrapper = styled.div`
	display: grid;
	grid-template-columns: 50% 50%;
	
	.MuiSvgIcon-root {
		color: #5f6368;
	}
`

export default Navbar
