import { useState, useEffect } from "react";

// Toast (Notification)
import toast from "react-hot-toast";

// Components
import Icon from "../../../components/Icon";

// Services
import ticketService from "../../../api/services/ticketService";

// Icons
import plusIcon from "../../../assets/icons/outline/plus.svg";
import trashIcon from "../../../assets/icons/outline/trash.svg";
import filePlusIcon from "../../../assets/icons/outline/file-plus.svg";

const FileUploader = ({ ticketId, onFileUploaded, file }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

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
    if (!uploadedFile || !ticketId || isUploading || isDeleting) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    // Simulate upload progress animation
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 10;
      });
    }, 150);

    ticketService
      .uploadTicketFile(ticketId, formData)
      .then((res) => {
        if (!res.ok) throw new Error();

        // Complete progress animation
        clearInterval(progressInterval);
        setUploadProgress(100);

        setTimeout(() => {
          if (onFileUploaded) onFileUploaded(res.data);
          toast.success("Fayl muvaffaqiyatli yuklandi");
          removeFile();
        }, 500);
      })
      .catch((err) => {
        clearInterval(progressInterval);
        setUploadProgress(0);
        toast.error(err.message || "Fayl yuklashda xatolik yuz berdi");
      })
      .finally(() => {
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
        }, 500);
      });
  };

  const deleteFileFromServer = async () => {
    if (!file || isDeleting) return;

    setIsDeleting(true);

    ticketService
      .deleteTicketFile(file._id)
      .then((res) => {
        if (!res.ok) throw new Error();
        if (onFileUploaded) onFileUploaded(null);
        toast.success("Fayl muvaffaqiyatli o'chirildi");
      })
      .catch((err) => {
        toast.error(err.message || "Faylni o'chirishda xatolik yuz berdi");
      })
      .finally(() => setIsDeleting(false));
  };

  const removeFile = () => {
    setFilePreview(null);
    setUploadedFile(null);
    setUploadProgress(0);
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
      onChange={handleUploadFile}
      disabled={isUploading || isDeleting}
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
          <h3 className="font-medium text-lg">Fayl</h3>

          {/* Action buttons */}
          <div className="flex items-center gap-3.5">
            {/* Add another file */}
            <label
              title="Boshqa fayl yuklash"
              className={`${
                isDeleting
                  ? "cursor-not-allowed"
                  : "cursor-pointer hover:bg-neutral-100"
              } flex items-center justify-center size-12 bg-neutral-50 rounded-full transition-colors duration-200`}
            >
              <Icon src={plusIcon} alt="Fayl qo'shish" />
              {fileInput}
            </label>

            {/* Remove file */}
            <button
              disabled={isDeleting}
              title="Faylni o'chirish"
              onClick={deleteFileFromServer}
              className="flex items-center justify-center size-12 bg-red-50 rounded-full transition-colors duration-200 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-50"
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

          {/* Upload progress overlay */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-64">
                <div className="text-center mb-4">
                  <div className="text-lg font-medium mb-2">
                    Fayl yuklanmoqda...
                  </div>
                  <div className="text-sm text-gray-600">
                    {Math.round(uploadProgress)}%
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    style={{ width: `${uploadProgress}%` }}
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
                  />
                </div>

                {/* Animated dots */}
                <div className="flex justify-center space-x-1">
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3.5">
          {/* Upload file to server */}
          <button
            onClick={uploadFileToServer}
            disabled={isUploading || !ticketId}
            className="flex items-center justify-center h-12 px-5 bg-green-50 rounded-full text-green-600 transition-colors duration-200 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-50"
          >
            Faylni biriktirish
          </button>

          {/* Add another file */}
          <label
            title="Boshqa fayl yuklash"
            className={`${
              isDeleting || isUploading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-neutral-100"
            } flex items-center justify-center size-12 bg-neutral-50 rounded-full transition-colors duration-200`}
          >
            <Icon src={plusIcon} alt="Fayl qo'shish" />
            {fileInput}
          </label>

          {/* Remove file */}
          <button
            onClick={removeFile}
            disabled={isUploading || isDeleting}
            title="Faylni o'chirish"
            className="flex items-center justify-center size-12 bg-red-50 rounded-full transition-colors duration-200 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-50"
          >
            <Icon src={trashIcon} alt="Chiqitdon" />
          </button>
        </div>
      </div>
    );
  }
};

export default FileUploader;
