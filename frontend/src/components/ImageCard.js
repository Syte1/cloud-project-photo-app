function ImageCard({postID, img_path, description, onDelete, onClick}) {
    return (
        <div className="relative">
            <img
                className="w-full h-48 object-cover cursor-pointer"
                src={img_path}
                alt={"pic"}
                onClick={() => onClick(postID, description, img_path)}
            ></img>
        </div>
    )
}

export default ImageCard