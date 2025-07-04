// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { redirect } from "next/navigation";
// import toast from "react-hot-toast";

// export function useCurrentUser() {
//   return useQuery({
//     queryKey: ["user"],
//     queryFn: async () => {
//       try {
//         const response = await fetch("/api/user"); // Note: singular "posts"
//         if (!response.ok) {
//           const errorData = await response.json();
//           // Now you have access to:
//           // errorData.error - the error message
//           // errorData.details - the original backend error details
//           // response.status - the HTTP status code

//           throw new Error(errorData.error || "Request failed");
//         }

//         const data = await response.json();
//         if (data.status !== "success")
//           //  {
//           // Try to get error message from response
//           // let errorData;
//           // try {
//           //   errorData = await res.json();
//           // } catch (e) {
//           //   errorData = { error: await res.text() };
//           // }
//           throw new Error(
//             `HTTP error! status: ${response.status}`
//             // errorData.error || `HTTP error! status: ${res.status}`
//           );
//         // }

//         return data.data.data;
//       } catch (error) {
//         console.error("Fetch user error:", error);
//         // redirect("/login");
//         throw error; // Re-throw to trigger onError
//       }
//     },
//     onSuccess: (data) => {
//       toast.success(`Your are currently logged in ${data.username}`);
//     },
//     onError: (error) => {
//       console.error("CurrentUser fetch error:", error);
//       toast.error(error.message || "No user found!");
//       redirect("/login");
//     },
//   });
// }
