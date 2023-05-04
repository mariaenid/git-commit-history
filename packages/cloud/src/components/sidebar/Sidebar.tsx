import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import * as React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

type Anchor = 'top' | 'left' | 'bottom' | 'right';
interface SideBarProps {
  state: any;
  drawerWidth: number;
  toggleDrawer: (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  currentState: string
  setCurrentState: (arg: string) => void;
}

const SideBar = ({ toggleDrawer, state, setCurrentState }: SideBarProps) => {


  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Commits'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => setCurrentState(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor={'left'}
      open={state['left']}
      onClose={toggleDrawer('left', false)}
    >
      {list('left')}
    </Drawer>
  );
}

export default SideBar;