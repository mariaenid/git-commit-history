import styled from 'styled-components';
import { AppRouter } from '../router/AppRouter';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { environment } from '../environments/environment';
import { NotificationProvider } from '../components/notification-provider/NotificationProvider';
import { useAuthStore } from '../hooks/useAuthStore';
import { useEffect } from 'react';
import { AuthStatus } from '../store/auth/authSlice';

const StyledApp = styled.div`
  html {
    -webkit-text-size-adjust: 100%;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
    line-height: 1.5;
    tab-size: 4;
    scroll-behavior: smooth;
  }
  body {
    font-family: inherit;
    line-height: inherit;
    margin: 0;
  }
`;

export function App() {
  const { status } = useAuthStore();
  let client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: environment.apiUrl,
    headers: {
      authorization: `Bearer ${localStorage.getItem('token') || ''}`
    },
  });

  useEffect(() => {
    if (status === AuthStatus.Authenticated) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: environment.apiUrl,
        headers: {
          authorization: `Bearer ${localStorage.getItem('token') || ''}`
        },
      });
    }
  }, [status])

  return (
    <ApolloProvider client={client}>
      <NotificationProvider>
        <StyledApp>
          <AppRouter />
        </StyledApp>
      </NotificationProvider>
    </ApolloProvider>
  );
}

export default App;
