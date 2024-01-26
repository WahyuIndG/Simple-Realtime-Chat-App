import React from 'react';
import useInput from '../hooks/input';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/auth';

const LoginPage = () => {
	const [email, setEmail] = useInput();
	const [password, setPassword] = useInput();
	const { handleLogin } = useAuth();

	return (
		<div className="auth--container">
			<div className="form--wrapper">
				<form
					onSubmit={(e) => {
						handleLogin(e, { email, password });
					}}
				>
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
							placeholder="Enter password..."
							value={password}
							onChange={setPassword}
						/>
					</div>

					<div className="field--wrapper">
						<input type="submit" value="Login" className="btn btn--lg btn--main" />
					</div>
				</form>

				<p>
					Dont have an account? Register <Link to="/register">here</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
