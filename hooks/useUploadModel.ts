import { create } from "zustand";

interface UploadModelStore{
    isOpen : boolean;
    OnOpen : ()=>void;
    OnClose : ()=>void;
}


const useUploadModel = create<UploadModelStore>((set)=>({
    isOpen: false,
    OnOpen: ()=>set({isOpen:true}),
    OnClose: ()=>set({isOpen:false})
}))


export default useUploadModel