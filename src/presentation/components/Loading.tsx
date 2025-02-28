import { Loader2 } from "lucide-react";

const Loading = () => (
  <div className="flex flex-col items-center justify-center h-64 text-gray-600">
    <Loader2 className="animate-spin h-10 w-10 text-blue-500 mb-2" />
    <p className="text-lg font-semibold">Cargando datos...</p>
  </div>
);

export default Loading;
