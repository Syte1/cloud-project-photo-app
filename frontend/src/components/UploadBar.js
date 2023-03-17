const UploadBar = ( {onSubmit} ) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(event.target.files[0])
    }
    return <input type="file" onChange={handleSubmit}/>
}

export default UploadBar