// For exact values from CSS variables
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

// import styled from "styled-components";

// const Input = styled.input`
//   border: 1px solid var(--color-grey-300);
//   background-color: var(--color-grey-0);
//   border-radius: var(--border-radius-sm);
//   padding: 0.8rem 1.2rem;
//   box-shadow: var(--shadow-sm);
// `;

// export default Input;
