// // src/contexts/AuthContext.js
// import { createContext, useState, useEffect, useContext } from "react";
// import { useRouter } from "next/router";
// import * as authService from "../services/auth";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     async function loadUser() {
//       const storedToken = localStorage.getItem("token");
//       if (storedToken) {
//         try {
//           const userData = await authService.getProfile(storedToken);
//           setUser(userData);
//           setToken(storedToken);
//         } catch (err) {
//           logout();
//         }
//       }
//       setLoading(false);
//     }
//     loadUser();
//   }, []);

//   async function login(username, password) {
//     const response = await authService.login(username, password);
//     setToken(response.access_token);
//     const userData = await authService.getProfile(response.access_token);
//     setUser(userData);
//     localStorage.setItem("token", response.access_token);
//   }

//   function logout() {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("token");
//     router.push("/login");
//   }

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
