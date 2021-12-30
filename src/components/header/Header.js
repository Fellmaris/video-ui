import * as React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {
    Avatar,
    Badge,
    Divider,
    IconButton,
    ListItemIcon,
    MenuItem,
    Tooltip, Toolbar,
    Typography,
    Link,
    Button,
    AppBar,
    Menu
} from "@mui/material";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import {useDispatch, useSelector} from "react-redux";
import {PersonAdd, Settings, Logout} from "@mui/icons-material";
import {removeUser} from "../store/slice/userSlice";

export default () => {
    const playlist = useSelector(state => state.playlist);
    const totalVideos = playlist.length;
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        dispatch(removeUser());
        navigate("/");
    }

    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{borderBottom: (theme) => `1px solid ${theme.palette.divider}`}}
        >
            <Toolbar sx={{flexWrap: 'wrap'}}>
                <Typography
                    color="inherit"
                    noWrap
                    sx={{flexGrow: 1}}>
                    <Link
                        variant="button"
                        color="text.primary"
                        to={"/"}
                        sx={{my: 1, mx: 1.5, fontSize: 20}}
                        component={NavLink}
                        underline="none"
                    >
                        Video Library
                    </Link>
                </Typography>

                <nav>
                    {user &&
                    <>
                        {
                            user.roles.includes('ADMIN') &&
                            <Link
                                variant="button"
                                color="text.primary"
                                to="/video/create"
                                sx={{my: 1, mx: 1.5}}
                                component={NavLink}>
                                Create new video
                            </Link>
                        }
                        <Link
                            variant="button"
                            color="text.primary"
                            to="/users/registration"
                            sx={{my: 1, mx: 1.5}}
                            component={NavLink}>
                            Create new user
                        </Link>
                    </>
                    }
                    <Link
                        variant="button"
                        color="text.primary"
                        to="/playlist"
                        sx={{my: 1, mx: 1.5}}
                        component={NavLink}
                    >
                        <Badge badgeContent={totalVideos} color="primary">
                            <QueueMusicIcon/>
                        </Badge>
                    </Link>
                </nav>
                {
                    user ?
                        <>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ml: 2}}>
                                    <Avatar sx={{width: 32, height: 32}}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            >
                                <MenuItem>
                                    <Avatar/> {user.fullName}
                                </MenuItem>
                                <Divider/>
                                <MenuItem>
                                    <ListItemIcon>
                                        <PersonAdd fontSize="small"/>
                                    </ListItemIcon>
                                    Add another account
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <Settings fontSize="small"/>
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={onLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small"/>
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                        :
                        <Button variant="outlined"
                                sx={{my: 1, mx: 1.5}}
                                to="/login"
                                component={NavLink}>
                            Login
                        </Button>
                }
            </Toolbar>
        </AppBar>
    )
}