import React from 'react'
import { Button } from './ui/button'
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/helpers/firebase';
import { showToast } from '@/helpers/ShowToast';
import { RouteName } from '@/helpers/RouteName';
import { getEnv } from '@/helpers/getEnv';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/user.slice';


const GoogleLogin = () => {
  const dispath = useDispatch()

    const navigate = useNavigate()
     const handleLogin = async ()=>{
        

        
         try {
            const googleResponse = await signInWithPopup(auth, provider)
             const user = googleResponse.user
             const bodyData = {
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL
             }   
                      const response = await fetch(`http://localhost:3000/api/auth/googlelogin`,{
                        method: 'POST',
                        headers: {'Content-Type' : 'application/json'},
                        credentials: 'include',
                        body: JSON.stringify(bodyData)
                      })
                      const data = await response.json()
                      console.log(data)
                      console.log(response)
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
    <div>
      <Button variant="outline" className="w-full" onClick={handleLogin}>
      <FcGoogle/>
        Continue With Google
      </Button>
    </div>
  )
}

export default GoogleLogin
