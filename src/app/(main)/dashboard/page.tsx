"use client"
import Gallery from "@/components/global/Gallery";
import LoadingPage from "@/components/global/LoadingPage";
import { useAuth } from "@/hooks/useAuth";
import { useImage } from "@/hooks/useImage";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {}

export default function Page({ }: Props) {
  const { user, isMounted, } = useAuth()
  const { images, isLoading, isUploading } = useImage()
  const router = useRouter()

  useEffect(() => {
    if (images) {
      router.refresh();
    }
  }, [images, router])

  useEffect(() => {
    if (isMounted && !user) {
      router.push('/sign-in');
    }
  }, [isMounted, user, router]);

  if (!isMounted) return <LoadingPage />

  if (isUploading) return <LoadingPage />

  if (isLoading) return <LoadingPage />

  return (
    <div className="h-full w-full">
      <Gallery images={images} />
    </div>
  )
}
