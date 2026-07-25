import React from 'react';
import { ShieldAlert, ShieldCheck, AlertOctagon, Radio, Activity, Zap, Cpu } from 'lucide-react';
import { ATTACK_TYPES, ATTACK_COLORS, formatVal, getSignalName } from '../utils/formatters';

export default function CybersecurityPanel({ data }) {
  if (!data) return null;

  const {
    type_te = 0,
    type_iq = 0,
    type_vdc = 0,
    det_te = 0,
    det_iq = 0,
    det_vdc = 0,
    sev_te = 0,
    sev_iq = 0,
    sev_vdc = 0,
    te = 0,
    te_can = 0,
    iq = 0,
    iq_can = 0,
    v_batt = 0,
    vdc_can = 0
  } = data;

  // Determine active attacks
  const activeAttacks = [];

  if (det_te === 1 || (type_te > 0 && sev_te > 5)) {
    activeAttacks.push({
      signal: 'Te',
      name: 'Torque (Te)',
      typeId: type_te,
      typeName: ATTACK_TYPES[type_te] || 'Spoof',
      severity: sev_te,
      delta: Math.abs(te - te_can)
    });
  }

  if (det_iq === 1 || (type_iq > 0 && sev_iq > 5)) {
    activeAttacks.push({
      signal: 'Iq',
      name: 'q-Axis Current (Iq)',
      typeId: type_iq,
      typeName: ATTACK_TYPES[type_iq] || 'Replay',
      severity: sev_iq,
      delta: Math.abs(iq - iq_can)
    });
  }

  if (det_vdc === 1 || (type_vdc > 0 && sev_vdc > 5)) {
    activeAttacks.push({
      signal: 'Vdc',
      name: 'DC Voltage (Vdc)',
      typeId: type_vdc,
      typeName: ATTACK_TYPES[type_vdc] || 'DoS',
      severity: sev_vdc,
      delta: Math.abs(v_batt - vdc_can)
    });
  }

  const isFaultActive = activeAttacks.length > 0;
  const primaryAttack = isFaultActive ? activeAttacks[0] : null;

  // Maximum severity across active attacks
  const maxSeverity = isFaultActive ? Math.max(...activeAttacks.map(a => a.severity)) : 0;
  
  // Calculate confidence score based on severity
  const confidence = isFaultActive 
    ? Math.min(99.9, Math.max(85.0, 88.5 + (maxSeverity / 50.0)))
    : 100.0;

  return (
    <div className={`cyber-panel ${isFaultActive ? 'panel-alarm' : 'panel-normal'}`}>
      <div className="panel-top-banner">
        <div className="banner-title">
          <Radio size={20} className={isFaultActive ? 'text-red pulse-fast' : 'text-emerald'} />
          <span>CYBER-SECURITY & CAN BUS FAULT INTRUSION DETECTOR</span>
        </div>

        {/* Large Indicator Status */}
        <div className={`large-status-pill ${isFaultActive ? 'status-red' : 'status-green'}`}>
          {isFaultActive ? (
            <>
              <ShieldAlert size={22} className="pulse-fast" />
              <span>🔴 FAULT DETECTED</span>
            </>
          ) : (
            <>
              <ShieldCheck size={22} />
              <span>🟢 SYSTEM NORMAL</span>
            </>
          )}
        </div>
      </div>

      {isFaultActive ? (
        <div className="attack-active-view">
          <div className="alert-flash-box">
            <AlertOctagon size={32} className="alert-flash-icon" />
            <div className="alert-flash-details">
              <div className="alert-headline">⚠ CAN ATTACK DETECTED IN REAL-TIME</div>
              <div className="alert-meta">
                <span>Signal: <strong>{primaryAttack.name}</strong></span>
                <span className="sep">•</span>
                <span>Type: <strong>{primaryAttack.typeName}</strong></span>
                <span className="sep">•</span>
                <span>Severity: <strong>{formatVal(primaryAttack.severity, 1)}</strong></span>
                <span className="sep">•</span>
                <span>Status: <strong className="text-red">ACTIVE INTRUSION</strong></span>
              </div>
            </div>
          </div>

          <div className="cyber-metrics-grid">
            <div className="cyber-metric-card">
              <span className="m-label">FAULT ACTIVE</span>
              <span className="m-value text-red font-bold">YES</span>
            </div>

            <div className="cyber-metric-card">
              <span className="m-label">ATTACK TYPE</span>
              <span 
                className="m-value font-bold"
                style={{ color: ATTACK_COLORS[primaryAttack.typeId] || '#ef4444' }}
              >
                {primaryAttack.typeName}
              </span>
            </div>

            <div className="cyber-metric-card">
              <span className="m-label">AFFECTED SIGNAL</span>
              <span className="m-value text-cyan font-bold">{primaryAttack.signal}</span>
            </div>

            <div className="cyber-metric-card">
              <span className="m-label">DETECTION CONFIDENCE</span>
              <span className="m-value text-emerald font-bold">{formatVal(confidence, 1, '%')}</span>
            </div>
          </div>

          {/* Severity Bar */}
          <div className="severity-bar-section">
            <div className="sev-header">
              <span>Severity Level Index: <strong>{formatVal(maxSeverity, 1)}</strong></span>
              <span>Max Threshold: 1000.0</span>
            </div>
            <div className="sev-bar-track">
              <div 
                className="sev-bar-fill" 
                style={{ 
                  width: `${Math.min(100, (maxSeverity / 300) * 100)}%`,
                  backgroundColor: ATTACK_COLORS[primaryAttack.typeId] || '#ef4444'
                }} 
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="attack-normal-view">
          <div className="normal-content">
            <ShieldCheck size={40} className="text-emerald" />
            <div className="normal-text">
              <h3>CAN Bus Integrity Verified</h3>
              <p>No active spoof, replay, DoS, or data corruption attacks detected. EKF & telemetry signals match reference models.</p>
            </div>
          </div>
          <div className="cyber-metrics-grid">
            <div className="cyber-metric-card">
              <span className="m-label">FAULT ACTIVE</span>
              <span className="m-value text-emerald font-bold">NO</span>
            </div>
            <div className="cyber-metric-card">
              <span className="m-label">ATTACK TYPE</span>
              <span className="m-value text-subtle">None</span>
            </div>
            <div className="cyber-metric-card">
              <span className="m-label">AFFECTED SIGNAL</span>
              <span className="m-value text-subtle">None</span>
            </div>
            <div className="cyber-metric-card">
              <span className="m-label">SYSTEM HEALTH</span>
              <span className="m-value text-emerald font-bold">100 %</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
