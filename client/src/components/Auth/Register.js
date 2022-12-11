import React from "react";
import {
  Avatar,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Icon,
  Link,
  Grid,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/actions/auth";
const Register = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(data, history));
  };
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} align="center">
        <Avatar>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">Sign up</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                value={data.firstName}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                name="fullname"
                label="Full Name"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                value={data.fullname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                value={data.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                value={data.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                value={data.confirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
