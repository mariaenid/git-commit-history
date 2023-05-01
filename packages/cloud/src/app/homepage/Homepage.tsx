import { Box, Toolbar } from "@mui/material"
import { NavBar } from "../../components/navbar/NavBar";
import { SideBar } from "../../components/sidebar/Sidebar";

const Homepage = () => {
  const drawerWidth = 240;

  return (<Box sx={{ display: 'flex' }}>
    <NavBar drawerWidth={drawerWidth} />
    <SideBar drawerWidth={drawerWidth} />
    <Box
      component='main'
      sx={{ flexGrow: 1, p: 3 }}
    >
      <Toolbar />
      <div>what</div>
    </Box>
  </Box>)
}

export default Homepage;