"use client"
import LoadingPage from "@/components/global/LoadingPage";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function Home() {
  const { user, isMounted } = useAuth()

  if (!isMounted) return <LoadingPage />

  if (!user) return redirect('/sign-in')

  return redirect('/dashboard')
}
