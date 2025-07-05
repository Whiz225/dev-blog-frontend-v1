export default function Heading({
  as: Tag = "h1",
  children,
  className = "",
  ...props
}) {
  const sizeClasses = {
    h1: "text-3xl font-semibold",
    h2: "text-2xl font-semibold",
    h3: "text-2xl font-medium",
    h4: "text-3xl font-semibold text-center",
  };

  return (
    <Tag
      className={`leading-tight ${sizeClasses[Tag]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
