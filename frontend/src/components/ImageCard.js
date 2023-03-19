function ImageCard({image}) {
    return (

            <img className="object-contain h-48 w-96" src={`http://54.214.153.1:3001/images/${image}`} alt={image}></img>
     
    )
}

export default ImageCard
