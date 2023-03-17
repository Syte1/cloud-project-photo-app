import { useState } from 'react'
import UploadBar from './components/UploadBar'
import ImageGallery from './components/ImageGallery'
import axios from 'axios'

function App() {

    const [images, setImages] = useState([])

    const handleSubmit = (image1) => {
        postImage(image1)
        
    }
    const postImage = async (image2) => {
        
        const formData = new FormData()
        formData.append('image', image2)
        const response = await axios.post('http://localhost:3001/images', formData)
        setImages([response.data, ...images])
    }
    return (
        <div>
            <UploadBar onSubmit={handleSubmit} />
            <ImageGallery images={images}/>
        </div>
    )
}

export default App