import React from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import ChipInput from "material-ui-chip-input";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../redux/actions/posts";
import FileBase64 from "react-file-base64";
import style from "./style.css";
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = React.useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const user = JSON.parse(localStorage.getItem("profile"));
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  React.useEffect(() => {
    if (post) setPostData(post);
  }, [post]);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    }
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  return (
    <Paper
      sx={{
        marginTop: "20px",
        padding: "20px",
      }}
    >
      {user?.result ? (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography variant="h6" align="center">
            {currentId ? `Editing "${post.title}"` : "Creating a Memory"}
          </Typography>

          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={handleChange}
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={handleChange}
          />
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) =>
              setPostData({ ...postData, tags: [...postData.tags, chip] })
            }
            onDelete={(chipToDelete) =>
              setPostData({
                ...postData,
                tags: postData.tags.filter((chip) => chip !== chipToDelete),
              })
            }
          />
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
            >
              Submit
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={clear}
              fullWidth
            >
              Clear
            </Button>
          </div>
        </form>
      ) : (
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      )}
    </Paper>
  );
};

export default Form;
