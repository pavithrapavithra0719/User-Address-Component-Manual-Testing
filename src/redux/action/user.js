import axios from 'axios';

export const login = data => ({
  type: 'LOGIN_USER',
  payload: axios.post(
    'https://chakuri.site/api/v1/users/login',
    data
  )
});

export const logout = () => ({
  type: 'LOGOUT_USER',
  payload: null
});

export const register = data => ({
  type: 'REGISTER_USER',
  payload: axios.post(
    'https://chakuri.site/api/v1/users/register',
    data
  )
});
