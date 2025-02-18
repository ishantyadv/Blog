import React, { useState } from 'react'
import logo from '@/assets/images/Blog-Logo.webp'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosLogIn } from "react-icons/io";
import SearchBox from './SearchBox';
import { RouteBlogAdd, RouteName, RouteProfile, RouteSignIn } from '@/helpers/RouteName';
import { useDispatch, useSelector } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import usericon from '@/assets/images/user.png'
import { FaUserTie } from "react-icons/fa6";
import { FaRegSquarePlus } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { getEnv } from '@/helpers/getEnv';
import { removeUser } from '@/redux/user/user.slice';
import { showToast } from '@/helpers/ShowToast';
import { IoMdSearch } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import { useSidebar } from './ui/sidebar';


const Topbar = () => {
  const { toggleSidebar } = useSidebar()
  const [showSearch, setShowSearch] = useState(false)
  const dispath = useDispatch()
  const navigate= useNavigate()
 
   const user = useSelector((state)=> state.user)

  const handleLogout = async () =>{
      try {
                   const response = await fetch(`http://localhost:3000/api/auth/logout`,{
                     method: 'get',
                     credentials: 'include',
                    
                   })
                   const data = await response.json()
                   if(!response.ok){
                    return showToast('error', data.message)
         
                   }
                   dispath(removeUser())
                   navigate(RouteName)
                   showToast('success', data.message)
                  } catch (error) {
                   showToast('error', error.message)
                   
                  }


   } 

      const toggleSearch  = ()=>{
       setShowSearch(!showSearch)
      }
      
  return (
    <div className=' flex justify-between item-center h-16 fixed w-full z-20 bg-white px-7 border-b '>
    <div className='flex justify-center items-center gap-2' >
    <button onClick={toggleSidebar} className='md:hidden' type='button'>
      <MdOutlineMenu/>
    </button>
      
      <Link to={RouteName}>
      <img src={logo}  className='md:w-100 w-48 md:p-8 md:mt-8'/>
      </Link>
        
    </div>
    <div className='w-[500px]'>
    <div className={`md:relative md:block  absolute bg-white left-0 w-full md:top-0 top-16 md:p-0 p-1 ${showSearch ? 'block' : 'hidden'}`}>
    <SearchBox/>
    </div>
       
    </div>
    <div className='flex items-center gap-5'>
      
      <button onClick={toggleSearch} type='button ' className='md:hidden block'>
          <IoMdSearch size={25}/>
      </button>


    {!user.isLoggedIn ?  
      <Button asChild className='rounded-full mt-5 border-b'>
        
        <Link to={RouteSignIn}>
        <IoIosLogIn/>
        Sign In
        </Link>
    </Button>
    :
    <DropdownMenu>
  <DropdownMenuTrigger>
  <Avatar>
  <AvatarImage src={user.user.avatar || usericon   } />
  
</Avatar>

  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>
      <p>{user.user.name}</p>
      <p className='text-sm'>{user.user.email}</p>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem asChild className="cursor-pointer">
      <Link to={RouteProfile}> 
      <FaUserTie/>
      profile</Link>
    </DropdownMenuItem>
    <DropdownMenuItem asChild className="cursor-pointer">
      <Link to={RouteBlogAdd}> 
      <FaRegSquarePlus/>
      Create Blog</Link>
    </DropdownMenuItem>

<DropdownMenuSeparator/>

    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer" >
     
      <MdLogout color='red'/>
      Logout
    </DropdownMenuItem>
   
  </DropdownMenuContent>
</DropdownMenu>

    }
        
    </div>
      
    </div>
  )
}

export default Topbar
