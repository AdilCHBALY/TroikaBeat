"use client"

import LikeButton from "@/components/LikeButton"
import MediaItem from "@/components/MediaItem"
import useOnplay from "@/hooks/usOnplay"
import { Song } from "@/types"

interface SearchContentProps{
    songs : Song[]
}

const SearchContent : React.FC<SearchContentProps> = ({songs}) => {

    const onPlay = useOnplay(songs)


    if(songs.length === 0) {
        return(
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No Songs Found.
            </div>
        )
    }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
        {songs.map((song)=>(
            <div 
            className="flex group items-center gap-x-4 w-full"
            key={song.id}>
                <div className="flex-1">
                    <MediaItem 
                        data={song}
                        onClick={(id:string)=>onPlay(id)}
                    />
                </div>
                <LikeButton songId={song.id}/>
            </div>
        ))}
    </div>
  )
}

export default SearchContent