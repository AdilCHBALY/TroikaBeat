import getLikedSongs from "@/actions/getLikedSongs"
import Header from "@/components/Header"
import { useUser } from "@/hooks/useUser"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import Image from "next/image"
import LikedContent from "./components/LikedContent"

export const revalidate = 0


const Liked = async ()=>{

    const songs  = await getLikedSongs()

    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header className="from-[rgb(73,53,140)]">
                <div className="mt-20">
                    <div className="flex flex-col md:flex-row items-center gap-x-5">
                        <div className="relative h-[12rem] w-[12rem] lg:h-[15rem] lg:w-[15rem]">
                            <Image
                                fill
                                alt="liked songs"
                                className="object-cover"
                                src={"/images/like.jpg"} />
                        </div>
                        <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                            <p className="text-white hidden md:block font-light text-sm">
                                Playlist
                            </p>
                            <h1 className="text-white text-6xl sm:text-5xl lg:text-8xl font-bold">
                                Liked Songs
                            </h1>
                            <div className="flex flex-row items-center gap-x-2">
                                <p className="font-bold hover:underline cursor-pointer">
                                    Adil Chbaly 
                                </p>
                                <div className="h-[4px] w-[4px] bg-white rounded-full">

                                </div>
                                <p>
                                    {songs.length} songs
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Header>
            <LikedContent songs={songs} />
        </div>
    )
}


export default Liked