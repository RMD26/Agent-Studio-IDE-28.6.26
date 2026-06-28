import React, { useState } from 'react';
import { Folder, File, ChevronRight, ChevronDown, Play, Save, GitCommit, Settings } from 'lucide-react';
import { Agent, FileNode } from '../types';

interface SidebarProps {
  agents: Agent[];
  fileSystem: FileNode[];
  activeFileId: string | null;
  onFileSelect: (fileId: string) => void;
}

const FileTreeItem: React.FC<{ node: FileNode; depth: number; activeFileId: string | null; onSelect: (id: string) => void }> = ({ node, depth, activeFileId, onSelect }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = node.type === 'folder';
  const isActive = node.id === activeFileId;

  return (
    <div>
      <div 
        className={`flex items-center gap-1.5 py-1 px-2 cursor-pointer hover:bg-vscode-panel text-sm ${isActive ? 'bg-vscode-panel text-vscode-accent' : 'text-vscode-text'}`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => {
          if (isFolder) setIsOpen(!isOpen);
          else onSelect(node.id);
        }}
      >
        {isFolder ? (
          isOpen ? <ChevronDown size={14} className="text-vscode-muted" /> : <ChevronRight size={14} className="text-vscode-muted" />
        ) : (
          <span className="w-3.5" /> // Spacer for alignment
        )}
        {isFolder ? <Folder size={14} className="text-blue-400" /> : <File size={14} className="text-vscode-muted" />}
        <span className="truncate">{node.name}</span>
      </div>
      {isFolder && isOpen && node.children && (
        <div>
          {node.children.map(child => (
            <FileTreeItem key={child.id} node={child} depth={depth + 1} activeFileId={activeFileId} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ agents, fileSystem, activeFileId, onFileSelect }) => {
  return (
    <div className="w-64 bg-vscode-sidebar border-r border-vscode-border flex flex-col h-full shrink-0">
      {/* Explorer Section */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="px-4 py-2 text-xs font-semibold text-vscode-muted tracking-wider uppercase">
          Explorer
        </div>
        <div className="flex-1 overflow-y-auto pb-4">
          {fileSystem.map(node => (
            <FileTreeItem key={node.id} node={node} depth={0} activeFileId={activeFileId} onSelect={onFileSelect} />
          ))}
        </div>
      </div>

      {/* Agent Status Section */}
      <div className="border-t border-vscode-border flex-1 overflow-y-auto flex flex-col">
        <div className="px-4 py-2 text-xs font-semibold text-vscode-muted tracking-wider uppercase">
          Agent Status
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {agents.map(agent => (
            <div key={agent.id} className="flex items-center justify-between p-2 rounded hover:bg-vscode-panel group">
              <span className="text-sm text-vscode-text truncate pr-2">{agent.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${
                agent.status === 'Working' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 
                agent.status === 'Error' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
                'bg-vscode-border text-vscode-muted border-transparent'
              }`}>
                {agent.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-vscode-border p-4 space-y-2 shrink-0">
        <div className="text-xs font-semibold text-vscode-muted tracking-wider uppercase mb-2">
          Quick Actions
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-2 bg-vscode-panel hover:bg-vscode-border text-vscode-text py-1.5 rounded text-sm transition-colors">
            <Save size={14} /> Save All
          </button>
          <button className="flex items-center justify-center gap-2 bg-vscode-panel hover:bg-vscode-border text-vscode-text py-1.5 rounded text-sm transition-colors">
            <GitCommit size={14} /> Commit
          </button>
        </div>
        <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-1.5 rounded text-sm font-medium transition-colors mt-2">
          <Play size={14} /> Run Project
        </button>
      </div>
    </div>
  );
};
