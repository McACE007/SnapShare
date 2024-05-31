"use client"
import BlurPage from "@/components/global/BlurPage";
import Navbar from "@/components/navbar";
import { ReactNode } from "react"

type Props = {
  children: ReactNode;
}

export default function layout({ children }: Props) {
  return (
    <div className="h-screen w-full">
      <Navbar />
      <BlurPage>{children}</BlurPage>
    </div>
  )
}
