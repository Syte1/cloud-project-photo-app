function ImageCard({image}) {
    return (

            <img className="object-contain h-48 w-96" src={`http://localhost:3001/images/${image}`} alt={image}></img>
     
    )
}

export default ImageCard