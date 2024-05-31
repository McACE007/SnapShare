import BlurImage from "./ImageItem";

export default function Gallery({ images }: { images: Image[] }) {
  return (
    <div className="p-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((image) => (
          <BlurImage key={image.imageId} image={image} />
        ))}
      </div>
    </div>
  )
}
