import ImageCard from "./ImageCard"

function ImageGallery({images, onDelete, onClick}) {
    return (
        images.map((item, index) => {
            return (
                <div className="p-2" key={item.postID}>
                    <ImageCard
                        key={item.postID}
                        image={item.img_path}
                        description={item.description}
                        onDelete={() => onDelete(item.postID, item.password)}
                        onClick={() => onClick(item.img_path, item.description)}
                    />
                </div>
            )
        })
    )
}

export default ImageGallery