import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"
import { Copy, MousePointerClick } from "lucide-react"
import { Button } from "../ui/button"
import { useImage } from "@/hooks/useImage"
import { toast } from "../ui/use-toast"
import { nanoid } from "nanoid"

export default function BlurImage({ image }: { image: Image }) {
  const [isLoading, setLoading] = useState(true)
  const [copyId, setCopyId] = useState("");
  const { deleteImage } = useImage();

  async function handleCopyLink() {
    await navigator.clipboard.writeText(`${image.url}`)
    setCopyId(nanoid())
    toast({ title: "Copied the link" })
  }

  return (
    <div className="group">
      <div className="aspect-w-1 aspect-h-1 w-full h-full overflow-hidden rounded-lg bg-background">
        <Image
          alt=""
          src={image.url}
          layout="fill"
          objectFit="cover"
          className={cn(
            "duration-700 ease-in-out group-hover:opacity-75",
            isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0"
          )}
          onLoadingComplete={() => setLoading(false)}
        />
        <div className="flex items-end bg-background/40 group-hover:bg-background/70 transition-all h-fit p-4 mt-auto text-primary-foreground justify-between">
          <div className="bg-primary p-1 rounded-lg flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-2">
              <MousePointerClick />
              <span className="text-xl font-semibold">{image.noOfClicks || 0}</span>
            </div>
            <div className="text-sm font-semibold">total clicks</div>
          </div>
          <Button type="button" variant={"default"} className="gap-2" onClick={handleCopyLink}>
            <Copy /> {copyId ? "Copied Link" : "Copy Link"}
          </Button>
          <Button type="button" variant={"destructive"} onClick={() => deleteImage(image.imageId)}>Delete</Button>
        </div>
      </div>
    </div>
  );
}
