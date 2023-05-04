import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';
import LoginPage from '../../../feature-sets/src/lib/login/login';
import { AuthStatus } from '../store/auth/authSlice';
import { NotificationProvider } from '../components/notification-provider/NotificationProvider';
import Notification from '../components/notification/Notification';
import Homepage from '../app/homepage/Homepage';
import Register from 'packages/feature-sets/src/lib/register/register';
import { useGetCurrentUserQuery } from 'data-access';

export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();
    const { data, loading: isLoading } = useGetCurrentUserQuery({
        variables: {
        },
    });

    useEffect(() => {
        if (status === AuthStatus.NotAuthenticated) {
            checkAuthToken(data);
        }
    }, [isLoading]);

    if (status === AuthStatus.Loading) {
        return <h3>Loading ...</h3>;
    }

    return (
        <NotificationProvider>
            <Notification />
            <Routes>
                {status === AuthStatus.NotAuthenticated ? (
                    <>
                        <Route path="/auth/login" element={<LoginPage />} />
                        <Route path='/auth/register' element={<Register />} />
                        <Route path="/*" element={<Navigate to="auth/login" />}></Route>
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Homepage />}></Route>
                        <Route path="/commits" element={<Homepage />}></Route>
                        <Route path="/*" element={<Homepage />}></Route>
                    </>
                )}
            </Routes>
        </NotificationProvider>
    );
};
