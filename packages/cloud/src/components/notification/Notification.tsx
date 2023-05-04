import { useContext, useEffect } from 'react';

import { Alert, AlertTitle, AlertColor } from "@mui/material"
import NotificationContext, { NotificationState } from '../notification-provider/NotificationProvider';
/*
interface AlertMessageProps {
  title?: string;
  message: string | React.ReactNode;
  type?: string
}
export const Notification = () => {


  return (<>
    {notificationCtx.notification !== NotificationState.None &&
      <Alert severity="error">
        {<AlertTitle></AlertTitle>}
        {notificationCtx.notificationText}
      </Alert>}
  </>)
}
export default Notification
*/
import * as React from 'react';
import { Transition } from 'react-transition-group';
import { styled } from '@mui/system';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/base/Snackbar';
import { SnackbarCloseReason } from '@mui/base/useSnackbar';

const blue = {
  50: '#F0F7FF',
  100: '#DAECFF',
  400: '#3399FF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  200: '#E0E3E7',
  800: '#2D3843',
};

const StyledSnackbar = styled(Snackbar)`
  position: fixed;
  z-index: 5500;
  display: flex;
  bottom: 16px;
  right: 16px;
  max-width: 560px;
  min-width: 300px;
  width: 200px;
`;

const SnackbarContent = styled('div')(
  ({ theme }) => `
  width: 300px;
  display: flex;
  overflow: hidden;
  background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[400]};
  box-shadow: ${theme.palette.mode === 'dark'
      ? `0 5px 13px -3px rgba(0,0,0,0.4)`
      : `0 5px 13px -3px ${grey[200]}`
    };
  padding: 0.875rem;
  color: ${theme.palette.mode === 'dark' ? '#fff' : blue[900]};
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;

  & .snackbar-message {
    flex: 1 1 0%;
  }

  & .snackbar-title {
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .snackbar-description {
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? blue[100] : grey[800]};
  }

  & .snackbar-close-icon {
    cursor: pointer;
    font-size: 10px;
    position: absolute;
    top: 0.725rem;
    right: 0.725rem;
    width: 1.25rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  `,
);

const positioningStyles = {
  entering: 'translateX(0)',
  entered: 'translateX(0)',
  exiting: 'translateX(500px)',
  exited: 'translateX(500px)',
  unmounted: 'translateX(500px)',
};

export default function Notification() {
  const notificationCtx = useContext(NotificationContext);

  const [open, setOpen] = React.useState(false);
  const [exited, setExited] = React.useState(true);
  const nodeRef = React.useRef(null);

  const handleClose = (_: any, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleOnEnter = () => {
    setExited(false);
  };

  const handleOnExited = () => {
    setExited(true);

  };

  useEffect(() => {
    if (notificationCtx?.notificationText)
      setOpen(true)
  }, [notificationCtx.notificationText]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <React.Fragment>
      {notificationCtx.notificationText && <StyledSnackbar
        autoHideDuration={5000}
        open={open}
        onClose={handleClose}
        exited={exited}
      >
        <Transition
          timeout={{ enter: 400, exit: 400 }}
          in={open}
          appear
          unmountOnExit
          onEnter={handleOnEnter}
          onExited={handleOnExited}
          nodeRef={nodeRef}
        >
          {(status) => (
            <SnackbarContent
              style={{
                transform: positioningStyles[status],
                transition: 'transform 300ms ease',
              }}
              ref={nodeRef}
            >
              <CheckRoundedIcon
                sx={{
                  flexShrink: 0,
                  marginRight: '0.75rem',
                  width: '1.25rem',
                  height: '1.5rem',
                }}
              />
              <div className="snackbar-message">
                <div className="snackbar-title">Error</div>
                <div className="snackbar-description">
                  {notificationCtx.notificationText}
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="snackbar-close-icon"><CloseIcon /></button>
            </SnackbarContent>
          )}
        </Transition>
      </StyledSnackbar>}
    </React.Fragment>
  );
}

