import Link from "next/link"
import { IconType } from "react-icons"
import {twMerge} from "tailwind-merge"
interface SiderbarItemProps{
    icon : IconType,
    label : string,
    active? : boolean,
    href : string 
}


const SidebarItem : React.FC<SiderbarItemProps> = ({
    icon : Icon,
    label ,
    active,
    href  
}) => {
  return (
    <Link href={href} className={twMerge(`
        flex 
        flex-row
        h-auto 
        items-center 
        w-full
        gap-x-4
        text-md
        font-medium
        hover:text-white
        transition
        text-neutral-400
        py-1
    `,active && "text-white")}>
        <Icon size={26}/>
        <div className="truncate w-full">{label}</div>
    </Link>
  )
}

export default SidebarItem