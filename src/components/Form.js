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

// import styled, { css } from "styled-components";

// const Form = styled.form`
//   ${(props) =>
//     props.type === "regular" &&
//     css`
//       padding: 2.4rem 4rem;

//       /* Box */
//       background-color: var(--color-grey-0);
//       border: 1px solid var(--color-grey-100);
//       border-radius: var(--border-radius-md);
//     `}

//   ${(props) =>
//     props.type === "modal" &&
//     css`
//       width: 80rem;
//     `}

//   overflow: hidden;
//   font-size: 1.4rem;
// `;

// Form.defaultProps = {
//   type: "regular",
// };

// export default Form;
