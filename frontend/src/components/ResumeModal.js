const ResumeModal = ({ file, onClose }) => {
	const handleBackdropClick = (event) => {
		// Check if the clicked element is the backdrop itself
		if (event.currentTarget === event.target) {
			onClose();
		}
	};
	return (
		<div
			className="modal-backdrop"
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 1000,
			}}
			onClick={handleBackdropClick}
		>
			<div
				className="modal-content"
				style={{
					maxHeight: "90vh",
					maxWidth: "90vw", // max width to restrict very large images
					width: "auto", // auto width to fit the content
					overflowY: "auto",
					backgroundColor: "white",
					padding: "20px",
					borderRadius: "10px",
					boxSizing: "border-box",
					display: "inline-block", // ensures the div fits content width
				}}
			>
				<img
					src={file}
					alt="Resume"
					style={{
						maxHeight: "80vh",
						maxWidth: "100%",
						height: "auto",
						width: "auto",
					}}
				/>
				<button
					onClick={onClose}
					style={{ marginTop: "10px", display: "block" }}
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default ResumeModal;
