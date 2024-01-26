import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RoomPage from './pages/RoomPage';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './utils/AuthContext';

function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route element={<PrivateRoute />}>
						<Route path="/" element={<RoomPage />} />
					</Route>
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
