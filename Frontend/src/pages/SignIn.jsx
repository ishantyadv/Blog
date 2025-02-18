import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate,  } from "react-router-dom";
import { RouteName, RouteSignUp } from "@/helpers/RouteName";
import { Card } from "@/components/ui/card";
import { showToast } from "@/helpers/ShowToast";
import { getEnv } from "@/helpers/getEnv";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";
import GoogleLogin from "@/components/GoogleLogin";
import logo from '@/assets/images/Tokyo-logo.jpeg'

const SignIn = () => {

    const dispath = useDispatch()

   const navigate = useNavigate()
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "password must required "),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

   async function onSubmit(values) {
     try {
              const response = await fetch(`http://localhost:3000/api/auth/login`,{
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                credentials: 'include',
                body: JSON.stringify(values)
              })
              const data = await response.json()
              if(!response.ok){
               return showToast('error', data.message)
    
              }
              dispath(setUser(data.user))
              navigate(RouteName)
              showToast('success', data.message)
             } catch (error) {
              showToast('error', error.message)
              
             }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[400px] p-5">
        <div className="flex justify-center items-center mb-2" >
          <Link to={RouteName}>
            <img src={logo} height={20} width={80}/>
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-center mb-5">
          Login Into Account
        </h1>
        <div>
                <GoogleLogin/>
                <div className='border my-5 flex justify-center items-center'>
                  <span className='absolute bg-white text-sm'>Or</span>
                </div>
              </div>



        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3 ">
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

            <div className="mt-5">
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <div className="mt-5 text-sm flex justify-center items-center gap-2">
            <p>Don&apos;t have account</p>
            <Link className="text-blue-500 hover:underline" to={RouteSignUp}>Sign Up</Link>

            </div>
            </div>

          
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
