import React from 'react';
import attackEvents from '../data/attack_events.json';
import { ATTACK_COLORS, formatVal, formatTime } from '../utils/formatters';
import { ShieldAlert, AlertTriangle, Play, CheckCircle } from 'lucide-react';

export default function CyberAttackLog({ currentTime, onSeek }) {
  return (
    <div className="attack-log-container">
      <div className="section-title-bar">
        <ShieldAlert className="text-red" size={20} />
        <span>CAN BUS CYBER-SECURITY INTRUSION AUDIT LOG & EPISODE TIMELINE</span>
      </div>

      <div className="log-summary-cards">
        <div className="log-card">
          <span className="log-card-title">TOTAL EPISODES DETECTED</span>
          <span className="log-card-val text-red">10 Attacks</span>
        </div>
        <div className="log-card">
          <span className="log-card-title">ATTACK TYPES IDENTIFIED</span>
          <span className="log-card-val text-amber">Spoof, Replay, DoS, Corruption</span>
        </div>
        <div className="log-card">
          <span className="log-card-title">CAN SIGNALS TARGETED</span>
          <span className="log-card-val text-cyan">Torque (Te), Iq Current, Vdc Voltage</span>
        </div>
        <div className="log-card">
          <span className="log-card-title">MAX SEVERITY INDEX</span>
          <span className="log-card-val text-purple">965.39 (Iq DoS)</span>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="attack-log-table">
          <thead>
            <tr>
              <th>STATUS</th>
              <th>SIGNAL TARGETED</th>
              <th>ATTACK VECTOR</th>
              <th>START TIME</th>
              <th>END TIME</th>
              <th>DURATION</th>
              <th>MAX SEVERITY</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {attackEvents.map((evt) => {
              const isActive = currentTime >= evt.start && currentTime <= evt.end;
              const isPast = currentTime > evt.end;
              const color = ATTACK_COLORS[evt.type_id] || '#ef4444';
              const duration = (evt.end - evt.start).toFixed(2);

              return (
                <tr 
                  key={evt.id} 
                  className={`log-row ${isActive ? 'row-active' : ''}`}
                  onClick={() => onSeek(evt.start)}
                >
                  <td>
                    {isActive ? (
                      <span className="row-badge badge-active">
                        <AlertTriangle size={12} className="pulse-fast" /> ACTIVE INTRUSION
                      </span>
                    ) : isPast ? (
                      <span className="row-badge badge-resolved">
                        <CheckCircle size={12} /> RESOLVED
                      </span>
                    ) : (
                      <span className="row-badge badge-pending">
                        UPCOMING
                      </span>
                    )}
                  </td>
                  <td>
                    <span className="signal-tag">{evt.signal_label} ({evt.signal})</span>
                  </td>
                  <td>
                    <span className="type-tag" style={{ color: color, borderColor: color }}>
                      {evt.type_name}
                    </span>
                  </td>
                  <td className="font-mono text-cyan">{evt.start.toFixed(2)}s ({formatTime(evt.start)})</td>
                  <td className="font-mono text-subtle">{evt.end.toFixed(2)}s ({formatTime(evt.end)})</td>
                  <td className="font-mono">{duration}s</td>
                  <td>
                    <span className="sev-chip font-mono font-bold" style={{ color: color }}>
                      {formatVal(evt.max_sev, 1)}
                    </span>
                  </td>
                  <td>
                    <button className="btn-jump" onClick={(e) => { e.stopPropagation(); onSeek(evt.start); }}>
                      <Play size={12} /> Jump to {evt.start}s
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
