import { createContext } from "react";

type ContextType = {
  uploadImage: (images: File[]) => Promise<void>;
  deleteImage: (imageId: string) => Promise<void>;
  isUploading: boolean;
  isLoading: boolean;
  images: Image[];
}

export const ImageContext = createContext({
  uploadImage: (images: File[]) => { },
  deleteImage: (imageId: string) => { },
  isUploading: false,
  isLoading: false,
  images: [] as Image[],
} as ContextType)
