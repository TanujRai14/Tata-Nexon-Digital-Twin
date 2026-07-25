import React from 'react';
import { Play, Pause, RotateCcw, ShieldCheck, ShieldAlert, Cpu, Activity, LayoutDashboard, Zap, LineChart, FileText } from 'lucide-react';
import { formatTime, getSimPhase } from '../utils/formatters';

export default function HeaderControls({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  speed,
  onSpeedChange,
  currentTime,
  maxTime,
  isFaultActive,
  activeTab,
  onTabChange
}) {
  const phase = getSimPhase(currentTime);
  const speeds = [0.5, 0.8, 1, 2, 11];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'powertrain', label: 'BMS & Motor', icon: Zap },
    { id: 'graphs', label: 'Live Graphs', icon: LineChart },
    { id: 'log', label: 'Attack Log', icon: FileText, badge: '10' }
  ];

  return (
    <header className="sticky-header">
      <div className="header-top-row">
        <div className="brand-badge">
          <Cpu className="brand-icon" size={24} />
          <div className="brand-text">
            <h1 className="brand-title">EV DIGITAL TWIN</h1>
            <span className="brand-subtitle">OEM Telemetry Twin</span>
          </div>
        </div>

        <div className="phase-pill" style={{ borderColor: phase.color, color: phase.color }}>
          <span className="phase-icon">{phase.icon}</span>
          <span className="phase-name">Phase {phase.phase}: {phase.name}</span>
        </div>

        {/* Navigation Tabs */}
        <nav className="header-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => onTabChange(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                {tab.id === 'log' && isFaultActive && (
                  <span className="tab-alert-dot pulse-fast" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="header-controls-group">
          <div className="playback-controls">
            <button 
              className={`btn-control ${onReset ? 'active' : ''}`} 
              onClick={onReset} 
              title="Reset Simulation (⏹)"
            >
              <RotateCcw size={16} />
            </button>

            {isPlaying ? (
              <button 
                className="btn-control btn-play pause" 
                onClick={onPause} 
                title="Pause Simulation (⏸)"
              >
                <Pause size={18} />
              </button>
            ) : (
              <button 
                className="btn-control btn-play play" 
                onClick={onPlay} 
                title="Play Simulation (▶)"
              >
                <Play size={18} />
              </button>
            )}

            <div className="speed-selector">
              {speeds.map((s) => (
                <button
                  key={s}
                  className={`speed-btn ${speed === s ? 'active' : ''}`}
                  onClick={() => onSpeedChange(s)}
                >
                  {s === 11 ? '11×' : `${s}×`}
                </button>
              ))}
            </div>
          </div>

          <div className="time-display">
            <span className="time-current">{formatTime(currentTime)}</span>
            <span className="time-sep">/</span>
            <span className="time-max">{formatTime(maxTime)}</span>
          </div>

          <div className={`sys-status-badge ${isFaultActive ? 'fault' : 'normal'}`}>
            {isFaultActive ? (
              <>
                <ShieldAlert className="status-icon pulse-red" size={18} />
                <span>ATTACK</span>
              </>
            ) : (
              <>
                <ShieldCheck className="status-icon" size={18} />
                <span>NORMAL</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
