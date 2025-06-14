import { useState, useCallback, useMemo } from "react";

// Data
import colors from "@/data/colors";

// Helpers
import { extractNumbers } from "@/utils/helpers";

// Hooks
import useImageViewer from "@/hooks/useImageViewer";

const UserPhoto = ({ url, user, className = "size-20 text-3xl" }) => {
  const { viewImage } = useImageViewer();
  const [hasError, setHasError] = useState(false);

  // Memoized values - avoid recalculation on every render
  const { imageName, colorCode, fallbackChar } = useMemo(
    () => ({
      imageName: `${user?.firstName} profil rasmi`,
      colorCode: extractNumbers(user?._id)?.[0] || "0",
      firstName: user?.firstName || user?.username || "Foydalanuvchi",
      fallbackChar: (user?.firstName || user?.username)?.[0] || "🗿",
    }),
    [user]
  );

  // Memoized callback to prevent unnecessary re-renders
  const handleImageError = useCallback(() => setHasError(true), []);

  const handleImageClick = useCallback(() => {
    viewImage({ url, alt: imageName });
  }, [viewImage, url, imageName]);

  // Early return for image display
  if (url && !hasError) {
    return (
      <img
        src={url}
        width={80}
        height={80}
        alt={imageName}
        onError={handleImageError}
        onClick={handleImageClick}
        className={`${className} shrink-0 bg-neutral-50 rounded-full object-cover cursor-pointer`}
      />
    );
  }

  // Fallback avatar
  return (
    <div
      className={`${className} ${colors[colorCode]} flex items-center justify-center shrink-0 bg-gradient-to-b rounded-full text-white cursor-pointer`}
    >
      {fallbackChar}
    </div>
  );
};

export default UserPhoto;
