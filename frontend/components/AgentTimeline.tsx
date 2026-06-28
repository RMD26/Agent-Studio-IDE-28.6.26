import React, { useEffect, useRef } from 'react';
import { BrainCircuit, Code2, ShieldCheck, TerminalSquare, Settings, CheckCircle2, XCircle } from 'lucide-react';
import { StateLog } from '../types';

interface AgentTimelineProps {
  logs: StateLog[];
}

export const AgentTimeline: React.FC<AgentTimelineProps> = ({ logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getAgentIcon = (agent: string) => {
    switch (agent) {
      case 'CONDUCTOR': return <BrainCircuit size={16} className="text-purple-400" />;
      case 'CODER': return <Code2 size={16} className="text-blue-400" />;
      case 'REVIEWER': return <ShieldCheck size={16} className="text-emerald-400" />;
      case 'RUNNER': return <TerminalSquare size={16} className="text-amber-400" />;
      default: return <Settings size={16} className="text-gray-400" />;
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'ANALYSIS': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'CODING': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'REVIEW': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'TESTING': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'SUCCESS': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'FAILURE': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background">
      <div className="p-4 border-b border-border flex items-center justify-between bg-card/50">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Agent Activity Timeline</h2>
        <div className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md">
          {logs.length} Events Recorded
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[23px] top-4 bottom-4 w-px bg-border"></div>

          <div className="space-y-6 relative">
            {logs.length === 0 ? (
              <div className="text-sm text-muted-foreground italic pl-14">Awaiting workflow execution...</div>
            ) : (
              logs.map((log, index) => {
                const isLast = index === logs.length - 1;
                const isSuccess = log.phase === 'SUCCESS';
                const isFailure = log.phase === 'FAILURE';

                return (
                  <div key={index} className="flex gap-4 relative group">
                    {/* Timeline Node */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 bg-background z-10 transition-colors duration-300 ${
                      isSuccess ? 'border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.2)]' :
                      isFailure ? 'border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]' :
                      isLast ? 'border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'border-border'
                    }`}>
                      {isSuccess ? <CheckCircle2 size={20} className="text-green-500" /> :
                       isFailure ? <XCircle size={20} className="text-red-500" /> :
                       getAgentIcon(log.agent)}
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 p-4 rounded-lg border transition-all duration-300 ${
                      isLast && !isSuccess && !isFailure ? 'bg-card border-cyan-500/30 shadow-sm' : 'bg-card/50 border-border/50'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-foreground">{log.agent}</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getPhaseColor(log.phase)}`}>
                            {log.phase}
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {new Date(log.timestamp).toISOString().split('T')[1].slice(0, -1)}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${isFailure ? 'text-red-400' : 'text-muted-foreground'}`}>
                        {log.message}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
