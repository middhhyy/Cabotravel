import { AlertTriangle, RefreshCw, Edit2, RotateCcw } from "lucide-react";

interface Props {
  onRetry: () => void;
  onEdit: () => void;
  onStartOver: () => void;
}

export function ErrorState({ onRetry, onEdit, onStartOver }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto py-20 px-6 text-center bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
      <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
        <AlertTriangle className="h-8 w-8 text-red-400" />
      </div>

      <h3 className="text-2xl font-semibold text-white mb-3">Generation Paused</h3>
      <p className="text-white/60 mb-8 max-w-md mx-auto">
        We encountered a slight hiccup while communicating with our travel intelligence network.
        Don't worry, your trip details are safe.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-white font-medium hover:bg-brand/90 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Retry Generation
        </button>

        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
        >
          <Edit2 className="h-4 w-4" />
          Edit Preferences
        </button>

        <button
          onClick={onStartOver}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-white/60 hover:text-white transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Start Over
        </button>
      </div>
    </div>
  );
}
