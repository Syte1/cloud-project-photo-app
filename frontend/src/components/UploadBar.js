import React, { useState } from "react";

const UploadBar = ({ onSubmit }) => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [description, setDescription] = useState("");
	const [password, setPassword] = useState("");
	const [isHovered, setIsHovered] = useState(false);

	const inputFileStyle = {
		transition: "transform 0.5s",
		transform: isHovered ? "scale(1.05)" : "scale(1)",
	};

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (selectedFile && description && password) {
			onSubmit(selectedFile, description, password);
			setSelectedFile(null);
			setDescription("");
			setPassword("");
		}
	};

	return (
		<form className="flex items-center space-x-6" onSubmit={handleSubmit}>
			<div className="shrink-0">
				<img
					className="h-16 w-16 object-cover rounded-full"
					src="https://cdn.discordapp.com/avatars/122177431070179329/f87441cd490bc422dca578bfbf69da6f.webp?size=240"
					alt="Current profile photo"
				/>
			</div>
			<label className="block">
				<input
					type="file"
					className="block w-full text-sm text-violet-700
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
					style={inputFileStyle}
					onChange={handleFileChange}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				/>
			</label>
			<input
				type="text"
				placeholder="Describe your image"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				className="px-3 py-2 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
			/>
			<input
				type="password"
				placeholder="Delete password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="px-3 py-2 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
			/>
			<button className="ml-2 bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700">
				Upload
			</button>
		</form>
	);
};

export default UploadBar;
