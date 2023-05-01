import styled from 'styled-components';
import { AppRouter } from '../router/AppRouter';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {

  return (
    <StyledApp>
      <AppRouter />
    </StyledApp>
  );
}

export default App;
