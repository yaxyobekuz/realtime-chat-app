const Button = ({
  onClick,
  children,
  className = "",
  type = "button",
  variant = "primary",
}) => {
  const variants = {
    neutral: "bg-neutral-100 hover:bg-neutral-200",
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    danger: "bg-blue-500 text-white hover:bg-blue-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      children={children}
      className={`flex items-center justify-center h-10 px-5 rounded-lg ${variants[variant]} ${className} transition-colors duration-200`}
    />
  );
};

export default Button;
