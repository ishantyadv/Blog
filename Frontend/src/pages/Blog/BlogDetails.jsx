import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {  RouteBlogAdd, RouteBlogEdit  } from '@/helpers/RouteName'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useFetch } from '@/hooks/useFetch'
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/ShowToast'
import Loading from '@/components/Loading'
import { getEnv } from '@/helpers/getEnv'
import { FaRegTrashAlt } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import moment from 'moment'

const BlogDetails = () => {

  const [refreshData, setRefreshData] = useState(false)
  const {data: blogData, loading, error} = useFetch(`http://localhost:3000/api/blog/getall`,{
      method: 'get',
      credentials: 'include'
  },[refreshData])

 const handleDelete = (id) => {
  const response = deleteData(`http://localhost:3000/api/blog/delete/${id}`)
  if(response){
      setRefreshData(!refreshData)
      showToast('success', 'Data deleted.')
  }else{
      showToast('error', 'Data not deleted.')
  }
 }  


  console.log(blogData)
  if(loading) return <Loading/>
  return (
    <div>
    <Card>
        <CardHeader>
            <div>
                <Button>
                    <Link to={RouteBlogAdd}>
                    Add Blog
                    </Link>
                </Button>
            </div>
        </CardHeader>
        <CardContent>
        <Table>

<TableHeader>
<TableRow>
<TableHead >Author</TableHead>
  <TableHead >Category Name</TableHead>
  <TableHead >Title</TableHead>
  <TableHead>Slug</TableHead>
  <TableHead >Dated</TableHead>
  <TableHead>Action</TableHead>
  
</TableRow>
</TableHeader>
<TableBody>
 {blogData && blogData.blog.length > 0 ?

  blogData.blog.map(blog =>
    <TableRow key={blog._id}>
     <TableCell>{blog?.author?.name}</TableCell>
     <TableCell>{blog?.category?.name}</TableCell> 
     <TableCell>{blog?.title}</TableCell> 
     <TableCell>{blog?.slug}</TableCell> 
     <TableCell>{moment(blog?.createdAt).format('DD-MM-YYYY')}</TableCell> 
     <TableCell className="flex gap-3">
        <Button variant="outline" className="hover:bg-violet-500" aschild>
            <Link to = {RouteBlogEdit(blog._id)}>
                <FiEdit/>
            </Link>
        </Button>
        <Button onClick= {() => handleDelete(blog._id)} variant="outline" className="hover:bg-violet-500" >
          
                <FaRegTrashAlt/>
            
        </Button>
     </TableCell>
 </TableRow>
 )
 
 :
 
 <TableRow>
      <TableCell colspan="3">
         Data not found 
      </TableCell>
 </TableRow>
 
 }
</TableBody>
</Table>

        </CardContent>
    </Card>
</div>
  )
}

export default BlogDetails
