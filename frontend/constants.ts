import { Agent, ChatMessage, FileNode } from './types';

export const INITIAL_AGENTS: Agent[] = [
  { id: '1', name: 'Requirements Analyst', status: 'Idle' },
  { id: '2', name: 'UI/UX Architect', status: 'Idle' },
  { id: '3', name: 'Frontend Coder', status: 'Working' },
  { id: '4', name: 'Backend Coder', status: 'Idle' },
  { id: '5', name: 'QA & Security Agent', status: 'Idle' },
  { id: '6', name: 'DevOps & Deployment', status: 'Idle' },
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'system',
    content: 'Welcome to Agentic Studio! I am your AI project manager and orchestrator. Tell me what you would like to build.',
    timestamp: '10:00 AM'
  },
  {
    id: 'msg-2',
    role: 'user',
    content: 'Create a modern login page component in React with email and password fields.',
    timestamp: '10:02 AM'
  },
  {
    id: 'msg-3',
    role: 'agent',
    agentName: 'Frontend Coder',
    content: 'I have drafted the LoginForm.jsx component. It uses Tailwind CSS for styling and includes basic state management for the inputs.',
    timestamp: '10:03 AM'
  }
];

export const MOCK_FILE_SYSTEM: FileNode[] = [
  {
    id: 'root',
    name: 'recipe-app',
    type: 'folder',
    children: [
      {
        id: 'src',
        name: 'src',
        type: 'folder',
        children: [
          {
            id: 'components',
            name: 'components',
            type: 'folder',
            children: [
              { id: 'Button.jsx', name: 'Button.jsx', type: 'file', content: 'export const Button = () => <button>Click Me</button>;' },
              { id: 'LoginForm.jsx', name: 'LoginForm.jsx', type: 'file', content: `import React, { useState } from 'react';\n\nexport default function LoginForm() {\n  const [email, setEmail] = useState('');\n  const [password, setPassword] = useState('');\n\n  return (\n    <div className="p-6 bg-slate-800 rounded-lg shadow-xl w-96">\n      <h2 className="text-2xl font-bold text-white mb-4">Log In</h2>\n      <div className="space-y-4">\n        <div>\n          <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>\n          <input \n            type="email" \n            className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"\n            placeholder="your@email.com"\n            value={email}\n            onChange={e => setEmail(e.target.value)}\n          />\n        </div>\n        <div>\n          <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>\n          <input \n            type="password" \n            className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"\n            value={password}\n            onChange={e => setPassword(e.target.value)}\n          />\n        </div>\n        <button className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded transition-colors">\n          Log In\n        </button>\n      </div>\n    </div>\n  );\n}` }
            ]
          },
          { id: 'App.jsx', name: 'App.jsx', type: 'file', content: 'import LoginForm from "./components/LoginForm";\n\nfunction App() {\n  return (\n    <div className="min-h-screen flex items-center justify-center bg-slate-900">\n      <LoginForm />\n    </div>\n  );\n}\n\nexport default App;' },
          { id: 'index.css', name: 'index.css', type: 'file', content: '@tailwind base;\n@tailwind components;\n@tailwind utilities;' }
        ]
      },
      { id: 'package.json', name: 'package.json', type: 'file', content: '{\n  "name": "recipe-app",\n  "version": "1.0.0"\n}' },
      { id: 'README.md', name: 'README.md', type: 'file', content: '# Recipe App\n\nA modern recipe application built with React and Tailwind CSS.' }
    ]
  }
];

export const MOCK_TERMINAL_LOGS = [
  "[System] Initializing Agentic Workspace...",
  "[System] Loading project files...",
  "[Frontend Coder] Setting up React project structure with modern tooling.",
  "[UI/UX Architect] Creating wireframes for recipe browsing interface.",
  "[Backend Developer] Designing database schema for recipes and user data.",
  "npm WARN deprecated rollup-plugin-terser@7.0.2: This package has been deprecated and is no longer maintained.",
  "added 245 packages, and audited 246 packages in 3s",
  "102 packages are looking for funding",
  "  run `npm fund` for details",
  "found 0 vulnerabilities",
  "➜  recipe-app git:(main) ✗ npm run dev",
  "  VITE v5.2.8  ready in 245 ms",
  "  ➜  Local:   http://localhost:5173/",
  "  ➜  Network: use --host to expose",
  "  ➜  press h + enter to show help"
];
