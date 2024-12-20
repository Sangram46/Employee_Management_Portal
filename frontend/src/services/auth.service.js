import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const signup = (userData) => {
    return axios.post(API_URL + 'signup', userData);
};

const signin = (userData) => {
    return axios.post(API_URL + 'signin', userData).then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
    signup,
    signin,
    logout,
    getCurrentUser
};

export default AuthService;



