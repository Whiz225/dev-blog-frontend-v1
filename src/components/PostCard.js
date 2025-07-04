import Link from "next/link";
import Image from "next/image";

const PostCard = ({ post, children }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Post Image */}
      <div className="relative h-48 w-full">
        <Image
          src={post.image || "/img/default-post-image.jpg"}
          // src={`/img/tours${post.image || "/default-post-image.jpg"}`}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Post Content */}
      <div className="p-6">
        {/* Category Tag */}
        <div className="flex items-center mb-2">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
            {post.category || "Uncategorized"}
          </span>
          <span className="ml-2 text-gray-500 dark:text-gray-400 text-xs">
            {post.readTime || "5 min"} read
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.content.length > 35
            ? `${post.content.slice(0, 35)}...`
            : post.content || "No excerpt available..."}
        </p>

        {/* Author and Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative h-10 w-10 rounded-full overflow-hidden">
              {/* <Image
                src={`/img${post.author?.avatar || "users/default-avatar.jpg"}`} // No extra slashes
                alt="User profile"
                width={640} // Must specify
                height={360} // Must specify
                priority={true} // If above the fold
                quality={75} // Default is 75
              /> */}

              <Image
                src={`/img${
                  post.author?.avatar || "/users/default-avatar.jpg"
                }`}
                alt={post.author?.username || "Anonymous"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {post.author?.username || "Anonymous"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Read More Button */}
          <Link
            href={`/posts/${post.id}`}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            Read More
            <svg
              className="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PostCard;
