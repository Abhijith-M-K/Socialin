import React, { useState } from "react";
import { useEffect } from "react";
import { createComment, getComments } from "../../api/CommentRequest";
import "./Comment.css";

const Comment = ({ data }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    try {
      const fetchComments = async () => {
        const response = await getComments(data._id);
        console.log(
          response,
          "this is the response when clicking the comments"
        );
        setComments(response.data)
      };
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createComment(data._id, comment);
        setComments(pre=>{
            return[...pre,response.data]
        })        
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="commentdata">
        {comments?.map((value, index) => {
            return <p className="commentname"><b>{value.userId.firstname} {value.userId.lastname}</b>:{value.comment}</p>
})}
      </div>
      <div className="comment">
        <form action="" onSubmit={handleSubmit}>
          <input
            className="writeComment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Write Your Comments Here"
            style={{ color: "var(--phone)" }}
          ></input>
          <button className="commentButton" type="submit">
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default Comment;
