"use server";

import { revalidatePath } from "next/cache";
import api from "./axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { auth, signIn, signOut } from "./auth";
// import { getBookings } from "./data-service";

export async function loginUser({ username, password }) {
  try {
    console.log("action login", username, password);

    const res = await api.post(`/auth/login`, { username, password });

    console.log("action", res.data);
    if (res.data.status !== "success")
      throw new Error(res.data.response?.message || "Login failed");

    // 2. Generate token (in real app, use JWT or session)
    const token = res.data.token;

    // 3. Return user data (without sensitive info)
    return {
      status: "success",
      data: {
        user: {
          id: "user-id",
          username,
          role: "user",
        },
        token,
      },
    };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Login failed";
    throw new Error(message);
  }
}

export async function registerUser({ email, username, password }) {
  try {
    console.log("action register", email, username, password);

    // Make API request
    const res = await api.post("/auth/register", {
      email,
      username,
      password,
    });

    // Handle API response
    if (res.data?.status !== "success") {
      throw new Error(
        res.data?.message ||
          res.data?.response?.message ||
          "Registration failed"
      );
    }

    // Set secure HTTP-only cookie
    // cookies().set("token", res.data.data.token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 60 * 60 * 24 * 7, // 1 week
    //   path: "/",
    //   sameSite: "strict",
    // });

    // // Redirect on success
    // redirect("/");

    // Return data (though redirect will prevent this from being reached)
    return res.data;
  } catch (error) {
    console.error("Registration Error:", error);

    // Handle different error formats
    const message =
      error.response?.data?.message || error.message || "Registration failed";

    // Re-throw with consistent error format
    throw new Error(message);
  }
}

export async function getAllPosts() {
  try {
    const res = await api.get(`/posts/allPosts`);

    if (res.data.status !== "success")
      throw new Error(res.data.response?.message || "Unable to load Posts");

    return res.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Unable to load Posts";
    throw new Error(message);
  }
}

export async function getMyPosts() {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("token");

    const res = await api.get(`/posts/author`, {
      credentials: "include",
      headers: {
        Cookie: `jwt=${jwt?.value}`,
        "Content-Type": "application/json",
      },
    });

    if (res.data.status !== "success")
      throw new Error(res.data.response?.message || "Unable to load Posts");

    return res.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Unable to load Posts";
    throw new Error(message);
  }
}

export async function getPost(id) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("token");

    const res = await api.get(`/posts/allPosts/${id}`, {
      credentials: "include",
      headers: {
        Cookie: `jwt=${jwt?.value}`,
        "Content-Type": "application/json",
      },
    });

    if (res.data.status !== "success")
      throw new Error(res.data.response?.message || "Unable to load Post");

    return res.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Unable to load Post";
    throw new Error(message);
  }
}

