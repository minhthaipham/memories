import {
  Container,
  AppBar,
  Grid,
  Typography,
  Grow,
  Button,
  Avatar,
  TextField,
  Paper,
  Link,
} from "@mui/material";
import Posts from "./Posts/Posts";
import Form from "./Form/Form";
import { useDispatch } from "react-redux";
import React from "react";
import { getPost, getPostBySearch } from "../redux/actions/posts";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import ChipInput from "material-ui-chip-input";

function location() {
  throw new Error("Function not implemented.");
}

const Home = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [search, setSearch] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [currentId, setCurrentId] = React.useState(null);
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  React.useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  React.useEffect(() => {
    dispatch(getPost());
  }, [currentId, dispatch]);

  const handleClick = () => {
    history("/login");
  };
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    history("/");
    setUser(null);
  };
  const searchBtn = () => {
    if (search.trim() || tags) {
      dispatch(getPostBySearch({ search, tags: tags.join(",") }));
      history("/home/search?searchQuery=" + search + "&tags=" + tags.join(","));
    } else {
      history("/home");
    }
  };
  return (
    <Container maxWidth="lg">
      <AppBar
        position="static"
        color="inherit"
        sx={{
          color: "rgba(0,183,255, 1)",
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{
            padding: "10px",
          }}
        >
          <Grid item xs={12} sm={7}>
            <Link
              href="/home"
              underline="none"
              sx={{
                color: "rgba(0,183,255, 1)",
              }}
            >
              <Typography variant="h5">Memories</Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={5}>
            {user ? (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      marginLeft: "20px",
                    }}
                    alt={user?.result?.name}
                    src={user?.result?.imageUrl}
                  />
                  <Typography
                    variant="body"
                    align="left"
                    style={{
                      marginRight: "20px",
                      marginLeft: "20px",
                    }}
                  >
                    Welcome {user?.result?.name}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                // onClick={() => history.push("/auth")}
                onClick={handleClick}
              >
                Sign In
              </Button>
            )}
          </Grid>
        </Grid>
      </AppBar>

      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={2}
                sx={{
                  padding: "20px",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Search Memories"
                  variant="outlined"
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <ChipInput
                  style={{
                    margin: "10px 0",
                  }}
                  label="Search Tags"
                  variant="outlined"
                  fullWidth
                  value={tags}
                  onAdd={(tag) => setTags([...tags, tag])}
                  onDelete={(tagToDelete) =>
                    setTags(tags.filter((tag) => tag !== tagToDelete))
                  }
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={searchBtn}
                >
                  Search
                </Button>
              </Paper>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default Home;
