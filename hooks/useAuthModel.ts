import { create } from "zustand";

interface AuthModelStore{
    isOpen : boolean;
    OnOpen : ()=>void;
    OnClose : ()=>void;
}


const useAuthModel = create<AuthModelStore>((set)=>({
    isOpen: false,
    OnOpen: ()=>set({isOpen:true}),
    OnClose: ()=>set({isOpen:false})
}))


export default useAuthModel