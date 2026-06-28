import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { CodeEditor } from './components/CodeEditor';
import { RightPanel } from './components/RightPanel';
import { INITIAL_AGENTS, INITIAL_MESSAGES, MOCK_FILE_SYSTEM, MOCK_TERMINAL_LOGS } from './constants';
import { ActiveTab, ChatMessage, FileNode } from './types';
import { MessageSquare, Code, Layout } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('Chat');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [activeFileId, setActiveFileId] = useState<string | null>('LoginForm.jsx');
  const [logs, setLogs] = useState<string[]>(MOCK_TERMINAL_LOGS);

  // Helper to find file in mock tree
  const findFile = (nodes: FileNode[], id: string): FileNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findFile(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const activeFile = activeFileId ? findFile(MOCK_FILE_SYSTEM, activeFileId) : null;

  const handleSendMessage = useCallback((content: string) => {
    const newUserMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newUserMsg]);

    // Simulate AI response
    setTimeout(() => {
      const newAiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'agent',
        agentName: 'Orchestrator',
        content: `I have received your request: "${content}". I am delegating tasks to the team.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newAiMsg]);
      
      setLogs(prev => [...prev, `[System] Received new instruction. Orchestrating tasks...`]);
    }, 1000);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-vscode-bg text-vscode-text font-sans overflow-hidden">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          agents={INITIAL_AGENTS} 
          fileSystem={MOCK_FILE_SYSTEM} 
          activeFileId={activeFileId}
          onFileSelect={(id) => {
            setActiveFileId(id);
            setActiveTab('Code');
          }}
        />
        
        {/* Main Center Area */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-vscode-border">
          {/* Tabs */}
          <div className="flex items-center bg-vscode-header border-b border-vscode-border px-2 shrink-0">
            {(['Chat', 'Code', 'Canvas'] as ActiveTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab 
                    ? 'border-vscode-accent text-white bg-vscode-panel' 
                    : 'border-transparent text-vscode-muted hover:text-vscode-text hover:bg-vscode-panel/50'
                }`}
              >
                {tab === 'Chat' && <MessageSquare size={14} />}
                {tab === 'Code' && <Code size={14} />}
                {tab === 'Canvas' && <Layout size={14} />}
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden relative">
            {activeTab === 'Chat' && (
              <div className="absolute inset-0">
                <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
              </div>
            )}
            {activeTab === 'Code' && (
              <div className="absolute inset-0">
                <CodeEditor file={activeFile} />
              </div>
            )}
            {activeTab === 'Canvas' && (
              <div className="absolute inset-0 flex items-center justify-center text-vscode-muted bg-vscode-bg">
                <div className="text-center">
                  <Layout size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Visual Canvas Editor</p>
                  <p className="text-xs mt-2 opacity-50">Drag and drop components here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <RightPanel logs={logs} />
      </div>
    </div>
  );
}
