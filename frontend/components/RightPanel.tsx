import React from 'react';
import { Terminal, PlayCircle } from 'lucide-react';

interface RightPanelProps {
  logs: string[];
}

export const RightPanel: React.FC<RightPanelProps> = ({ logs }) => {
  return (
    <div className="w-96 bg-vscode-bg border-l border-vscode-border flex flex-col h-full shrink-0">
      {/* Live Preview Section */}
      <div className="flex-1 flex flex-col border-b border-vscode-border min-h-[50%]">
        <div className="flex items-center gap-2 px-4 py-2 bg-vscode-panel border-b border-vscode-border text-sm font-medium text-vscode-text shrink-0">
          <PlayCircle size={16} className="text-green-400" />
          Live Preview
        </div>
        <div className="flex-1 bg-white overflow-auto p-4 flex items-center justify-center relative">
           {/* Mocking the rendered output of the LoginForm */}
           <div className="p-6 bg-slate-800 rounded-lg shadow-xl w-full max-w-sm">
            <h2 className="text-2xl font-bold text-white mb-4">Log In</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white outline-none"
                  placeholder="your@email.com"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
                <input 
                  type="password" 
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white outline-none"
                  value="••••••••"
                  readOnly
                />
              </div>
              <button className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded">
                Log In
              </button>
            </div>
          </div>
          
          {/* Overlay to indicate it's a preview */}
          <div className="absolute inset-0 pointer-events-none border-4 border-transparent hover:border-indigo-500/20 transition-colors"></div>
        </div>
      </div>

      {/* Terminal/Logs Section */}
      <div className="flex-1 flex flex-col min-h-[30%]">
        <div className="flex items-center gap-2 px-4 py-2 bg-vscode-panel border-b border-vscode-border text-sm font-medium text-vscode-text shrink-0">
          <Terminal size={16} className="text-vscode-muted" />
          Terminal & Logs
        </div>
        <div className="flex-1 bg-[#000000] p-3 overflow-y-auto font-mono text-xs leading-relaxed">
          {logs.map((log, index) => {
            let colorClass = "text-slate-300";
            if (log.includes("[System]")) colorClass = "text-blue-400";
            if (log.includes("WARN")) colorClass = "text-yellow-400";
            if (log.includes("error") || log.includes("failed")) colorClass = "text-red-400";
            if (log.includes("➜")) colorClass = "text-green-400";
            
            return (
              <div key={index} className={`mb-1 break-all ${colorClass}`}>
                {log}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
