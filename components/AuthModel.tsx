"use client"

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import Model from "./Model"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import {ThemeSupa} from '@supabase/auth-ui-shared'
import useAuthModel from "@/hooks/useAuthModel"
import { useEffect } from "react"


const AuthModel = () => {
    const supabaseClient = useSupabaseClient()
    const router = useRouter()
    const {session}=useSessionContext()
    const {OnClose,isOpen}= useAuthModel()

    useEffect(()=>{
        if(session){
            router.refresh()
            OnClose()
        }
    },[session,router,OnClose])

    const onChange=(open:boolean)=>{
        if(!open) {
            OnClose()
        }
    }

  return (
    <Model
    title="Welcome Back"
    desc= "Login to your Account"
    isOpen={isOpen}
    onChange={onChange}
    >
        <Auth 
        theme="dark"
        magicLink
        providers={["github","google"]}
        supabaseClient={supabaseClient}
        appearance={{
            theme: ThemeSupa,
            variables :{
                default: {
                    colors: {
                        brand: "#404040",
                        brandAccent: 'rgb(168 85 247)'
                    }
                }
            }
        }}
        />
    </Model>
  )
}

export default AuthModel