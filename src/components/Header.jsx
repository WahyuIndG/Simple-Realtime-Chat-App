import React from 'react';
import useAuth from '../hooks/auth';
import { LogOut, LogIn } from 'react-feather';
import { Link } from 'react-router-dom';

const Header = () => {
	const { user, handleLogout } = useAuth();

	return (
		<div id="header--wrapper">
			{user ? (
				<>
					Welcome {user.name}
					<LogOut className="header--link" onClick={handleLogout} />
				</>
			) : (
				<>
					<Link to="/">
						<LogIn className="header--link" />
					</Link>
				</>
			)}
		</div>
	);
};

export default Header;
