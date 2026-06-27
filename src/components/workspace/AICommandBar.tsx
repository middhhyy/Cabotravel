import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

export function AICommandBar({
  onCommand,
  loading,
}: {
  onCommand: (cmd: string) => void;
  loading?: boolean;
}) {
  const [cmd, setCmd] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmd.trim() || loading) return;
    onCommand(cmd);
    setCmd("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto shadow-2xl">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand/20 to-blue-500/20 blur-md"></div>
      <div className="relative flex items-center bg-black/60 border border-white/10 rounded-full backdrop-blur-xl">
        <div className="pl-6 flex items-center">
          <Sparkles className="h-5 w-5 text-brand" />
        </div>
        <input
          type="text"
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          disabled={loading}
          placeholder="E.g., Make this trip cheaper, or add more beach days..."
          className="w-full bg-transparent border-none py-4 px-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-0 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading}
          className="mr-2 p-3 bg-brand text-white rounded-full hover:bg-brand/90 transition-colors flex items-center gap-2 font-medium disabled:opacity-50"
        >
          {loading ? (
            <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span className="hidden md:inline pl-2">Update</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
