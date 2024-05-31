import { ImageContext } from "@/contexts/ImageContext";
import { useContext } from "react";

export function useImage() {
  return useContext(ImageContext)
}
