import ImageCard from "./ImageCard"

function ImageGallery({images}) {
    return (
        images.map((image, index) => {
            return (
            <div style={{display: "flex"}}>
                <ImageCard key={Math.floor(Math.random() * 9999).toString() } image={image} />
            </div>
            )
        })
    )
}

export default ImageGallery