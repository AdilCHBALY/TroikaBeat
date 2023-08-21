"use client"

import AuthModel from '@/components/AuthModel'
import UploadModel from '@/components/UploadModel'
import {useState,useEffect} from 'react'

const ModelProvider = () => {
    const [isMounted,setIsmMounted]=useState(false)

    useEffect(()=>{
        setIsmMounted(true)
    },[])

    if(!isMounted){
        return null
    }

    return (
        <>
           <AuthModel />
           <UploadModel />
        </>
    )
}

export default ModelProvider