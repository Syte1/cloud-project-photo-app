function ImageCard({image}) {
    return (
        <div>
            <img src={`http://localhost:3001/images/${image}`} alt={image}></img>
        </div>
    )
}

export default ImageCard