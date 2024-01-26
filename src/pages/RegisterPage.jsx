import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useInput from '../hooks/input';
import { AuthContext } from '../utils/AuthContext';
import useAuth from '../hooks/auth';

const RegisterPage = () => {
	const [name, setName] = useInput();
	const [email, setEmail] = useInput();
	const [password, setPassword] = useInput();
	const { handleRegister } = useAuth();

	return (
		<div className="auth--container">
			<div className="form--wrapper">
				<form
					onSubmit={(e) => {
						handleRegister(e, { name, email, password });
					}}
				>
					<div className="field--wrapper">
						<label>Name:</label>
						<input
							required
							type="text"
							name="name"
							value={name}
							placeholder="Enter your name..."
							onChange={setName}
						/>
					</div>

					<div className="field--wrapper">
						<label>Email:</label>
						<input
							required
							type="email"
							name="email"
							placeholder="Enter your email..."
							value={email}
							onChange={setEmail}
						/>
					</div>

					<div className="field--wrapper">
						<label>Password:</label>
						<input
							required
							type="password"
							name="password"
							placeholder="Enter a password..."
							value={password}
							onChange={setPassword}
						/>
					</div>

					<div className="field--wrapper">
						<input className="btn btn--lg btn--main" type="submit" value="Register" />
					</div>
				</form>

				<p>
					Already have an account? Login <Link to="/login">here</Link>
				</p>
			</div>
		</div>
	);
};

export default RegisterPage;
