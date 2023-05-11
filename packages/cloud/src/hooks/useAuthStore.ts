import { useSelector, useDispatch } from 'react-redux';
import { cleanErrorMessage, onCheck, onLogin, onLogout } from '../store/auth/authSlice';
import { useContext } from 'react';
import AlertContext from '../components/notification-provider/NotificationProvider';

export const useAuthStore = () => {
  const alert = useContext(AlertContext);

  const { status, user, errorMessage } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const signIn = async (payload: any) => {

    dispatch(onCheck());


    if (payload instanceof Error) {
      dispatch(onLogout(payload));
    }

    try {
      const { data: { login: { access_token: accessToken, user } } } = payload;
      localStorage.setItem('token', accessToken)
      dispatch(onLogin({ fullname: user?.name, uid: user.id }))
    } catch (error: unknown) {

      if (alert) alert.error('UnAuthorized login');

      dispatch(onLogout(error));
      setTimeout(() => {
        dispatch(cleanErrorMessage())
      }, 10)
    }
  }

  const signOut = () => {
    localStorage.clear();
    dispatch(onLogout(undefined))
  }

  const signUp = async (data: any) => {
    dispatch(onCheck())
    try {
      const { data: { register: { access_token, user } } } = data;
      dispatch(onLogin({ fullname: user.name, uid: user.id }));
      localStorage.setItem('token', access_token)

    } catch (error) {
      setTimeout(() => {
        dispatch(cleanErrorMessage())
      }, 10)
    }
  }

  const checkAuthToken = async (payload: any) => {
    const token = localStorage.getItem('token');

    if (!token) return dispatch(onLogout(""));

    if (!payload) return;

    try {
      // const { data } = await genesisApi.get('/renew');
      localStorage.setItem('token', token);
      const { getCurrentUser: { user } } = payload

      if (!user) return;

      dispatch(onLogin({ fullname: user['name'], uid: user.id }))
    } catch (error) {
      localStorage.clear()
      dispatch(onLogout(payload));
    }
  }

  return {
    status,
    user,
    errorMessage,
    signIn,
    signUp,
    checkAuthToken,
    signOut
  }
}
