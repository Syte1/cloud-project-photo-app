import ImageCard from "./ImageCard"

function ImageGallery({images, onDelete, onClick}) {
    return (
        images.map((item, index) => {
            console.log(item)
            return (
                <div className="p-2" key={item.postID}>
                    <ImageCard
                        key={item.postID}
                        postID={item.postID}
                        img_path={item.img_path}
                        description={item.description}
                        onDelete={() => onDelete(item.postID, item.password)}
                        onClick={() => onClick(item.postID, item.description, item.img_path)}
                    />
                </div>
            )
        })
    )
}

export default ImageGallery