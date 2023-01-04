import PostModel from "../Models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";

//Create post

export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get a post

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Update Post

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete a post

// export const deletePost = async (req, res) => {
//   const id = req.params.id;
//   const { userId } = req.body;

//   try {
//     const post = await PostModel.findById(id);
//     if (post.userId === userId) {
//       await post.deleteOne();
//       res.status(200).json("Post deleted successfully");
//     } else {
//       res.status(403).json("Action forbidden");
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

//Like/dislike a post

export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Posts liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Posts Unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get timeline Post

export const getTimeLinePosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUserPost = await PostModel.find({ userId: userId });
    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json(
      currentUserPost
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletePost = async (req, res) => {
  try {
      const { postId } = req.body
      console.log(postId, 'postid');


      let deletePost = await PostModel.deleteOne({ _id: postId })
      if (deletePost) {
          

          res.status(200).json({  message: " Post deleted", success: true });

      } else {
          console.log("error");
      }



  } catch (error) {
      res.status(500).json("hello" + error.message);
  }
}
