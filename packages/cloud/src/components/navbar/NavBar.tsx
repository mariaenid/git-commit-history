import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { useAuthStore } from '../../hooks/useAuthStore';
import MenuIcon from '@mui/icons-material/Menu';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

export const NavBar = ({ drawerWidth = 240, toggleDrawer }: {
  drawerWidth: number, toggleDrawer: (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}) => {
  const { signOut } = useAuthStore();

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100%)` },
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
          <IconButton onClick={toggleDrawer('left', true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component="div">Git history</Typography>
          <IconButton color="error" onClick={signOut}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
