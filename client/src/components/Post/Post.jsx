import React, { useState } from "react";
import "./Post.css";
import Comments from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { useSelector } from "react-redux";
import { likePost } from "../../api/PostRequest";
import Comment from "../../components/Comment/Comment";
import { BsJustify, BsThreeDotsVertical } from "react-icons/bs";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  const [show, setShow] = useState(false);

  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="PostReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comments} alt="" onClick={() => setShow((show) => !show)} />
        <img src={Share} alt="" />
        <div className="dot">
          <BsThreeDotsVertical />
        </div>
      </div>

      <span style={{ color: "var(--gray),font-size:12px" }}>{likes} likes</span>

      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
      {show && (
        <div>
          <Comment data={data} />
        </div>
      )}
    </div>
  );
};

export default Post;
