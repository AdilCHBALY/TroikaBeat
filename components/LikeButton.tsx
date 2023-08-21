"use client"

import useAuthModel from "@/hooks/useAuthModel";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps{
    songId : string;
}

const LikeButton:React.FC<LikeButtonProps> = ({songId}) => {
    const router = useRouter()
    const {supabaseClient}= useSessionContext()
    const authModel = useAuthModel()
    const {user} = useUser()
    const [liked,setLiked]=useState(false)


    useEffect(()=>{
        if(!user?.id){
            return
        }

        const fetchData = async()=>{
            const {data,error}=await supabaseClient.from("liked_songs").select("*").eq("user_id",user.id).eq("song_id",songId).single()

            if(!error && data){
                setLiked(true)
            }
        }


        fetchData()
    },[songId,supabaseClient,user?.id])

    const Icon = liked ? AiFillHeart : AiOutlineHeart

    const handlelike= async ()=>{
        if(!user){
            return authModel.OnOpen()
        }


        if(liked){
            const {error} = await supabaseClient
                .from("liked_songs")
                .delete()
                .eq("user_id",user.id)
                .eq("song_id",songId)

                if(error){
                    toast.error(error.message)
                }else{
                    setLiked(false)
                    toast.success("Removed from your liked songs")
                }
        }else{
            const {error} = await supabaseClient
                .from("liked_songs")
                .insert({
                    song_id: songId,
                    user_id: user.id
                })


                if(error){
                    toast.error(error.message)
                }else{
                    setLiked(true)
                    toast.success("Added to you Liked Songs")
                }
        }

        router.refresh()
    }

    return (
    <button     
    onClick={handlelike}
    className="hover:scale-110 transition">
        <Icon color={liked ? "purple" : 'white'} size={25}/>
    </button>
  )
}

export default LikeButton