import {TbPlaylist} from 'react-icons/tb'
import {AiOutlinePlus} from 'react-icons/ai'
import useAuthModel from '@/hooks/useAuthModel'
import { useUser } from '@/hooks/useUser'
import useUploadModel from '@/hooks/useUploadModel'
import { Song } from '@/types'
import MediaItem from './MediaItem'
import useOnplay from '@/hooks/usOnplay'

interface LibraryProps{
    songs:Song[]
}


const Library : React.FC<LibraryProps>= ({songs}) => {
    const authmodel = useAuthModel()
    const uploadModel  = useUploadModel()
    const {user}=useUser()

    const onPlay = useOnplay(songs)

    const onClick = () =>{
        if(!user){
            return authmodel.OnOpen()
        }
        // TODO : Check For Subs
        return uploadModel.OnOpen()
    }

  return (
    <div className="flex flex-col">
        <div className="
            flex
            items-center
            justify-between
            px-5
            pt-4
        ">

            <div className="
            inline-flex
            items-center
            gap-x-2
            ">
                <TbPlaylist
                    size={26}
                    className="
                    text-neutral-400
                    "
                 />
                 <div className="text-neutral-400 text-md font-medium">
                    My Library
                 </div>
            </div>
                <div
                    onClick={onClick} 
                >
                <AiOutlinePlus 
                    size = {26}
                    className = "text-neutral-400 hover:text-white transition cursor-pointer"
                />
                </div>
        </div>
        <div className='flex flex-col gap-y-2 mt-4 px-3
        '>
            {
                songs.map((song)=>(
                    <MediaItem 
                        key={song.id}
                        onClick={(id:string)=>onPlay(id)}
                        data={song}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default Library