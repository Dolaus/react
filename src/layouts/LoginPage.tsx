import React, { useEffect } from 'react';
import Container from "@mui/material/Container";
import { CssBaseline, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { login } from "../store/slices/userSlice";
import { RootState } from "../store/store";
import { useAppDispatch } from "../hooks/hooks";
import { useNavigate } from 'react-router-dom';
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import {validationSchema} from "../validation/shemas"; // Імпортуємо Yup

interface ILogin {
    email: string,
    password: string
}

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const isToken = useSelector((state: RootState) => state.user.token);
    const navigate = useNavigate();

    function loginHandler(values: ILogin) {
        const user = { username: values.email, password: values.password };
        console.log(user);
        dispatch(login(user));
    }

    useEffect(() => {
        if (isToken) {
            navigate('/');
        }
    }, [isToken, navigate]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={loginHandler}
                >
                    {({ handleChange, values, touched, errors }) => (
                        <Form>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={values.email}
                                onChange={handleChange}
                                error={touched.email && Boolean(errors.email)}
                                helperText={<ErrorMessage name="email" />}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={values.password}
                                onChange={handleChange}
                                error={touched.password && Boolean(errors.password)}
                                helperText={<ErrorMessage name="password" />}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Sign In
                            </Button>
                            <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                                If you don't have an account,{' '}
                                <Button color="primary" onClick={() => navigate('/register')}>
                                    click here
                                </Button>
                            </Typography>
                        </Form>
                    )}
                </Formik>
            </div>
        </Container>
    );
}
