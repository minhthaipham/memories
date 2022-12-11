import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import {
  MoreHoriz,
  ThumbUpAlt,
  ThumbUpAltOutlined,
  Delete,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../redux/actions/posts";
import moment from "moment";
import { useNavigate } from "react-router-dom";
// import Likes from "./Likes";
const Post = ({ post, setCurrentId }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };
  const handleLike = () => {
    dispatch(likePost(post._id));
  };
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <div>
          <ThumbUpAlt fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </div>
      ) : (
        <div>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </div>
      );
    }

    return (
      <div>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </div>
    );
  };
  const open = () => {
    history(`/home/${post._id}`);
  };
  return (
    <Card
      sx={{ position: "relative", width: "100%", cursor: "pointer" }}
      onClick={open}
    >
      {/* <ButtonBase onClick={open}> */}
      <CardMedia
        component="img"
        height="194"
        image={post.selectedFile}
        alt={post.title}
      />
      <Button
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          color: "white",
        }}
        onClick={() => setCurrentId(post._id)}
      >
        <MoreHoriz fontSize="default" />
      </Button>
      <div
        className="overlay"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          color: "white",
          padding: "10px",
        }}
      >
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div
        className="details"
        style={{
          padding: "10px",
        }}
      >
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            {post.title}
          </Typography>
        </CardContent>
      </div>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        className="cardActions"
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          color="primary"
          onClick={handleLike}
          disabled={!user?.result}
        >
          <Likes />
        </Button>
        <Button size="small" color="primary" onClick={handleDelete}>
          <Delete />
          Delete
        </Button>
      </CardActions>
      {/* </ButtonBase> */}
    </Card>
  );
};

export default Post;
