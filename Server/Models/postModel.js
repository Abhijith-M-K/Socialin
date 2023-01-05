import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: String,
    likes: [],
    image: String,
    comments:[{type:mongoose.Types.ObjectId,ref:'user'}]
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Post", postSchema);
export default PostModel;
