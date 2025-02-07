import { useState, useEffect } from "react";
import UploadBar from "./components/UploadBar";
import ImageGallery from "./components/ImageGallery";
import ImageModal from "./components/ImageModal";
import { v4 as uuidv4 } from "uuid";
import UploadModal from "./components/UploadModal";
import ResumeModal from "./components/ResumeModal";
import resumeImage from "./resume/resume.png";
import "./css/App.css";

function App() {
	const IP = "belalk.xyz";
	const [selectedImage, setSelectedImage] = useState(null);
	const [selectedDescription, setSelectedDescription] = useState(null);
	const [selectedImgLink, setSelectedImageLink] = useState(null);
	const [images, setImages] = useState([]);
	const [showUploadModal, setShowUploadModal] = useState(false);
	const [showResumeModal, setShowResumeModal] = useState(false);

	useEffect(() => {
		// console.log(fetch(`http://${IP}:3001/posts/`))
		fetch(`https://${IP}:3001/posts/`)
			.then((response) => response.json())
			.then((data) => {
				setImages(data.Items.map((item) => item));
			});
	}, []);

	const handleLike = async (postID, increment = false) => {
		let newPut;
		if (increment) {
			newPut = {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
			};
		} else {
			newPut = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			};
		}
		const response = await fetch(
			`https://${IP}:3001/posts/${postID}/`,
			newPut
		);
		const data = await response.json();
		// console.log(data)
		return data.like_count;
	};

	const handleImageClick = (postID, description, img_path) => {
		setSelectedImage(postID);
		setSelectedDescription(description);
		setSelectedImageLink(img_path);
	};

	const handleUpload = async (image1, description, password) => {
		const imagePath = await postImage(image1);
		const postID = imagePath.split("/").pop().split(".")[0];
		const newImage = {
			postID: postID,
			description: description,
			img_path: imagePath,
			password: password,
			like_count: 0,
		};
		console.log(newImage.img_path);
		setImages([...images, newImage]);
		await postToDB(postID, imagePath, description, password);
	};

	const handleDelete = async (postID, enteredPassword) => {
		const isValid = await checkPassword(postID, enteredPassword);
		if (isValid) {
			deleteFromDB(postID, enteredPassword);
			setImages(images.filter((image) => image.postID !== postID));
		}
	};

	const checkPassword = async (postID, enteredPassword) => {
		const response = await fetch(`https://${IP}:3001/posts/${postID}`);
		const data = await response.json();
		const verified = await fetch(
			`https://${IP}:3001/verify/${enteredPassword}`
		);
		const result = await verified.json();
		return data.password === enteredPassword || result.verified;
	};

	const postImage = async (image2) => {
		const formData = new FormData();
		formData.append("image", image2);
		const requestOptions = {
			method: "POST",
			body: formData,
		};
		const response = await fetch(
			`https://${IP}:3001/images`,
			requestOptions
		);
		const data = await response.json();
		// await postToDB(data.imagePath);
		return data.imagePath;
	};

	const postToDB = async (randomID, imageLink, description, password) => {
		const newPost = {
			postID: randomID,
			description: description,
			img_path: imageLink,
			password: password,
			like_count: 0,
		};

		const formParams = new URLSearchParams();
		for (const key in newPost) {
			formParams.append(key, newPost[key]);
		}
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type":
					"application/x-www-form-urlencoded;charset=UTF-8",
			},
			body: formParams.toString(),
		};
		const response = await fetch(
			`https://${IP}:3001/posts/`,
			requestOptions
		);
		const data = await response.json();
		return data;
	};

	const deleteFromDB = async (postID, password) => {
		const requestOptions = {
			method: "DELETE",
			headers: {
				"Content-Type":
					"application/x-www-form-urlencoded;charset=UTF-8",
			},
		};
		await fetch(
			`https://${IP}:3001/posts/${postID}?password=${password}`,
			requestOptions
		);
	};

	return (
		<div className="bg-gradient-to-br from-gray-900 to-indigo-100 pt-0.5 gallery-background min-h-screen">
			<p className="text-center text-white m-3">
				Click on an image below or upload your own!
			</p>
			<div
				className="button-container"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					position: "relative",
				}}
			>
				<button
					className="px-4 py-2 bg-green-600 text-white rounded-md mt-4 mb-4"
					onClick={() => setShowUploadModal(true)}
				>
					Upload an Image!
				</button>

				{/* Position the "View Resume" button to the rightish side */}
				<button
					className="px-4 py-2 bg-purple-600 text-white rounded-md mt-4 mb-4"
					style={{ position: "absolute", right: "20%" }} // Adjust as needed
					onClick={() => setShowResumeModal(true)}
				>
					View Resume
				</button>
			</div>
			{showResumeModal && (
				<ResumeModal
					file={resumeImage}
					onClose={() => setShowResumeModal(false)}
				/>
			)}
			{showUploadModal && (
				<UploadModal
					onClose={() => setShowUploadModal(false)}
					onSubmit={handleUpload}
				/>
			)}
			{selectedImage && (
				<ImageModal
					imageID={selectedImage}
					description={selectedDescription}
					img_path={selectedImgLink}
					checkPassword={checkPassword}
					onClose={() => setSelectedImage(null)}
					onDelete={handleDelete}
					onLike={handleLike}
				/>
			)}
			<div className="flex flex-wrap">
				<ImageGallery
					images={images}
					onDelete={handleDelete}
					onClick={handleImageClick}
				/>
			</div>
		</div>
	);
}

export default App;
