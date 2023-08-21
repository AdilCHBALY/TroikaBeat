"use client"

import { Song } from "@/types"
import SongItem from "./SongItem"
import useOnplay from "@/hooks/usOnplay"

interface PageContentProps{
    songs : Song[]
}


const PageContent:React.FC<PageContentProps> = ({songs}) => {
    const onPlay = useOnplay(songs)
    if(songs.length === 0) {
        return(
            <div className="mt-4 text-neutral-400">
                No Songs Available
            </div>
        )
    }



    return(
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4 mt-4">
            {songs.map((song)=>(
                <SongItem
                    key={song.id}
                    onClick={(id:string) => onPlay(id)}
                    data={song}
                />
            ))}

        </div>
    )
}

export default PageContent