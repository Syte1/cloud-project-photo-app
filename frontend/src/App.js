import { useState, useEffect } from 'react'
import UploadBar from './components/UploadBar'
import ImageGallery from './components/ImageGallery'
import TestImages from './components/TestImages';

function App() {
    const [images, setImages] = useState([])

    const handleSubmit = async (image1) => {
        postImage(image1)
    }

    useEffect(() => {
        const requestOptions = {
            method: 'GET'
        }
        fetch('http://localhost:3001/images/fetch')
            .then(response => response.json())
            .then(data => {setImages(data.files.slice(1))})
    }, [])

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
        <div className="bg-gradient-to-br from-gray-900 to-indigo-100 h-screen">
            <UploadBar onSubmit={handleSubmit} />
            <div className="flex flex-wrap">
                <ImageGallery images={images}/>
                <TestImages />
            </div>
        </div>
    )
}

export default App
