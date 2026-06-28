import React from 'react';
import { FileNode } from '../types';

interface CodeEditorProps {
  file: FileNode | null;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ file }) => {
  if (!file || file.type === 'folder') {
    return (
      <div className="flex-1 flex items-center justify-center bg-vscode-bg text-vscode-muted">
        Select a file to view its contents
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-[#333] text-sm text-vscode-text">
        <span className="text-vscode-accent mr-2">react</span>
        {file.name}
      </div>
      <div className="flex-1 overflow-auto p-4">
        <pre className="text-sm font-mono text-[#d4d4d4] leading-relaxed">
          <code>{file.content || '// Empty file'}</code>
        </pre>
      </div>
    </div>
  );
};
