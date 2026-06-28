import React from 'react';
import { Share2, Settings, User, Plus } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-12 bg-vscode-header border-b border-vscode-border flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-white font-semibold text-lg">
          <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
            <span className="text-sm">A</span>
          </div>
          Agentic Studio
        </div>
        <div className="flex items-center gap-2 bg-vscode-panel px-3 py-1 rounded-md border border-vscode-border text-sm text-vscode-muted">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          main
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors">
          <Share2 size={16} />
          Share
        </button>
        <button className="p-1.5 text-vscode-muted hover:text-white transition-colors">
          <Settings size={18} />
        </button>
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold cursor-pointer">
          U
        </div>
      </div>
    </header>
  );
};
