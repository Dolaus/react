import React, {useEffect} from 'react';
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/hooks";
import {removeAuthenticate, removeToken} from "../../store/slices/userSlice";
import {setUrl} from "../../store/slices/exhibitSlice";
import {urlToRout} from "../../utils/url";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NavBar = () => {

    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const logoutHandler = () => {
        console.log('handler');
        localStorage.removeItem('token');
        dispatch(removeToken())
        dispatch(removeAuthenticate())
    }

    const loginHandler = () => {
        navigate('login');
    }

    const logoHandler = () => {
        navigate('/')
        dispatch(setUrl({url: urlToRout.EXHIBIT_URL}))
    }

    const myExhibitHandler = () => {
        navigate('/')
        dispatch(setUrl({url: urlToRout.MY_EXHIBIT_URL}))
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        onClick={logoHandler}
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    {isAuthenticated ?
                        <Box sx={{flexGrow: 1}}>
                            <Button color="inherit"
                                    onClick={() => navigate('/new-post')}
                            >+</Button>
                            <Button
                                onClick={myExhibitHandler}
                                color="inherit">My exhibits</Button>
                        </Box> : <Box sx={{flexGrow: 1}}> </Box>
                    }

                    {!isAuthenticated ?
                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button onClick={loginHandler} color="inherit">Login</Button>
                        </Box> : <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button onClick={logoutHandler} color="inherit">Logout</Button>
                        </Box>}
                </Toolbar>
                <ToastContainer/>
            </Container>
        </AppBar>
    );
};

export default NavBar;