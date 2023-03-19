function ImageCard({image}) {
    return (

            <img className="object-contain h-48 w-96" src={`http://belalk.xyz/images/${image}`} alt={image}></img>
     
    )
}

export default ImageCard