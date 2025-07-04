// import jwt from "jsonwebtoken";

// export function verifyToken(token) {
//   return new Promise((resolve, reject) => {
//     if (err) {
//       return reject(err);
//     }
//     resolve(decoded);
//   });
// }

import api from "./axios";

export async function verifyToken(token) {
  try {
    const data = await api.post(`/auth/middleware/${token}`);

    return data.data.data;
  } catch (error) {
    // console.error("Verify Error:", {
    //   message: error.message,
    //   statusCode: error.statusCode || 500,
    // });
    const message =
      error.response?.data?.message ||
      error.message ||
      "You are not logged in! Please log in to get access.";
    throw new Error(message);
  }
}

// Helper function to create tokens
export function createToken(payload, expiresIn = "1h") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}
