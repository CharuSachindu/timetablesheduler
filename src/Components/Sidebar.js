import React from 'react';
import '../App.css';
import { Outlet } from 'react-router-dom';
import { SidebarData } from './SidebarData';
// import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 280;

function Sidebar() {
    return (
        <div className='flex'>
            <div>
                
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar />
                    <Divider />
                    <List>

                        {SidebarData.map((val, key) => (
                            <ListItem key={key} disablePadding
                                onClick={() => {
                                    window.location.pathname = val.link;
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        {val.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={val.title} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </div>
            <div className=''>
                <div className=''>
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                >
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            Permanent drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                </div>
                <div className='mt-20'>
                <Outlet></Outlet>
                <button style={{ position: 'absolute', top: '10px', right: '10px' }}>Logout</button>
                </div>
                
            </div>
        </div>
    );
}

export default Sidebar;
