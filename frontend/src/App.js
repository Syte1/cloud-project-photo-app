import { useState } from 'react'
import UploadBar from './components/UploadBar'
import ImageGallery from './components/ImageGallery'

function App() {

    const [images, setImages] = useState([])

    const handleSubmit = async (image1) => {
        postImage(image1)
        
    }
    const postImage = (image2) => {
        const formData = new FormData()
        formData.append('image', image2)
        const requestOptions = {
            method: 'POST',
            body: formData
        }
        fetch('http://localhost:3001/images', requestOptions)
            .then(response => response.json())
            .then(data=> {
                console.log(data.filename)
                setImages([...images, data.filename])
            })
    }
    return (
        <div>
            <UploadBar onSubmit={handleSubmit} />
            <ImageGallery images={images}/>
        </div>
    )
}

export default App