const UploadBar = ( {onSubmit} ) => {

    const handleSubmit = (event) => {
        console.log(event.target.files[0])
        return onSubmit(event.target.files[0])
    }
    return (
        <input id="image-file" type="file" onChange={handleSubmit} />
    )
}

export default UploadBar