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

export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();

    const all = useSelector((state: any) => state.auth);

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: 'http://localhost:3000/graphql',
        headers: { authorization: localStorage.getItem('token') || '' },
    });

    useEffect(() => {
        checkAuthToken();
    }, []);

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
