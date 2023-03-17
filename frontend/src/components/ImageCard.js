function ImageCard({image}) {
    const filename = "./images/" + image
    console.log(filename)
    return (
        <div>
            <img src={filename} alt="s"></img>
        </div>
    )
}

export default ImageCard