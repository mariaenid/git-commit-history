import { Box, Toolbar } from "@mui/material"
import { NavBar } from "../../components/navbar/NavBar";
import SideBar from "../../components/sidebar/Sidebar";
import { useGetCommitsQuery } from "data-access";
import { useEffect, useState } from "react";
import { useCommitStore } from "../../hooks/useCommitStore";
import Search from "../search/Search";
import { useAuthStore } from "../../hooks/useAuthStore";
import { AuthStatus } from "../../store/auth/authSlice";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Homepage = () => {
  const drawerWidth = 240;
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { onSaveCommitsToStore } = useCommitStore();
  const { status } = useAuthStore();
  const { data, loading } = useGetCommitsQuery({
    variables: {},
  });

  useEffect(() => {
    if (data && status === AuthStatus.Authenticated) {
      onSaveCommitsToStore(data);
    }
  }, [data, onSaveCommitsToStore, status]);

  const { commits } = useCommitStore();

  const [currentState, setCurrentState] = useState<string>('commit');

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };


  return (<Box sx={{ display: 'flex' }}>
    <NavBar drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} />
    <SideBar drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} state={state} currentState={currentState} setCurrentState={setCurrentState} />
    <Box
      component='main'
      sx={{ flexGrow: 1, p: 3 }}
    >
      <Toolbar />
      {loading ? <div>loading...</div> : <Search data={commits} />}
    </Box>
  </Box>)
}

export default Homepage;