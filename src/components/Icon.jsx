const Icon = ({
  src,
  style,
  size = 24,
  alt = "icon",
  className = "",
  ...restProps
}) => {
  // Combine size-based className with custom className
  const sizeClass = `w-[${size}px] h-[${size}px]`;
  const finalClassName = className ? `${sizeClass} ${className}` : sizeClass;

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={style}
      {...restProps}
      className={finalClassName}
    />
  );
};

export default Icon;
