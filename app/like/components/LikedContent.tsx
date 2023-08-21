"use client"

import Button from "@/components/Button"
import LikeButton from "@/components/LikeButton"
import MediaItem from "@/components/MediaItem"
import useOnplay from "@/hooks/usOnplay"
import { useUser } from "@/hooks/useUser"
import { Song } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import {CgMusicNote} from 'react-icons/cg'


interface LikedContentProps{
    songs : Song[]
}


const LikedContent:React.FC<LikedContentProps> = ({songs}) => {
    const router = useRouter()
    const {isLoading,user}=useUser()
    const onPlay=useOnplay(songs)
    useEffect(()=>{
        if(!isLoading && !user) {
            router.replace('/')
        }
    },[isLoading,user,router])

    if(songs.length === 0){
        return(
            <div className="flex flex-col gap-y-6 items-center h-[400px] justify-center w-full px-6">
                <CgMusicNote size={55} />
                <h1 className="text-white font-bold text-3xl">
                    Songs you like will appear here
                </h1>
                <p className="text-white">
                    Save songs by tapping the heart icon.
                </p>
                <Button 
                onClick={()=>{
                    router.push('/search')
                }}
                className="bg-white hover:scale-105 w-max hover:opacity-100">
                    Find songs
                </Button>
            </div>
        )
    }

    return (
    <div className="flex flex-col gap-y-2 w-full p-6">
        {songs.map((song)=>(
            <div key={song.id} 
                className="flex items-center gap-x-4 w-full"
            >
                <div className="flex-1">
                    <MediaItem 
                        onClick={(id:string)=>onPlay(id)}
                        data={song}
                    />
                </div>
                <LikeButton songId={song.id} />
            </div>
        ))}
    </div>
  )
}

export default LikedContent