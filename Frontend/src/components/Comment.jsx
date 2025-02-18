import React, { useState } from "react";
import { FaComments } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/ShowToast";
import { Textarea } from "./ui/textarea";
import { useSelector } from "react-redux";
import { RouteSignIn } from "@/helpers/RouteName";
import CommentList from "./CommentList";
import { Link } from "react-router-dom";


const Comment = ({props}) => {
  const [newComment, setNewComment] = useState()
  const user = useSelector((state) => state.user)
  const formSchema = z.object({
    comment: z.string().min(3, "Comment must be at least 3 character long"),
    
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
      
    },
  });

  async function onSubmit(values) {
    try {
        const newValues = {...values, blogid: props.blogid, user: user.user._id}
      const response = await fetch(
        `https://blog-mjx4.onrender.com/api/comment/add`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newValues),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      setNewComment(data.comment)
      form.reset();
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }
  return (
    <div>
      <h4 className="flex items-center gap-2 text-2xl font-bold">
        <FaComments className="text-violet-500" /> Comment
      </h4>
     {user && user.isLoggedIn 
      ?
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-3">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                   <Textarea placeholder= "Type your comment..." {...field}/>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="">
            Save
          </Button>
        </form>
      </Form>
      :
      <Button asChild>
        <Link to={RouteSignIn}>sign In</Link>
      </Button>

     }
      <div>
        <CommentList props= {{ blogid: props.blogid, newComment}}/>
      </div>
    </div>
  );
};

export default Comment;
