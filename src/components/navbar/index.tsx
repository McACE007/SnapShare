"use client"
import { cn } from "@/lib/utils"
import { ModeToggle } from "../global/ModeToggle"
import { Button } from "../ui/button"
import { useAuth } from "@/hooks/useAuth"
import UploadButton from "./UploadImage"

type Props = {

}

export default function Navbar({ }: Props) {
  const { logOut } = useAuth()

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={cn('fixed z-[20] left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex gap-4 items-center border-b-[1px] ')}>
      <UploadButton />
      <div className="flex items-center gap-2 ml-auto">
        <ModeToggle />
        <Button onClick={handleLogOut}>Log Out</Button>
      </div>
    </div>
  )
}
