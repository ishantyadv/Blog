import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { getEnv } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import BlogCard from '@/components/BlogCard'

const Index = () => {
    
  const {data: blogData, loading, error} = useFetch(`http://localhost:3000/api/blog/blogs`,{
        method: 'get',
        credentials: 'include'
    })
    
    if(loading) return <Loading/>

  return (
    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
      {blogData && blogData.blog.length > 0 
       ?
       blogData.blog.map(blog => <BlogCard key={blog._id} props={blog}/>)
       :
       <div>Data Not Found.</div>
      }
    </div>
  )
}

export default Index
