import { BiLoaderAlt } from "react-icons/bi";

function SpinnerMini({ className = "w-[2.4rem] h-[2.4rem]", ...props }) {
  return (
    <BiLoaderAlt className={`w-6 h-6 animate-spin ${className}`} {...props} />
  );
}

export default SpinnerMini;

// import styled, { keyframes } from "styled-components";
// import { BiLoaderAlt } from "react-icons/bi";

// const rotate = keyframes`
//   to {
//     transform: rotate(1turn)
//   }
// `;

// const SpinnerMini = styled(BiLoaderAlt)`
//   width: 2.4rem;
//   height: 2.4rem;
//   animation: ${rotate} 1.5s infinite linear;
// `;

// export default SpinnerMini;
