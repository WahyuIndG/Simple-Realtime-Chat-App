import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../appwriteConfig';
import { ID } from 'appwrite';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		getUserLogged();
	}, []);

	const handleRegister = async (e, { name, email, password }) => {
		e.preventDefault();

		try {
			const userProfile = await account.create(ID.unique(), email, password, name);
			await account.createEmailSession(email, password);

			setUser(userProfile);
			navigate('/');
		} catch (error) {
			console.error(error);
			alert(error.message);
		}
	};

	const handleLogin = async (e, { email, password }) => {
		e.preventDefault();

		try {
			await account.createEmailSession(email, password);
			const userProfile = await account.get();

			setUser(userProfile);
			navigate('/');
		} catch (error) {
			console.error(error);
			alert(error.message);
		}
	};

	const handleLogout = async () => {
		try {
			await account.deleteSession('current');
			navigate('/login');
		} catch (error) {
			console.error(error);
		}
	};

	const getUserLogged = async () => {
		try {
			const userProfile = await account.get();
			setUser(userProfile);
		} catch (error) {
			null;
		}
		setLoading(false);
	};

	const authContextValue = {
		user,
		handleRegister,
		handleLogin,
		handleLogout,
		getUserLogged,
	};

	return (
		<AuthContext.Provider value={authContextValue}>
			{loading ? <p>Loading....</p> : children}
		</AuthContext.Provider>
	);
};
