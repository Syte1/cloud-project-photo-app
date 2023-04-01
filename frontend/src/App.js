import { useState, useEffect } from 'react'
import UploadBar from './components/UploadBar'
import ImageGallery from './components/ImageGallery'
import ImageModal from "./components/ImageModal";

function App() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [images, setImages] = useState([])
    
    useEffect(() => {
        console.log(fetch('http://localhost:3001/posts/'))
        fetch('http://localhost:3001/posts/')
        .then(response => response.json())
        .then(data => {
            setImages(data.Items.map(item => item))})
    }, [])

    const handleImageClick = (image, description, password) => {
        setSelectedImage(image);
        setSelectedDescription(description);
    };
    const handleSubmit = async (image1, description, password) => {
        const imagePath = await postImage(image1);
        const newImage = {
            postID: imagePath.split('/').slice(-1)[0],
            description: description,
            img_path: imagePath,
            password: password,
            like_count: 0
        };
        setImages([...images, newImage]);
        await postToDB(imagePath, description, password);
    };

    const handleDelete = async (postID, enteredPassword) => {
        const isValid = await checkPassword(postID, enteredPassword);
        if (isValid) {
          deleteFromDB(postID, enteredPassword);
          setImages(images.filter(image => image.img_path.split('/').slice(-1)[0] !== postID));
        }
      };

    const checkPassword = async (postID, enteredPassword) => {
        const response = await fetch(`http://localhost:3001/posts/${postID}`);
        const data = await response.json();
        return data.password === enteredPassword;
    };

    const postImage = async (image2) => {
        const formData = new FormData();
        formData.append('image', image2);
        const requestOptions = {
            method: 'POST',
            body: formData
        };
        const response = await fetch('http://localhost:3001/images', requestOptions);
        const data = await response.json();
        await postToDB(data.imagePath);
        return data.imagePath;
    };
    
    const postToDB = async (imageLink, description, password) => {
        const splitLink = imageLink.split('/');
        const id = splitLink[splitLink.length - 1];
        const newPost = {
            postID: id,
            description: description,
            img_path: imageLink,
            password: password,
            like_count: 0
        };

        const formParams = new URLSearchParams();
        for (const key in newPost) {
            formParams.append(key, newPost[key]);
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formParams.toString()
        }
        await fetch('http://localhost:3001/posts/', requestOptions);
    };

    const deleteFromDB = async (postID, password) => {
        const requestOptions = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
        };
        const response = await fetch(`http://localhost:3001/posts/${postID}?password=${password}`, requestOptions);
        console.log('Delete response:', response);
      };

    return (
        <div className="bg-gradient-to-br from-gray-900 to-indigo-100 h-screen">
            <UploadBar onSubmit={handleSubmit} />
            {selectedImage && (
                <ImageModal
                image={selectedImage}
                description={selectedDescription}
                checkPassword={checkPassword}
                onClose={() => setSelectedImage(null)}
                onDelete={handleDelete}
              />
)}
            <div className="flex flex-wrap">
                <ImageGallery images={images} onDelete={handleDelete} onClick={handleImageClick} />
            </div>
        </div>
    )
}

export default App
