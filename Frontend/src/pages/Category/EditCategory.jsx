import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useEffect } from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import slugify from 'slugify'
import { showToast } from '@/helpers/ShowToast'
import { getEnv } from '@/helpers/getEnv'
import { useParams } from 'react-router-dom'
import { useFetch } from '@/hooks/useFetch'


const EditCategory = () => {
    const { category_id } = useParams()
    // console.log(category_id)
    const {data: categoryData, loading, error} = useFetch(`https://blog-mjx4.onrender.com/api/category/show/${category_id}`,{
            method: 'get',
            credentials: 'include'
        },[category_id])


        console.log(categoryData)

    const formSchema = z.object({
            name: z.string().min(3,'Name must be at least 3 character long'),
            slug: z.string().min(3,'Slug must be at least 3 character long.'),
            
          });
        
          const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
              name:"", 
              slug: "",
             
            },
          });

          const categoryName = form.watch('name')
          useEffect(() =>{
            
            if(categoryName){
                const slug = slugify(categoryName, {lower: true})
                form.setValue('slug' , slug)

            }
          },[categoryName])
            
         useEffect(() =>{
          if(categoryData){
            form.setValue('name', categoryData.category.name)
            form.setValue('slug', categoryData.category.slug)
          }
         },[categoryData])
        
         async function onSubmit(values) {
             try {
              const response = await fetch(`https://blog-mjx4.onrender.com/api/category/update/${category_id}`,{
                method: 'put',
                headers: {'content-type' : 'application/json'},
                body: JSON.stringify(values)
              })
              const data = await response.json()
              if(!response.ok){
               return showToast('error', data.message)
    
              }
               
               showToast('success', data.message)
             } catch (error) {
              showToast('error', error.message)
              
             }
          }
 

  return (

    <div>
     <Card className="pt-5 max-w-screen-md mx-auto">
          
          <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input className='border-2 border-blue-200' placeholder="Enter your name" {...field} />
                      </FormControl>
      
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input className='border-2 border-blue-200' placeholder="Enter your email" {...field} />
                      </FormControl>
      
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
             
      
             
              <Button type="submit" className="w-full">
                Save
              </Button>
            
      
              
             
      
            
            </form>
          </Form>
          </CardContent>


          
        </Card>
    </div>
    
  )
}

export default EditCategory

