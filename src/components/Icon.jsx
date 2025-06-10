const Icon = ({
  src,
  style,
  size = 24,
  alt = "icon",
  className = "size-6",
  ...restProps
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={style}
      {...restProps}
      className={className}
    />
  );
};

export default Icon;
