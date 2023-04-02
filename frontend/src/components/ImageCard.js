
function ImageCard({postID, img_path, description, onDelete, onClick}) {
    return (
        <div className="relative">
            <img
                className="object-contain h-48 w-96 cursor-pointer"
                src={img_path}
                alt={"pic"}
                onClick={() => onClick(postID, description, img_path)}
            ></img>
        </div>
    )
}

export default ImageCard
