const UploadBar = ( {onSubmit} ) => {
    const handleSubmit = (event) => {
        return onSubmit(event.target.value)
    }
    return (
        <input id="image-file" type="file" onChange={handleSubmit} />
    )
}

export default UploadBar