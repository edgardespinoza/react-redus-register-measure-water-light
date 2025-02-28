// src/components/ErrorMessage.tsx
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="flex flex-col items-center justify-center h-64 text-red-600">
    <AlertCircle className="h-12 w-12 mb-2" />
    <p className="text-lg font-semibold">Ocurrió un error</p>
    <p className="text-sm text-gray-500">{message}</p>
  </div>
);

export default ErrorMessage;
