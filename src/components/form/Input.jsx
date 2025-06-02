const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  className = "",
  placeholder = "",
  required = false,
  disabled = false,
  variant = "white",
}) => {
  const variantClasses = {
    gray: "bg-gray-50 border-gray-300 focus:border-blue-500",
  };

  const RenderInput = (() => {
    if (type === "textarea") {
      return (
        <textarea
          id={name}
          name={name}
          value={value}
          required={required}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          className={`${variantClasses[variant]}`}
        />
      );
    }

    return (
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        className={`${variantClasses[variant]}`}
      />
    );
  })();

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={name} className="font-medium text-gray-700">
          {label} {required && <span className="text-blue-500">*</span>}
        </label>
      )}

      {RenderInput}
    </div>
  );
};

export default Input;
