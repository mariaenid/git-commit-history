import { TurnedInNot } from "@mui/icons-material"
import { Box, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';

export const SideBar = ({ drawerWidth = 240 }: { drawerWidth: number }) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Toolbar>
          <MenuIcon />
        </Toolbar>
        <Divider />
        <List>
          {
            ['Enero', 'Febrero', 'Marzo', 'Abril'].map(text => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <Grid container>
                    <ListItemText primary={text} />
                    <ListItemText secondary={'Ea elit reprehenderit culpa voluptate ut consectetur.'} />
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Drawer >
    </Box>
  )
}
