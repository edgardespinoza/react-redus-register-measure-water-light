export default function Notification({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md text-white ${bgColor} shadow-lg`}
    >
      {message}
    </div>
  );
}
