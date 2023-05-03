import { useSelector, useDispatch } from 'react-redux';
import { cleanErrorMessage, onCheck, onLogin, onLogout } from '../store/auth/authSlice';
import { useContext } from 'react';
import AlertContext from '../components/notification-provider/NotificationProvider';
//import { AlertSweetalert } from '../commons/AlertSweetalert';
export const useAuthStore = () => {
  const alert = useContext(AlertContext);
  const { status, user, errorMessage } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const signIn = async (payload: any) => {

    dispatch(onCheck());

    if (payload instanceof Error) {
      dispatch(onLogout(payload.message));
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

  const startRegister = async (data: any) => {
    dispatch(onCheck())
    try {
      const resp = null;
      //dispatch(onLogin(resp.data))
      //AlertSweetalert("Bien", "Tu registro fue exitoso.", "success", "OK");
    } catch (error) {
      //AlertSweetalert("Error", error.response.data.message, "error", "ERROR");
      //dispatch(onLogout(error.response.data.message));
      setTimeout(() => {
        dispatch(cleanErrorMessage())
      }, 10)
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout(""));

    try {
      // const { data } = await genesisApi.get('/renew');
      //localStorage.setItem('token', data.token)
      //dispatch(onLogin({ fullname: data['fullName'], uid: data.id }))
    } catch (error) {
      localStorage.clear()
      //dispatch(onLogout(error.response.data.message));
    }
  }

  return {
    status,
    user,
    errorMessage,
    signIn,
    startRegister,
    checkAuthToken,
    signOut
  }
}
