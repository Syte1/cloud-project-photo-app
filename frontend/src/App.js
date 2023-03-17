import { useState } from 'react'
import UploadBar from './components/UploadBar'
import ImageGallery from './components/ImageGallery'

function App() {

    const [images, setImages] = useState([])

    const handleSubmit = (imagePath) => {
        setImages([...images, imagePath])
        console.log(images)
    }
    return (
        <div>
            <UploadBar onSubmit={handleSubmit} />
            <ImageGallery images={images}/>
        </div>
    )
}

export default App