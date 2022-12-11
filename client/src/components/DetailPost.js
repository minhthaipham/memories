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
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { getPot } from "../redux/actions/posts";

const DetailPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts);
  console.log(post);
  React.useEffect(() => {
    dispatch(getPot(id));
  }, [id, dispatch]);
  return (
    <Card sx={{ position: "relative", width: "100%", cursor: "pointer" }}>
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
    </Card>
  );
};

export default DetailPost;
