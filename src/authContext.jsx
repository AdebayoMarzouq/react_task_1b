import React, { useReducer } from 'react';
import MkdSDK from './utils/MkdSDK';

export const AuthContext = React.createContext();

const initialState = {
	isAuthenticated: false,
	user: null,
	token: null,
	role: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			//TODO
			const { first_name, last_name, photo, role, user_id, token } =
				action.payload;
			localStorage.setItem('token', token);
			localStorage.setItem('role', role);
			return {
				...state,
				isAuthenticated: true,
				user: { first_name, last_name, photo, user_id },
				role,
				token,
			};
		case 'LOGOUT':
			localStorage.clear();
			return {
				...state,
				isAuthenticated: false,
				user: null,
				role: null,
				token: null,
			};
		default:
			return state;
	}
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
	const role = localStorage.getItem('role');
	if (errorMessage === 'TOKEN_EXPIRED') {
		dispatch({
			type: 'Logout',
		});
		window.location.href = '/' + role + '/login';
	}
};

const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	React.useEffect(() => {
		//TODO
		const checkToken = async () => {
			try {
				await sdk.check('admin');
			} catch (error) {
				tokenExpireError(dispatch, error.message);
			}
		};

		checkToken();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
