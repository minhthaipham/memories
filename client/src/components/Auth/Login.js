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
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/auth";
const Login = () => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(data, navigate));
  };

  React.useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const successGoogle = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", payload: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const failureGoogle = (err) => {
    console.log(err);
    console.log("Google Sign In was unsuccessful. Try again later.");
  };
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} align="center">
        <Avatar>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">Sign In</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            value={data.password}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
          <GoogleLogin
            clientId="169910068822-vf7ikarblshb3b2t14r2l029f47o233c.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={successGoogle}
            onFailure={failureGoogle}
            cookiePolicy="single_host_origin"
          />
          <Typography>
            <Link
              href="/register"
              underline="hover"
              sx={{ textDecoration: "none" }}
            >
              Don't have an account? Sign Up
            </Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
