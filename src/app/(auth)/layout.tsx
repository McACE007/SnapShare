import { ReactNode } from "react"

type Props = {
  children: ReactNode;
}

export default function layout({ children }: Props) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {children}
    </div>
  )
}
