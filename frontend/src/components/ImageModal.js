import { HiX } from "react-icons/hi";
import { useState, useEffect } from 'react';

function ImageModal({ imageID, description, img_path, onClose, onDelete, checkPassword, onLike }) {
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);
    const [likes, setLikes] = useState(0);
    const [showPasswordField, setShowPasswordField] = useState(false);
    // useEffect(() => {
    //     handleLike()
    // }, [])

    useEffect(() => {
        const fetchLikes = async () => {
            const postID = imageID;
            const likeCount = await onLike(postID, false);
            setLikes(likeCount);
        };
        fetchLikes()        
    }, [imageID, onLike]);

    const handleLike = async () => {
        
        const postID = imageID;
        const newLikeCount = await onLike(postID, true);
        setLikes(newLikeCount);
    };

    const handleDelete = async (postID, password) => {
        const isValid = await checkPassword(postID, password);
        setPasswordValid(isValid);
          
        if (isValid) {
            onDelete(postID, password);
            onClose();
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const openInNewTab = () => {
        const newWindow = window.open(img_path, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
      };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50"
        onClick={handleOverlayClick}>
        <div className="bg-gradient-to-br from-gray-300 to-gray-400 p-4 rounded-lg shadow-lg max-w-screen-xl max-h-screen overflow-y-auto">
                <button className="absolute top-2 right-2" onClick={onClose}>
                    <HiX className="h-6 w-6 text-gray-700" />
                </button>
                <img
                    className="w-full h-auto mb-4 max-h-[calc(100vh-20rem)] cursor-pointer border-4 border-transparent hover:border-blue-400 transition-all duration-200 ease-in-out"
                    src={img_path}
                    alt="Selected"
                    onClick={openInNewTab}
                />
                <div className="text-center -mt-5">
                <p className="text-xs text-gray-500 cursor-pointer inline-block" onClick={openInNewTab}>
                    Click for full resolution
                </p>
                </div>
                <p className="text-gray-700 mb-4">{description}</p>
                <div className="flex justify-between items-center mt-4">
                <button className="mt-4 ml-4 px-10 py-2 bg-blue-600 text-white rounded-md" onClick={handleLike}> Like ({likes}) </button>
                    {showPasswordField ? (
                        <div className="flex items-center">
                            <input
                                type="password"
                                placeholder="Enter password"
                                className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md"
                                value={enteredPassword}
                                onChange={(e) => setEnteredPassword(e.target.value)}
                                autoComplete="new-password"
                            />
                            <button
                                className={`ml-4 mt-4 px-4 py-2 bg-red-600 text-white rounded-md ${
                                    !passwordValid ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                onClick={() => handleDelete(imageID, enteredPassword)}>
                                Delete
                            </button>
                        </div>
                    ) : (
                        <button
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
                            onClick={() => setShowPasswordField(true)}
                        >
                            Delete
                        </button>
                    )}

            </div>
                            {!passwordValid && (
                <p className="text-red-600 mt-2">Incorrect password. Please try again.</p>
                
            )}
            </div>
        </div>
    );
}

export default ImageModal;