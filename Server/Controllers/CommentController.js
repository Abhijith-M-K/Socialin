
import Comment from "../Models/commentModel.js";

export const createComment = async (req, res) => {

  const postId = req.params.id;
  const userId=req.user.id;
  try {
      const comment = new Comment({
          userId: userId,
          postId: postId,
          comment: req.body.comment,


      });

      await comment.save();
      res.status(200).json(comment);
  } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
};


export const getComments = async (req, res) => {
    const postId = req.params.id;
    
    try {
        const response= await Comment.find({postId: postId}).populate({path: 'userId', select:{'firstname':1,'lastname':1}});

        res.status(200).json(response);
        
    } catch (error) {
        console.log(error)
    }
}
