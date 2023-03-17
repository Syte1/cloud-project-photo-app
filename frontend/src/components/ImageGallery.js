import ImageCard from "./ImageCard"

function ImageGallery({images}) {
    return (
        images.map((image) => {
            return <ImageCard key={image.name + image.size} image={image} />
        }
        )
    )
}

export default ImageGallery