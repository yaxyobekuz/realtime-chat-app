import { useState, useEffect } from "react";

// Components
import Icon from "./Icon";

// Icons
import plusIcon from "../assets/icons/outline/plus.svg";
import trashIcon from "../assets/icons/outline/trash.svg";
import filePlusIcon from "../assets/icons/outline/file-plus.svg";

const TicketFileUploader = ({ file }) => {
  const [filePreview, setFilePreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUploadFile = (e) => {
    const selectedFile = e.target.files[0];
    setUploadedFile(selectedFile);

    // Create file preview URL
    if (selectedFile && selectedFile.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(selectedFile);
      setFilePreview(fileUrl);
    }
  };

  const removeFile = () => {
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }
    setUploadedFile(null);
    setFilePreview(null);
  };

  // Cleanup object URL when component unmounts
  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [filePreview]);

  //   File input
  const fileInput = (
    <input
      type="file"
      accept=".pdf"
      className="hidden"
      onChange={handleUploadFile}
    />
  );

  // File input
  if (!uploadedFile) {
    return (
      <label className="flex items-center justify-center w-full h-96 bg-blue-500 rounded-xl transition-colors duration-200 hover:bg-blue-600 cursor-pointer">
        <div className="flex flex-col items-center">
          <Icon
            size={80}
            src={filePlusIcon}
            alt="Fayl qo'shish"
            className="size-20"
          />

          <span className="text-white text-lg font-medium mt-2">
            Fayl yuklash
          </span>

          {fileInput}
        </div>
      </label>
    );
  }

  // Uploaded file preview
  if (uploadedFile && filePreview) {
    return (
      <div className="space-y-3.5">
        {/* File preview */}
        <div className="relative">
          <iframe
            width={553}
            height={384}
            src={filePreview}
            title="Yuklangan fayl"
            className="w-full h-96 bg-gray-100 rounded-xl"
          />

          <div className="absolute bottom-5 left-5 bg-black/70 px-2.5 py-1 rounded-full text-white text-sm">
            {uploadedFile?.name}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3.5">
          {/* Upload file */}
          <button className="flex items-center justify-center h-12 px-5 bg-green-50 rounded-full text-green-600 transition-colors duration-200 hover:bg-green-100">
            Faylni biriktirsh
          </button>

          {/* Add file */}
          <label
            title="Boshqa fayl yuklash"
            className="flex items-center justify-center size-12 bg-neutral-50 rounded-full transition-colors duration-200 cursor-pointer hover:bg-neutral-100"
          >
            <Icon src={plusIcon} alt="Fayl qo'shish" />
            {fileInput}
          </label>

          {/* Remove file */}
          <button
            onClick={removeFile}
            title="Faylni o'chirish"
            className="flex items-center justify-center size-12 bg-red-50 rounded-full transition-colors duration-200 hover:bg-red-100"
          >
            <Icon src={trashIcon} alt="Chiqitdon" />
          </button>
        </div>
      </div>
    );
  }
};

export default TicketFileUploader;
