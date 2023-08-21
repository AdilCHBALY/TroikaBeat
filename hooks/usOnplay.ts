import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModel from "./useAuthModel";
import { useUser } from "./useUser";

const useOnplay = (songs : Song[])=>{
    const player = usePlayer()
    const authModel = useAuthModel()
    const {user} = useUser()


    const onPlay=(id:string) =>{
        console.log("TEST");
        if(!user){
            return authModel.OnOpen()
        }

        player.setId(id)
        player.setIds(songs.map((song)=>song.id))
    }


    return onPlay
}

export default useOnplay