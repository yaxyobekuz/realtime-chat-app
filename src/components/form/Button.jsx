const Button = ({
  onClick,
  children,
  className = "",
  type = "button",
  variant = "primary",
  ...props
}) => {
  const variants = {
    neutral: "bg-neutral-100 hover:bg-neutral-200 disabled:!bg-neutral-100",
    primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:!bg-blue-500",
    danger: "bg-red-500 text-white hover:bg-red-600 disabled:!bg-red-500",
  };

  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      children={children}
      className={`flex items-center justify-center h-10 px-5 rounded-lg ${variants[variant]} ${className} transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed`}
    />
  );
};

export default Button;
