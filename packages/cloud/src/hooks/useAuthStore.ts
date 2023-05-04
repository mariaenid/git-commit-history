import { useSelector, useDispatch } from 'react-redux';
import { cleanErrorMessage, onCheck, onLogin, onLogout } from '../store/auth/authSlice';
import { useContext } from 'react';
import AlertContext from '../components/notification-provider/NotificationProvider';
import { useGetCurrentUserQuery } from 'data-access';
//import { AlertSweetalert } from '../commons/AlertSweetalert';
export const useAuthStore = () => {
  const alert = useContext(AlertContext);
  const { data, loading: isLoadingCurrentUser, error } = useGetCurrentUserQuery({
    variables: {
    },
  });
  const { status, user, errorMessage } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const signIn = async (payload: any) => {

    dispatch(onCheck());

    if (payload instanceof Error) {
      console.log('ERROR', payload)
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

    if (!data) return;

    try {
      // const { data } = await genesisApi.get('/renew');
      localStorage.setItem('token', token);
      const { getCurrentUser: { user } } = data

      if (!user) return;

      dispatch(onLogin({ fullname: user['name'], uid: user.id }))
    } catch (error) {
      localStorage.clear()
      dispatch(onLogout(data));
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
