import { Clock, Check } from "lucide-react";
import type { Version } from "@/hooks/useWorkspace";

interface Props {
  workspace: {
    versions: Version[];
    currentVersionId: string;
    setCurrentVersionId: (id: string) => void;
  };
}

export function VersionHistoryPanel({ workspace }: Props) {
  return (
    <div className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center gap-2">
        <Clock className="h-4 w-4 text-brand" />
        <h3 className="text-sm font-medium text-white">Version History</h3>
      </div>
      <div className="p-2 space-y-1">
        {workspace.versions.map((v, i) => (
          <button
            key={v.id}
            onClick={() => workspace.setCurrentVersionId(v.id)}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-sm transition-colors ${
              workspace.currentVersionId === v.id
                ? "bg-brand/10 text-brand"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <div>
              <div className="font-medium">{v.name}</div>
              <div className="text-xs opacity-60">
                {new Date(v.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            {workspace.currentVersionId === v.id && <Check className="h-4 w-4" />}
          </button>
        ))}
      </div>
    </div>
  );
}
