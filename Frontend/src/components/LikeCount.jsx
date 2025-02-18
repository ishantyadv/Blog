import { useFetch } from '@/hooks/useFetch';
import React, { useEffect, useState } from 'react'
import { IoMdHeart } from "react-icons/io";
import { getEnv } from '@/helpers/getEnv';
import { useSelector } from 'react-redux';
import { showToast } from '@/helpers/ShowToast';
import { CiHeart } from "react-icons/ci";

const LikeCount = ({props}) => {
  const [likeCount, setLikeCount] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)
  const user = useSelector((state) => state.user)
  const { data: blogLikeCount, loading, error } = useFetch(
      `https://blog-mjx4.onrender.com/api/blog-like/getlike/${props.blogid}/${user && user.isLoggedIn ? user.user._id : ''}`,
      {
        method: "get",
        credentials: "include",
      }
    );

    useEffect(()=>{
      if(blogLikeCount){
        setLikeCount(blogLikeCount.likecount)
        setHasLiked(blogLikeCount.isUserliked)
      }
    }, [blogLikeCount])

    const handleLike = async () =>{
      try {
        if(!user.isLoggedIn){
          return showToast('error', 'Please login into your account')
        }

        const response = await fetch(`https://blog-mjx4.onrender.com/api/blog-like/dolike/`,{
          method: 'post',
          credentials: 'include',
          headers: {'Content-type' : "application/json"},
          body: JSON.stringify({ user: user.user._id, blogid: props.blogid})
        })

        if(!response.ok){
          showToast('error', response.statusText)
        }
        const responseData = await response.json()
        setLikeCount(responseData.likecount)
        setHasLiked(!hasLiked) 
        
      } catch (error) {
        showToast('error', error.message)
      }
    }


  return (
     <button onClick={handleLike} type='button' className= 'flex justify-between items-center gap-1'   >
           {!hasLiked ?
            <CiHeart/>
            :
            <IoMdHeart color='red'/>
           
           }
            
            {likeCount}
          </button>
    
  )
}

export default LikeCount
