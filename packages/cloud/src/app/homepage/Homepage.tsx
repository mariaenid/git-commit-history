import { Box, Toolbar } from "@mui/material"
import { NavBar } from "../../components/navbar/NavBar";
import { SideBar } from "../../components/sidebar/Sidebar";
import { useGetCommitsQuery } from "data-access";
import { useEffect } from "react";
import { useCommitStore } from "../../hooks/useCommitStore";
import Search from "../search/Search";

const Homepage = () => {
  const drawerWidth = 240;
  const { onSaveCommitsToStore } = useCommitStore();
  const { data, loading, error } = useGetCommitsQuery({
    variables: {
    },
  });

  useEffect(() => {
    if (data) {
      onSaveCommitsToStore(data);
    }
  }, [data, onSaveCommitsToStore]);


  return (<Box sx={{ display: 'flex' }}>
    <NavBar drawerWidth={drawerWidth} />
    <SideBar drawerWidth={drawerWidth} />
    <Box
      component='main'
      sx={{ flexGrow: 1, p: 3 }}
    >
      <Toolbar />
      {loading ? <div>cargando</div> : <Search data={data!} />}

    </Box>
  </Box>)
}

export default Homepage;