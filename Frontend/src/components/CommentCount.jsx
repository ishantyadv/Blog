import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { getEnv } from "@/helpers/getEnv";
import { FaRegComment } from "react-icons/fa";


const CommentCount = ({ props }) => {
  const { data, loading, error } = useFetch(
    `http://localhost:3000/api/comment/getcount/${props.blogid}`,
    {
      method: "get",
      credentials: "include",
    }
  );

  return (
  
      <button type='button' className= 'flex justify-between items-center gap-1'   >
        <FaRegComment/>
        {data && data.commentCount}
      </button>


  )
};

export default CommentCount;
