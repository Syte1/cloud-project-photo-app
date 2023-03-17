import ImageCard from "./ImageCard"

function ImageGallery({images}) {
    return (
        images.map((image) => {
            return <ImageCard imagePath={image} />
        }
        )
    )
}

export default ImageGallery