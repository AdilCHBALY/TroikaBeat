"use client";


import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import {HiHome} from 'react-icons/hi';
import {BiSearch} from 'react-icons/bi'
import {RxCaretLeft,RxCaretRight } from 'react-icons/rx'
import Button from "./Button";
import useAuthModel from "@/hooks/useAuthModel";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
interface HeaderProps{
    children:React.ReactNode;
    className?:string;
}

const Header : React.FC<HeaderProps> = ({
    children,className
}) => {
  const {OnOpen}=useAuthModel()
    const router = useRouter()
    const supabaseClient = useSupabaseClient()

    const {user,subscription} = useUser()
    
    const handleLogout = async ()=>{
      const {error}=await supabaseClient.auth.signOut()
      // TODO : Reset Any playing songs
      router.refresh()

      if(error){
        toast.error(error.message)
      }
    }

  return (
    <div className={twMerge(`
      h-fit
      bg-gradient-to-b
      from-neutral-800
      p-6
    `,className)}>
      <div className="
      w-full
      mb-4
      flex
      items-center
      justify-between
      ">
        <div className="
        hidden
        md:flex
        gap-x-2
        items-center
        ">
            <button 
            onClick={()=>router.back()}
            className="
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
            ">
              <RxCaretLeft 
              className="text-white"
              size={35}/>
            </button>
            <button 
            onClick={()=>router.forward()}
            className="
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
            ">
              <RxCaretRight 
              className="text-white"
              size={35}/>
            </button>
        </div>
        <div className="
        flex
        md:hidden
        gap-x-2
        items-center
        ">
          <button className="
          rounded-full
          p-2
          bg-white
          flex
          items-center
          justify-center
          hover:opacity-75
          transition
          ">
            <HiHome className="text-black" size={26} />
          </button>
          <button className="
          rounded-full
          p-2
          bg-white
          flex
          items-center
          justify-center
          hover:opacity-75
          transition
          ">
            <BiSearch className="text-black" size={26} />
          </button>
        </div>
        <div className="
        flex
        justify-between
        items-center
        gap-x-4
        ">
          {user ? (
            <div className="
            relative
            flex
            gap-x-4 items-center
            ">
              <Button 
              onClick={handleLogout}
              className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button 
              onClick={()=> {
                router.push("/account")
              }}
              className="bg-black text-white">
                <FaUserAlt />
              </Button>
            </div>
          ) : 
         ( 
          <>
            {/* <div>
              <Button 
              onClick={OnOpen}
              className="
              bg-transparent
              text-neutral-400
              font-medium
              ">
                Sign Up
              </Button>
            </div> */}
            <div>
              <Button 
              onClick={OnOpen}
              className="
              bg-white
              px-6
              py-2
              ">
                Log In
              </Button>
            </div>
          </>
)}
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header