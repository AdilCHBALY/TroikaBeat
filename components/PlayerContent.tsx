"use client"

import { Song } from "@/types"
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import {BsPauseFill, BsPlayFill} from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import {TiVolumeDown, TiVolumeMute} from 'react-icons/ti'
import Slider from "./Slider";
import {useState,useEffect} from 'react'
import usePlayer from "@/hooks/usePlayer";
import useSound from 'use-sound'
 


interface PlayerContentPropos{
    song : Song;
    songUrl : string;
}

const PlayerContent:React.FC<PlayerContentPropos> = ({
    song,songUrl
}) => {
    const player = usePlayer()
    const [volume,setVolume]=useState(1)
    const [isPlaying,setIsplaying]=useState(false)
    const Icon = isPlaying ? BsPauseFill : BsPlayFill
    const VolumeIcon = volume===0 ? TiVolumeMute: TiVolumeDown  
    
    
    const onPlayNext=()=>{
        if(player.ids.length === 0){
            return
        }

        const currentIndex = player.ids.findIndex((id)=>id===player.activeId)
        const nextSong = player.ids[currentIndex+1]
        if(!nextSong){
            return player.setId(player.ids[0])
        }

        player.setId(nextSong)
    }

    const onPlayPrev=()=>{
        if(player.ids.length === 0){
            return
        }

        const currentIndex = player.ids.findIndex((id)=>id===player.activeId)
        const prevSong = player.ids[currentIndex-1]
        if(!prevSong){
            return player.setId(player.ids[player.ids.length - 1])
        }

        player.setId(prevSong)
    }

    const [play,{pause,sound}] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: ()=> setIsplaying(true),
            onend: ()=> {
                setIsplaying(false)
                onPlayNext()
            },
            onpause : ()=> setIsplaying(false),
            format : ["mp3"]
        }
    )


    useEffect(()=>{
        sound?.play()
        return ()=>{
            sound?.unload()
        }
    },[sound])


    const handlePlay=()=>{
        if(!isPlaying){
            play()
        }else{
            pause()
        }
    }

    const toggleMute = ()=>{
        if(volume===0){
            setVolume(1)
        }else{
            setVolume(0)
        }
    }


    return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
        <div className="flex w-full justify-start">
            <div className="flex items-center gap-x-4">
                <MediaItem 
                    data={song}
                />
                <LikeButton
                    songId={song.id}
                />
            </div>
        </div>
        <div className="flex md:hidden col-auto w-full justify-end items-center">
            <div 
                onClick={handlePlay}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer hover:scale-110 transition"
            >
                <Icon size={30} className="text-black"/>
            </div>
        </div>
        <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
            <AiFillStepBackward 
                onClick={onPlayPrev}
                className="text-neutral-400 cursor-pointer hover:text-white transition"
                size={30}
             />
             <div 
                onClick={handlePlay}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer hover:scale-110 transition"
            >
                <Icon size={30} className="text-black"/>
            </div>
            <AiFillStepForward 
                onClick={onPlayNext}
                className="text-neutral-400 cursor-pointer hover:text-white transition"
                size={30}
             />
        </div>

        <div className="hidden md:flex wfull justify-end pr-2">
            <div className="flex items-center gap-x-2 w-[120px]">
                <VolumeIcon 
                    size={28} 
                    onClick={toggleMute}
                    className ="text-neutral-400 hover:text-white transition"
                />
                <Slider value={volume} onChange={(value)=>setVolume(value)} />
            </div>
        </div>
    </div>
  )
}

export default PlayerContent