export async function createNewPost(formData) {
  try {
    const content = formData.get("content");
    const title = formData.get("title");

    if (!content || !title) throw new Error("content and title are required");

    if (title.length < 3)
      throw new Error("title must be at least 3 characters");

    const cookieStore = await cookies();
    const jwt = cookieStore.get("token");

    const res = await api.post(
      `/posts/author`,
      { content, title },
      {
        credentials: "include",
        headers: {
          Cookie: `jwt=${jwt?.value}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.status !== "success")
      throw new Error(res.data.response?.message || "Unable to create Posts");

    return res.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Unable to create Posts";
    throw new Error(message);
  }
}

export async function updatePost(formData) {
  try {
    const id = formData.get("postId");
    const content = formData.get("content");
    const title = formData.get("title");

    if (!content || !title || !id)
      throw new Error("content and title are required");

    if (title.length < 3)
      throw new Error("title must be at least 3 characters");

    const cookieStore = await cookies();
    const jwt = cookieStore.get("token");

    const res = await api.patch(
      `/posts/author/${id}`,
      { content, title },
      {
        credentials: "include",
        headers: {
          Cookie: `jwt=${jwt?.value}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.status !== "success") {
      throw new Error(res.data.response?.message || "Unable to update Posts");
    }

    // const data = await

    revalidatePath(`/posts/edit/${id}`);
    revalidatePath("/posts");

    // redirect(`/posts/${id}`);

    return res.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Unable to update Posts";
    throw new Error(message);
  }
}

// export async function createNewPost({ content, title }) {
//   try {
//     const cookieStore = await cookies();
//     const jwt = cookieStore.get("token");

//     const res = await api.post(
//       `/posts/author`,
//       { content, title },
//       {
//         credentials: "include",
//         headers: {
//           Cookie: `jwt=${jwt?.value}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (res.data.status !== "success")
//       throw new Error(res.data.response?.message || "Unable to load Posts");

//     return res.data;
//   } catch (error) {
//     const message =
//       error.response?.data?.message || error.message || "Unable to load Posts";
//     throw new Error(message);
//   }
// }

// export async function updatePost(formData) {
//   try {
//     const id = formData.get("postId");
//     const content = formData.get("content");
//     const title = formData.get("title");

//     console.log({ id, content, title });

//     const cookieStore = await cookies();
//     const jwt = cookieStore.get("token");

//     const res = await api.patch(
//       `/posts/author/${id}`,
//       { content, title },
//       {
//         credentials: "include",
//         headers: {
//           Cookie: `jwt=${jwt?.value}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (res.data.status !== "success") {
//       throw new Error(res.data.response?.message || "Unable to update Posts");
//     }

//     // const data = await

//     revalidatePath(`/posts/edit/${id}`);
//     revalidatePath("/posts");

//     // redirect(`/posts/${id}`);

//     return res.data;
//   } catch (error) {
//     const message =
//       error.response?.data?.message ||
//       error.message ||
//       "Unable to update Posts";
//     throw new Error(message);
//   }
// }

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("token");

    const res = await api.get("/user/me", {
      credentials: "include",
      headers: {
        Cookie: `jwt=${jwt?.value}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.data) {
      throw new Error("No data received from server");
    }

    return res.data;
  } catch (error) {
    // Preserve the original error response
    const backendError = {
      message: error.response?.data?.message || error.message,
      statusCode: error.response?.status || 500,
      // data: error.response?.data
    };

    // Create a new error with all the details
    const err = new Error(backendError.message);
    err.statusCode = backendError.statusCode;
    // err.data = backendError.data;

    throw err;
  }
}

export async function deletePost(id) {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("token");

    console.log("action delete", id);

    const res = await api.delete(`/posts/author/${id}`, {
      credentials: "include",
      headers: {
        Cookie: `jwt=${jwt?.value}`,
        "Content-Type": "application/json",
      },
    });

    if (res.data.length >= 1)
      throw new Error(res.data.response?.message || "Unable to delete Post");

    revalidatePath("/posts");

    return null;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Unable to delete Post";
    throw new Error(message);
  }
}

export async function userLogout() {
  try {
    // const cookieStore = await cookies();
    // const jwt = cookieStore.get("token");

    const res = await api.get("/auth/logout", {
      credentials: "include",
      headers: {
        Cookie: `jwt=Logged-out`,
        "Content-Type": "application/json",
      },
    });

    if (res.data.status !== "success")
      throw new Error(
        res.data.response?.message || "Logout failed! Please try again"
      );

    const cookieStore = await cookies();

    cookieStore.set({
      name: "token",
      value: "Logged out",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "strict",
    });

    revalidatePath("/posts");

    return { status: "success" };
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Unable to delete Post";
    throw new Error(message);
  }
}

// export async function getCurrentUser() {
//   try {
//     const res = await api.get(`/user/me`);

//     if (res.data.status !== "success")
//       throw new Error(res.data.response?.message || "Unable to load Posts");

//     return res.data;
//   } catch (error) {
//     const message =
//       error.response?.data?.message || error.message || "Unable to load Posts";
//     throw new Error(message);
//   }
// }

// catch (error) {
//   if (error.response) {
//     // The request was made and the server responded with a status code
//     console.error("Server responded with error:", error.response.status);
//     return {
//       error: error.response.data.message || "Server error occurred",
//       status: "error"
//     };
//   } else if (error.request) {
//     // The request was made but no response was received
//     console.error("No response received:", error.request);
//     return {
//       error: "No response from server. Please try again.",
//       status: "error"
//     };
//   } else {
//     // Something happened in setting up the request
//     console.error("Request setup error:", error.message);
//     return {
//       error: "Request setup failed",
//       status: "error"
//     };
//   }
// }

/*
export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("Please login to continue");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");
  const updateData = { nationalID, countryFlag, nationality };

  const res = await axios.patch(`guests/${session.user.guestId}`, updateData);
  if (res.data.status !== "success")
    throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("Please login to continue");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking._id);
  if (!guestBookingIds.includes(bookingId))
    throw Error("You are not allow to delete this booking");

  const res = await axios.delete(`/bookings/web/${bookingId}`);
  if (res.status !== 204) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const session = await auth();
  if (!session) throw new Error("Please login to continue");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking._id);

  const bookingId = formData.get("bookingId");
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allow to update this booking");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };
  const res = await axios.patch(`/bookings/web/${bookingId}`, updateData);
  if (res.data.status !== "success")
    throw new Error("Booking could not be updated");

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}



export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut("google", { redirectTo: "/" });
}
*/
