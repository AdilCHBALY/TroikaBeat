"use client"

import useDebounce from "@/hooks/useDebounce"
import { useRouter } from "next/navigation"
import { useState ,useEffect } from "react"
import qs from "query-string"
import Input from "./Input"


const SearchInput = () => {
    const router = useRouter()
    const [value,setValue]=useState<string>("")
    const debouncedValue = useDebounce<string>(value,500)

    useEffect(()=>{
        const q = {
            title:debouncedValue
        }

        const url = qs.stringifyUrl({
            url : '/search',
            query:q
        })

        router.push(url)
    },[router,debouncedValue])

  return (
    <Input
        placeholder="What do you like to listen to?"
        onChange={(e)=>setValue(e.target.value)}
        value={value}
    />
  )
}

export default SearchInput