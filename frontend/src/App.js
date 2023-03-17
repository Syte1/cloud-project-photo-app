import { useState } from 'react'
import UploadBar from './components/UploadBar'
import ImageGallery from './components/ImageGallery'
import axios from 'axios'

function App() {

    const [images, setImages] = useState([])

    const handleSubmit = (image) => {
        postImage(image)
    }
    const postImage = async (image) => {
        const formData = new FormData()
        formData.append('image', image)
        const response = await axios.post('http://localhost:3001/images', formData)
        console.log(response)
        setImages([...images, response.data])
    }
    return (
        <div>
            <UploadBar onSubmit={handleSubmit} />
            <ImageGallery images={images}/>
        </div>
    )
}

export default App