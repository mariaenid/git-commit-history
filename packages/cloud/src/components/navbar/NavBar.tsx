import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { useAuthStore } from '../../hooks/useAuthStore';

export const NavBar = ({ drawerWidth = 240 }: { drawerWidth: number }) => {
  const { signOut } = useAuthStore();

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` }
      }}>
      <Toolbar>
        <IconButton
          color='inherit'
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}>
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant='h6' noWrap component="div">Git history</Typography>
          <IconButton color="error" onClick={signOut}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
