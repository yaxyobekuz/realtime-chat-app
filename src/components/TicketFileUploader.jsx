import { useState, useEffect } from "react";

// Components
import Icon from "./Icon";

// Services
import ticketService from "../api/services/ticketService";

// Icons
import plusIcon from "../assets/icons/outline/plus.svg";
import trashIcon from "../assets/icons/outline/trash.svg";
import filePlusIcon from "../assets/icons/outline/file-plus.svg";

const TicketFileUploader = ({ ticketId, onFileUploaded, onError, file }) => {
  const [filePreview, setFilePreview] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadFile = (e) => {
    const selectedFile = e.target.files[0];
    setUploadedFile(selectedFile);

    // Create file preview URL
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        const fileUrl = URL.createObjectURL(selectedFile);
        setFilePreview(fileUrl);
      }
    }
  };

  const uploadFileToServer = async () => {
    if (!uploadedFile || !ticketId || isUploading) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const response = await ticketService.uploadTicketFile(ticketId, formData);

      if (response.ok) {
        // Clear current file after successful upload
        removeFile();

        // Call success callback
        if (onFileUploaded) onFileUploaded(response.data);
      } else {
        throw new Error(response.message || "Fayl yuklashda xatolik");
      }
    } catch (error) {
      console.error("Fayl yuklash xatolik:", error);

      // Call error callback
      if (onError) {
        onError(error.message || "Fayl yuklashda xatolik yuz berdi");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFilePreview(null);
    setUploadedFile(null);
    if (filePreview) URL.revokeObjectURL(filePreview);
  };

  // Cleanup object URL when component unmounts
  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [filePreview]);

  // File input component
  const fileInput = (
    <input
      type="file"
      accept=".pdf"
      className="hidden"
      disabled={isUploading}
      onChange={handleUploadFile}
    />
  );

  // File preview
  if (file && !uploadedFile) {
    return (
      <div>
        {/* File preview */}
        <div className="relative mb-3">
          <iframe
            width={553}
            height={384}
            allowFullScreen
            src={file.fileUrl}
            title="Yuklangan fayl"
            className="w-full h-96 bg-gray-100 rounded-xl"
          />

          <div className="absolute bottom-5 left-5 bg-black/70 px-2.5 py-1 rounded-full text-white text-sm">
            {file?.originalName}
          </div>
        </div>

        <div className="flex items-cente justify-between">
          <h3 className="font-medium text-lg">Chipta</h3>
          {/* Action buttons */}
          <div className="flex items-center gap-3.5">
            {/* Add another file */}
            <label
              title="Boshqa fayl yuklash"
              className="flex items-center justify-center size-12 bg-neutral-50 rounded-full transition-colors duration-200 cursor-pointer hover:bg-neutral-100"
            >
              <Icon src={plusIcon} alt="Fayl qo'shish" />
              {fileInput}
            </label>

            {/* Remove file */}
            <button
              disabled={true}
              title="Faylni o'chirish"
              className="flex items-center justify-center size-12 bg-red-50 rounded-full transition-colors duration-200 hover:bg-red-100 disabled:opacity-50"
            >
              <Icon src={trashIcon} alt="Chiqitdon" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Upload file initial state
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
  if (uploadedFile) {
    return (
      <div>
        {/* File preview */}
        <div className="relative mb-3">
          <iframe
            width={553}
            height={384}
            allowFullScreen
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
          {/* Upload file to server */}
          <button
            onClick={uploadFileToServer}
            disabled={isUploading || !ticketId}
            className="flex items-center justify-center h-12 px-5 bg-green-50 rounded-full text-green-600 transition-colors duration-200 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? "Yuklanmoqda..." : "Faylni biriktirish"}
          </button>

          {/* Add another file */}
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
            disabled={isUploading}
            title="Faylni o'chirish"
            className="flex items-center justify-center size-12 bg-red-50 rounded-full transition-colors duration-200 hover:bg-red-100 disabled:opacity-50"
          >
            <Icon src={trashIcon} alt="Chiqitdon" />
          </button>
        </div>
      </div>
    );
  }
};

export default TicketFileUploader;
