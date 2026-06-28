export interface ChatMessage {
  id: string;
  role: 'user' | 'system' | 'agent';
  agentName?: string;
  content: string;
  timestamp: string;
}

export interface Agent {
  id: string;
  name: string;
  status: 'Idle' | 'Working' | 'Error';
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
}

export type ActiveTab = 'Chat' | 'Code' | 'Canvas';
