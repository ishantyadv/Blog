import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RouteSignIn } from '@/helpers/RouteName'
import { Card } from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/ShowToast'
import GoogleLogin from '@/components/GoogleLogin'

const SignUp = () =>{
  const navigate = useNavigate()

    const formSchema = z.object({
        name: z.string().min(3,'Name must be at least 3 character long'),
        email: z.string().email(),
        password: z.string().min(8, "password must be at least 8 character long"),
        confirnmPassword: z.string().refine(data=> data.password === data.confirnmPassword,'password and confirnmPassword do not match'),
      });
    
      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name:"", 
          email: "",
          password: "",
          confirnmPassword:"",
        },
      });
        
     
    
     async function onSubmit(values) {
         try {
          const response = await fetch(`http://localhost:3000/api/auth/register`,{
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify(values)
          })
          const data = await response.json()
          if(!response.ok){
           return showToast('error', data.message)

          }
          navigate(RouteSignIn)
          showToast('success', data.message)
         } catch (error) {
          showToast('error', error.message)
          
         }
      }
    
    return (
        <div className="flex justify-center items-center h-screen w-screen">
          <Card className="w-[400px] p-5">
            <h1 className="text-2xl font-bold text-center mb-5">
              Create Your Account
            </h1>
             
              <div>
                <GoogleLogin/>
                <div className='border my-5 flex justify-center items-center'>
                  <span className='absolute bg-white text-sm'>Or</span>
                </div>
              </div>



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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input className='border-2 border-blue-200' placeholder="Enter your email" {...field} />
                        </FormControl>
    
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" className='border-2 border-blue-200' placeholder="Enter your password" {...field} />
                        </FormControl>
    
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="confirnmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ConfirnmPassword</FormLabel>
                        <FormControl>
                          <Input type="password" className='border-2 border-blue-200' placeholder="Enter your confirnmpassword" {...field} />
                        </FormControl>
    
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
    
                <div className="mt-5">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
                <div className="mt-5 text-sm flex justify-center items-center gap-2">
                <p>Already have account ?</p>
                <Link className="text-blue-500 hover:underline" to={RouteSignIn}>Sign In</Link>
    
                </div>
                </div>
    
              
              </form>
            </Form>
          </Card>
        </div>
      );
}

export default SignUp
