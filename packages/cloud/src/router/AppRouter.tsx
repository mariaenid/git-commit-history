import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';
import LoginPage from '../../../feature-sets/src/lib/login/login';
import { AuthStatus } from '../store/auth/authSlice';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useSelector } from 'react-redux';
import { NotificationProvider } from '../components/notification-provider/NotificationProvider';
import Notification from '../components/notification/Notification';
import Homepage from '../app/homepage/Homepage';
import { environment } from '../environments/environment';

export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();

    const all = useSelector((state: any) => state.auth);

    console.log('TOKEN', localStorage.getItem('token'))

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: environment.apiUrl,
        headers: {
            authorization: `Bearer ${localStorage.getItem('token') || ''}`
        },
    });

    useEffect(() => {

        checkAuthToken();
    }, [checkAuthToken]);

    if (status === AuthStatus.Loading) {
        return <h3>Cargando...</h3>;
    }

    return (
        <NotificationProvider>
            <Notification />
            <ApolloProvider client={client}>
                <Routes>
                    {status === AuthStatus.NotAuthenticated ? (
                        <>
                            <Route path="/auth/*" element={<LoginPage />} />
                            <Route path="/*" element={<Navigate to="auth/login" />}></Route>
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<Homepage />}></Route>
                            <Route path="/*" element={<Navigate to="/" />}></Route>
                        </>
                    )}
                </Routes>
            </ApolloProvider>
        </NotificationProvider>
    );
};
