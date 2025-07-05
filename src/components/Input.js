function Input({ className = "", ...props }) {
  return (
    <input
      className={`
        border border-[var(--color-grey-300)] bg-[var(--color-grey-0)] 
        rounded-[var(--border-radius-sm)] py-[0.8rem] px-[1.2rem] 
        shadow-[var(--shadow-sm)] ${className}
      `}
      {...props}
    />
  );
}

export default Input;