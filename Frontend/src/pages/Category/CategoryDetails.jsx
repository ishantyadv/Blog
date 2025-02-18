import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RouteAddcategory, RouteEditcategory } from '@/helpers/RouteName'
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
import { getEnv } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/ShowToast'
  

const CategoryDetails = () => {
    const [refreshData, setRefreshData] = useState(false)
    const {data: categoryData, loading, error} = useFetch(`http://localhost:3000/api/category/allcategory`,{
        method: 'get',
        credentials: 'include'
    },[refreshData])

   const handleDelete = (id) => {
    const response = deleteData(`http://localhost:3000/api/category/delete/${id}`)
    if(response){
        setRefreshData(!refreshData)
        showToast('success', 'Data deleted.')
    }else{
        showToast('error', 'Data not deleted.')
    }
   }  


    // console.log(categoryData) 
    if(loading) return <Loading/>

  return (
    <div>
        <Card>
            <CardHeader>
                <div>
                    <Button>
                        <Link to={RouteAddcategory}>
                        Add Category
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
            <Table>
  
  <TableHeader>
    <TableRow>
      <TableHead >Category</TableHead>
      <TableHead>Slug</TableHead>
      <TableHead>Action</TableHead>
      
    </TableRow>
  </TableHeader>
  <TableBody>
     {categoryData && categoryData.category.length > 0 ?
     categoryData.category.map(category =>
        <TableRow key={category._id}>
         <TableCell>{category.name}</TableCell>
         <TableCell>{category.slug}</TableCell> 
         <TableCell className="flex gap-3">
            <Button variant="outline" className="hover:bg-violet-500" aschild>
                <Link to = {RouteEditcategory(category._id)}>
                    <FiEdit/>
                </Link>
            </Button>
            <Button onClick= {() => handleDelete(category._id)} variant="outline" className="hover:bg-violet-500" >
              
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

export default CategoryDetails
