import React, { useState, useEffect, useRef } from 'react';
import telemetryData from './data/telemetry.json';
import attackEvents from './data/attack_events.json';

import HeaderControls from './components/HeaderControls';
import TimelineSlider from './components/TimelineSlider';
import TopGaugeRow from './components/TopGaugeRow';
import CybersecurityPanel from './components/CybersecurityPanel';
import CanBusMonitor from './components/CanBusMonitor';
import BatteryBmsPanel from './components/BatteryBmsPanel';
import MotorPowertrainPanel from './components/MotorPowertrainPanel';
import TelemetryGraphs from './components/TelemetryGraphs';
import CyberAttackLog from './components/CyberAttackLog';

import './App.css';

export default function App() {
  const maxTime = telemetryData[telemetryData.length - 1].time; // 100.0s
  
  // Playback & Tab state
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(11); // Default 11x fast speed
  const [currentTime, setCurrentTime] = useState(0.0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'powertrain' | 'graphs' | 'log'

  const animRef = useRef(null);
  const lastTickRef = useRef(null);

  const updateIndexFromTime = (timeVal) => {
    let idx = Math.round((timeVal / maxTime) * (telemetryData.length - 1));
    idx = Math.max(0, Math.min(telemetryData.length - 1, idx));
    setCurrentIndex(idx);
  };

  // 60 FPS Continuous Replay Loop
  useEffect(() => {
    if (!isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      lastTickRef.current = null;
      return;
    }

    const loop = (timestamp) => {
      if (!lastTickRef.current) {
        lastTickRef.current = timestamp;
      }
      
      const deltaSec = (timestamp - lastTickRef.current) / 1000.0;
      lastTickRef.current = timestamp;

      setCurrentTime((prevTime) => {
        const nextTime = prevTime + deltaSec * speed;
        if (nextTime >= maxTime) {
          setIsPlaying(false);
          updateIndexFromTime(maxTime);
          return maxTime;
        }
        updateIndexFromTime(nextTime);
        return nextTime;
      });

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, speed, maxTime]);

  const handlePlay = () => {
    if (currentTime >= maxTime) {
      setCurrentTime(0.0);
      setCurrentIndex(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0.0);
    setCurrentIndex(0);
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
  };

  const handleSeek = (timeVal) => {
    const safeTime = Math.max(0, Math.min(maxTime, timeVal));
    setCurrentTime(safeTime);
    updateIndexFromTime(safeTime);
  };

  const currentData = telemetryData[currentIndex] || telemetryData[0];
  const isFaultActive = currentData ? currentData.fault_active : false;

  return (
    <div className="dashboard-root">
      {/* Sticky Header & Navigation Section */}
      <div className="sticky-top-wrapper">
        <HeaderControls
          isPlaying={isPlaying}
          onPlay={handlePlay}
          onPause={handlePause}
          onReset={handleReset}
          speed={speed}
          onSpeedChange={handleSpeedChange}
          currentTime={currentTime}
          maxTime={maxTime}
          isFaultActive={isFaultActive}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <TimelineSlider
          currentTime={currentTime}
          maxTime={maxTime}
          onSeek={handleSeek}
        />
      </div>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Tab 1: Overview & Command Center */}
        {activeTab === 'overview' && (
          <div className="tab-view view-overview">
            <TopGaugeRow data={currentData} />
            <div className="security-can-layout">
              <CybersecurityPanel data={currentData} />
              <CanBusMonitor data={currentData} />
            </div>
          </div>
        )}

        {/* Tab 2: BMS & Motor Powertrain Deep Dive */}
        {activeTab === 'powertrain' && (
          <div className="tab-view view-powertrain">
            <TopGaugeRow data={currentData} />
            <div className="powertrain-bms-layout">
              <BatteryBmsPanel data={currentData} />
              <MotorPowertrainPanel data={currentData} />
            </div>
          </div>
        )}

        {/* Tab 3: Dedicated Full-Height Telemetry Graphs */}
        {activeTab === 'graphs' && (
          <div className="tab-view view-graphs">
            <TelemetryGraphs
              fullData={telemetryData}
              currentIndex={currentIndex}
              windowSize={300}
            />
          </div>
        )}

        {/* Tab 4: Cyber Attack Audit Log */}
        {activeTab === 'log' && (
          <div className="tab-view view-log">
            <CyberAttackLog
              currentTime={currentTime}
              onSeek={handleSeek}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-left">
          <span>TATA NEXON EV POWERTRAIN DIGITAL TWIN v2.4</span>
          <span className="sep">•</span>
          <span>100% PURE FRONTEND STATIC DEPLOYMENT</span>
        </div>
        <div className="footer-right">
          <span>STATUS: {isFaultActive ? '🔴 ATTACK IN PROGRESS' : '🟢 NORMAL OPERATION'}</span>
        </div>
      </footer>
    </div>
  );
}
