const Dot = ({
  size = 1,
  children,
  className,
  spacing = 10,
  color = "#d4d4d4",
  style = {
    backgroundColor: "white",
  },
}) => {
  return (
    <div
      style={{
        ...style,
        backgroundSize: `calc(${spacing} * ${size}px) calc(${spacing} * ${size}px)`,
        backgroundImage: `radial-gradient(${color} ${size}px, transparent ${size}px)`,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Dot;
