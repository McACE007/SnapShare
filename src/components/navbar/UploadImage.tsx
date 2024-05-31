import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import Dropzone from 'react-dropzone'
import { useImage } from "@/hooks/useImage";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export default function UploadButton() {
  const { uploadImage } = useImage()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <div className="flex justify-center items-center size-[38px] rounded-lg md:w-[180px] md:h-[39px] md:space-x-[15px]">
            <Upload size={18} />
            <span className="font-semibold text-[14px] hidden md:block font-inter">Upload a Image</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className='overflow-auto h-fitbg-card flex flex-col gap-10'>
        <DialogHeader className='pt-8 text-left'>
          <DialogTitle className='text-2xl font-bold'>Upload a image</DialogTitle>
          <DialogDescription>Upload a image to the website and share it with your loved ones.</DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <div className="border border-primary border-dashed p-10 h-[300px] flex items-center justify-center hover:bg-primary transition-all group">
            <Dropzone onDrop={async (acceptedFiles) => await uploadImage(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="size-full flex items-center justify-center">
                  <section className="group-hover:text-primary-foreground group-hover:font-bold group-hover:transition-all">
                    <input {...getInputProps()} type="image" />
                    <p>Drag and Drop a images or Click to open File Explorer</p>
                  </section>
                </div>
              )}
            </Dropzone>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog >
  )
}
