import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Link } from 'react-router-dom'
import logo from '@/assets/images/Tokyo-logo.jpeg'
import { AiTwotoneHome } from "react-icons/ai"
import { TbCategory2 } from "react-icons/tb";
import { GrBlog } from "react-icons/gr";
import { FaComments } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { RouteBlog, RouteBlogByCategory, RoutecategoryDetails, RouteCommentDetails, RouteName, RouteUser } from '@/helpers/RouteName'
import { useFetch } from '@/hooks/useFetch'
import { getEnv } from '@/helpers/getEnv'
import { useSelector } from 'react-redux'

const AppSidebar = () => {
 const user = useSelector(state => state.user)
 const {data: categoryData} = useFetch(`https://blog-mjx4.onrender.com/api/category/allcategory`,{
        method: 'get',
        credentials: 'include'
    })


  return (
    <Sidebar>
    <SidebarHeader className="bg-white">
        <img src={logo} width={120}/>
    </SidebarHeader>
    <SidebarContent className="bg-white">
      <SidebarGroup >
           <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                <AiTwotoneHome/>
                    <Link to={RouteName}>Home</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {user && user.isLoggedIn
               ?
               <>
               <SidebarMenuItem>
                <SidebarMenuButton>
                <GrBlog/>
                    <Link to={RouteBlog}>Blogs</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                <FaComments/>
                    <Link to={RouteCommentDetails} >Comments</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               </>
               :
              <></>
              }
               
               {user && user.isLoggedIn && user.user.role === 'admin'
                ?
                <>
                <SidebarMenuItem>
                <SidebarMenuButton>
                <TbCategory2/>
                    <Link to={RoutecategoryDetails}>Categories</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
             
              <SidebarMenuItem>
                <SidebarMenuButton>
                <FaUsers/>
                    <Link to={RouteUser} >Users</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
                </>
                :

                <></>
               }

              
            </SidebarMenu>
      </SidebarGroup> 
      <SidebarGroup >
      <SidebarGroupLabel>
        Categories
      </SidebarGroupLabel>
           <SidebarMenu>
            {categoryData && categoryData.category.length > 0
            && categoryData.category.map(category => 
            
              <SidebarMenuItem key={category._id}>
                <SidebarMenuButton>
                <GoDotFill/>
                    <Link to={RouteBlogByCategory(category.slug)} >{category.name}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
            

            }

             
              
            </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    
  </Sidebar>
  )
}

export default AppSidebar
