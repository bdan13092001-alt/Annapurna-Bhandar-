import Cookies from 'js-cookie';
import apiClient from './api';

const AUTH_TOKEN_KEY = 'authToken';
const USER_ROLE_KEY = 'userRole';
const USER_KEY = 'user';

export const setAuth = (token, role, user) => {
  Cookies.set(AUTH_TOKEN_KEY, token, { expires: 7 });
  Cookies.set(USER_ROLE_KEY, role, { expires: 7 });
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getAuth = () => {
  return {
    token: Cookies.get(AUTH_TOKEN_KEY),
    role: Cookies.get(USER_ROLE_KEY),
    user: JSON.parse(localStorage.getItem(USER_KEY) || 'null'),
  };
};

export const clearAuth = () => {
  Cookies.remove(AUTH_TOKEN_KEY);
  Cookies.remove(USER_ROLE_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = () => {
  return !!Cookies.get(AUTH_TOKEN_KEY);
};

export const hasRole = (role) => {
  const userRole = Cookies.get(USER_ROLE_KEY);
  return userRole === role || userRole === 'admin';
};

export const sendOTP = async (mobileNumber) => {
  return apiClient.post('/auth/send-otp', { mobileNumber });
};

export const verifyOTP = async (mobileNumber, otp) => {
  return apiClient.post('/auth/verify-otp', { mobileNumber, otp });
};

export const register = async (data) => {
  return apiClient.post('/auth/register', data);
};

export const resetPassword = async (mobileNumber, newPassword) => {
  return apiClient.post('/auth/reset-password', { mobileNumber, newPassword });
};

export const logout = async () => {
  try {
    await apiClient.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    clearAuth();
  }
};
