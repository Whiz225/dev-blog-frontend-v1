function Form({ type = "regular", children, className = "", ...props }) {
  const baseClasses = "overflow-hidden text-sm";

  const variantClasses = {
    regular: "p-6 md:p-8 bg-white border border-gray-200 rounded-lg",
    modal: "w-[80rem]",
  };

  const classes = `${baseClasses} ${variantClasses[type]} ${className}`;

  return (
    <form className={classes} {...props}>
      {children}
    </form>
  );
}

export default Form;
