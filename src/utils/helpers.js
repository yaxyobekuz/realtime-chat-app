// Format date
const formatDate = (input) => {
  if (!input) return null;

  const date = new Date(input);

  const year = date.getFullYear();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${day}/${month}/${year}`;
};

// Format time
const formatTime = (input) => {
  if (!input) return null;

  const date = new Date(input);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

// Get message bubble border radius
const getBubbleBorderRadius = (isAdmin, isLast, isFirst, isPrev, isNext) => {
  let borderRadius = { sm: "rounded-xl ", md: "rounded-[21px] " };

  // Admin
  if (isAdmin) {
    if (isPrev && isNext) {
      borderRadius.md += "rounded-r-lg";
      borderRadius.sm += "rounded-r";
    } else if (isPrev && !isNext) {
      borderRadius.md += "rounded-tr-lg";
      borderRadius.sm += "rounded-tr";
    } else if (!isPrev && isNext) {
      borderRadius.md += "rounded-br-lg";
      borderRadius.sm += "rounded-br";
    }
  }

  // User
  else {
    if (!isPrev && !isNext && !isLast && !isFirst) {
      borderRadius.md += "rounded-l-lg";
      borderRadius.sm += "rounded-l";
    } else if (!isPrev && !isFirst) {
      borderRadius.md += "rounded-tl-lg";
      borderRadius.sm += "rounded-tl";
    } else if (!isNext && !isLast) {
      borderRadius.md += "rounded-bl-lg";
      borderRadius.sm += "rounded-bl";
    }
  }

  return borderRadius;
};

// Format api request's error message
const formatErrorMessage = (error) => {
  const formattedError = { ok: false, message: null };

  if (error.response && error.response.data.message) {
    formattedError.message = error.response.data.message;
  } else {
    formattedError.message = "Noma'lum xatolik yuz berdi";
  }

  return formattedError;
};

export { getBubbleBorderRadius, formatTime, formatDate, formatErrorMessage };
