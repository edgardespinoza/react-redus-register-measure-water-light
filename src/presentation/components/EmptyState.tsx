// src/components/EmptyState.tsx
import { FileText } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({
  message = "No hay datos disponibles",
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
    <FileText className="h-12 w-12 mb-2" />
    <p className="text-lg font-semibold">{message}</p>
    <p className="text-sm text-gray-400">Intenta con otros filtros.</p>
  </div>
);

export default EmptyState;
