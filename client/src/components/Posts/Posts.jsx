import React from 'react'
import './Posts.css'
// import { PostsData } from '../../Data/PostsData'
import Post from '../Post/Post'
import { useDispatch ,useSelector} from 'react-redux'
import { useEffect } from 'react'
import { getTimeLinePosts } from '../../actions/PostAction'
import { useParams } from 'react-router-dom'

const Posts = () => {
  const dispatch =useDispatch()
  const {user}=useSelector((state)=>state.authReducer.authData)
  let  {posts,loading}=useSelector((state)=>state.postReducer)
  const params=useParams()

  useEffect(()=>{
    dispatch(getTimeLinePosts(user._id))
  },[]);

  if(!posts) return "no posts";
  if(params.id) posts=posts.filter((post)=>post.userId===params.id)


  return (
    <div className="Posts">
      {
        loading? "Fetching posts...":
      
        posts.map((post,id)=>{
            return <Post key={id} data={post} id={id}/>
        })}

    </div>
  )
}

export default Posts