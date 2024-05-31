"use client"
import { toast } from "@/components/ui/use-toast";
import { ImageContext } from "@/contexts/ImageContext";
import { useAuth } from "@/hooks/useAuth";
import { deleteImageById, getAllImagesByUserId, uploadImageToFBS } from "@/lib/firebase/queries";
import { ReactNode, useEffect, useState, useTransition } from "react"


type Props = {
  children: ReactNode;
}

export default function ImageProvider({ children }: Props) {
  const { user } = useAuth()
  const [images, setImages] = useState<Image[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, startLoad] = useTransition()

  useEffect(() => {
    async function fetchAllImage() {
      if (user) {
        const response = await getAllImagesByUserId(user.uid)
        setImages(response)
      }
    }
    fetchAllImage()
  }, [user])

  async function uploadImage(images: File[]) {
    if (!user) return
    try {
      setIsUploading(true)
      images.map(async (image) => {
        await uploadImageToFBS(image, user.uid)
      })
      setTimeout(async () => {
        const response = await getAllImagesByUserId(user.uid)
        setImages(response)
        setIsUploading(false)
        toast({ title: "Images Uploaded Successfully" })
      }, 1000)
    } catch (e) {
      toast({ title: "Could not upload image" })
    }
  }

  async function deleteImage(imageId: string) {
    if (!user) return
    try {
      startLoad(async () => {
        await deleteImageById(imageId)
        const response = await getAllImagesByUserId(user.uid)
        setImages(response)
        toast({ title: "Image Deleted Successfully" })
      })
    } catch (e) {

      toast({ title: "Could not deleted image" })
    }
  }

  return (
    <ImageContext.Provider value={{ isUploading, uploadImage, deleteImage, images, isLoading }}>
      {children}
    </ImageContext.Provider>
  )
}
