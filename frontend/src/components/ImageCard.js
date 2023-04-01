
function ImageCard({image, description, onDelete, onClick}) {
    return (
        <div className="relative">
            <img
                className="object-contain h-48 w-96 cursor-pointer"
                src={image}
                alt={"pic"}
                onClick={() => onClick(image, description)}
            ></img>
        </div>
    )
}

export default ImageCard
