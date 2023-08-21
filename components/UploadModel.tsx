"use client"

import useUploadModel from "@/hooks/useUploadModel"
import Model from "./Model"
import {useState} from 'react'
import { useForm,FieldValues,SubmitHandler } from "react-hook-form"
import Input from "./Input"
import Button from "./Button"
import { toast } from "react-hot-toast"
import { useUser } from "@/hooks/useUser"
import uniquid from 'uniqid'
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"


const UploadModel = () => {
    const uploadModel = useUploadModel()
    const [isLoading,setIsLoading] = useState(false)
    const {user} = useUser()
    const router = useRouter()
    const supabaseClient = useSupabaseClient()

    const {register,handleSubmit,reset} = useForm<FieldValues>({
        defaultValues : {
            author : '',
            title : '',
            song : null,
            image : null
        }
    })

    const onChange=(open : boolean) => {
        if(!open) {
            reset()
            uploadModel.OnClose()
        }
    }

    const onSubmit : SubmitHandler<FieldValues>=async (values) => {
        try {
            setIsLoading(true)
            const imageFile = values.image?.[0]
            const songFile = values.song?.[0]

            if(!imageFile || !songFile || !user) {
                toast.error("Missing Field")
                return
            }

            const uniqueID=uniquid()


            //Upload Song

            const {
                data: SongData,
                error : SongError
            } = await supabaseClient
            .storage
            .from("songs")
            .upload(`song-${values.title}-${uniqueID}`,songFile, {
                cacheControl : '3600',
                upsert : false
            })

            if(SongError){
                setIsLoading(false)
                return toast.error("Failed Song Upload")
            }

            //UploadImage

            const {
                data: ImageData,
                error : ImageError
            } = await supabaseClient
            .storage
            .from("images")
            .upload(`image-${values.title}-${uniqueID}`,imageFile, {
                cacheControl : '3600',
                upsert : false
            })

            if(ImageError){
                setIsLoading(false)
                return toast.error("Failed Image Upload")
            }

            const {
                error : SupError,
            } =  await supabaseClient
            .from("songs")
            .insert({
                user_id : user.id,
                title: values.title,
                author: values.author,
                image_path: ImageData.path,
                song_path: SongData.path
            })

            if(SupError){
                setIsLoading(false)
                return toast.error(SupError.message)
            }


            router.refresh()
            setIsLoading(false)
            toast.success("Song Created Successfully")
            reset()
            uploadModel.OnClose()

        } catch (error) {
            toast.error("Failed to submit")
        }finally{
            setIsLoading(false)
        }
    }

  return (
    <Model
    title="Add Song"
    desc="Upload a new song"
    isOpen = {uploadModel.isOpen}
    onChange={onChange}
    >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
            <Input 
                id="title"
                disabled={isLoading}
                {...register('title',{required: true})}
                placeholder = "Song Title"
            />
            <Input 
                id="author"
                disabled={isLoading}
                {...register('author',{required: true})}
                placeholder = "Song Author"
            />
            <div className="pb-1">
                Select a song file
            </div>
            <Input 
                id="song"
                className="cursor-pointer"
                disabled={isLoading}
                {...register('song',{required: true})}
                type="file"
                accept=".mp3"
            />
            <div className="pb-1">
                Select a song image
            </div>
            <Input 
                id="image"
                className="cursor-pointer"
                disabled={isLoading}
                {...register('image',{required: true})}
                type="file"
                accept="image/*"
            />
            <Button disabled={isLoading} type="submit">
                Create
            </Button>
        </form>
    </Model>
  )
}

export default UploadModel