import * as Dialog from '@radix-ui/react-dialog'
import {IoMdClose} from 'react-icons/io'

interface ModelProps{
    isOpen: boolean
    onChange: (open:boolean) => void
    title:string
    desc:string
    children:React.ReactNode
}

const Model:React.FC<ModelProps> = ({
    isOpen,
    onChange,
    title,
    desc,
    children
}) => {
  return (
    <Dialog.Root
    open={isOpen}
    defaultOpen={isOpen}
    onOpenChange={onChange}
    >
        <Dialog.Portal>
            <Dialog.Overlay
                className='
                bg-neutral-900/90
                backdrop-blur-sm
                fixed
                inset-0
                '
             />
             <Dialog.Content
             className='
             fixed
             rounded
             drop-shadow-md
             border
             border-neutral-700
             top-[50%]
             left-[50%]
             max-h-full
             h-full
             w-full
             md:h-auto
             md:max-h-[85vh]
             md:w-[90vw]
             md:max-w-[450px]
             translate-x-[-50%]
             translate-y-[-50%]
             bg-neutral-800
             p-[25px]
             focus:outline-none
             '
             >
                <Dialog.Title
                className='
                text-xl
                text-center
                font-bold
                mb-4
                '
                >
                  {title}
                </Dialog.Title>
                <Dialog.Description
                className='
                mb-5
                text-sm
                leading-normal
                text-center
                '
                >
                  {desc}
                </Dialog.Description>
                <div>
                  {children}
                </div>
                <Dialog.Close>
                  <button className='
                    text-neutral-400
                    hover:text-white
                    absolute
                    top-[10px]
                    right-[10px]
                    inline-flex
                    h-[25px]
                    w-[25px]
                    focus:outline-none
                    appearance-none
                    items-center
                    justify-center
                    rounded-full       
                  '>
                    <IoMdClose />
                  </button>
                </Dialog.Close>
             </Dialog.Content>
        </Dialog.Portal>
        
    </Dialog.Root>
  )
}

export default Model