import ImageCard from "./ImageCard"

function ImageGallery({images}) {
    return (
        images.map((image, index) => {
            return (
                <div className="p-2">
                    <ImageCard key={Math.floor(Math.random() * 9999).toString() } image={image} />
                </div>
            )
        })
    )
}

export default ImageGallery