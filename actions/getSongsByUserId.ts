import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongsByUsetId = async (): Promise<Song[]> => {
    const supabaseClient = createServerComponentClient({
        cookies : cookies
    })



    const {
        data: SessionData,
        error : SessionError
    } = await supabaseClient.auth.getSession()


    if(SessionError){
        console.log(SessionError?.message);
        return []
    }



    const {data, error} = await supabaseClient.from("songs")
    .select("*").eq('user_id',SessionData.session?.user.id).order('created_at',{ascending:false})


    if(error){
        console.log(error.message);
    }

    return (data as any) || []
}


export default getSongsByUsetId