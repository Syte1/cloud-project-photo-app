import { useState } from "react";
import { HiX } from "react-icons/hi";
import "../css/UploadModal.css";

function UploadModal({ onClose, onSubmit }) {
  const [selectedFile, setSelectedFile] = useState();
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (selectedFile && description && password) {
      onSubmit(selectedFile, description, password);
      setSelectedFile(null);
      setDescription("");
      setPassword("");
      onClose();
    }
  };

  const isDisabled = !selectedFile || !description || !password;
  const submitClass = isDisabled ? "bg-slate-400" : "bg-blue-600";
  const errorClass = "border-x-8 border-red-500";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
    <div
      className="fixed inset-0 bg-black opacity-50"
      onClick={onClose}>

    </div>
      <div className="upload-modal">
        <button className="absolute top-2 right-2" onClick={onClose}>
          <HiX className="h-6 w-6 text-gray-700" />
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label
            htmlFor="file-input"
            className="w-full max-w-xs mx-auto flex items-center justify-center px-4 py-2 border bg-blue-50 border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 choose-file-btn"
          >
            <span className="text-sm">Choose file</span>
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          {selectedFile && (
            <div>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected file"
                className="w-full h-auto mb-4 max-h-[calc(100vh-40rem)]"
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-3 py-2 border ${submitted && !description ? errorClass : "border-gray-300"} rounded-md`}
              />
              <input
                type="password"
                placeholder="Enter a password for deleting this image"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2 border ${submitted && !password ? errorClass : "border-gray-300"} rounded-md mt-2`}
              />
              <button
                type="submit"
                className={`px-4 py-2 text-white rounded-md mt-4 upload-file-btn ${submitClass}`}
              >
                Upload
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default UploadModal;
