import React from 'react';
import { Battery, Cpu, Zap, Activity, Layers, CheckCircle } from 'lucide-react';
import { formatVal } from '../utils/formatters';

export default function BatteryBmsPanel({ data }) {
  if (!data) return null;

  const {
    soc = 0,
    soc_ekf = 0,
    soc_err = 0,
    v_batt = 0,
    i_batt = 0,
    soc_can = 0
  } = data;

  const absErr = Math.abs(soc_err);
  const isErrHigh = absErr > 2.0;

  return (
    <div className="bms-panel-container">
      <div className="section-title-bar">
        <Battery className="text-emerald" size={18} />
        <span>BATTERY MANAGEMENT SYSTEM (BMS) & EKF KALMAN ESTIMATOR</span>
      </div>

      <div className="bms-content-grid">
        {/* SOC Comparison Box */}
        <div className="bms-card soc-comparison-card">
          <div className="bms-card-header">
            <span>SOC ESTIMATION MATCHING</span>
            <span className={`status-pill ${isErrHigh ? 'pill-warn' : 'pill-good'}`}>
              {isErrHigh ? 'EKF DRIFT DETECTED' : 'EKF OPTIMAL TRACKING'}
            </span>
          </div>

          <div className="soc-dual-display">
            <div className="soc-sub-box">
              <span className="sub-label">ACTUAL BMS GROUND TRUTH</span>
              <span className="sub-val text-emerald">{formatVal(soc, 2, '%')}</span>
            </div>

            <div className="soc-vs-divider">VS</div>

            <div className="soc-sub-box">
              <span className="sub-label">EKF ESTIMATED SOC</span>
              <span className="sub-val text-purple">{formatVal(soc_ekf, 2, '%')}</span>
            </div>
          </div>

          {/* SOC Visual Overlay Bar */}
          <div className="soc-overlay-bar-wrapper">
            <div className="bar-label-row">
              <span>Actual: {formatVal(soc, 2, '%')}</span>
              <span>EKF: {formatVal(soc_ekf, 2, '%')}</span>
            </div>
            <div className="dual-track">
              <div className="track-fill actual-fill bg-emerald" style={{ width: `${Math.min(100, Math.max(0, soc))}%` }} />
              <div className="track-fill ekf-marker bg-purple" style={{ left: `${Math.min(99, Math.max(0, soc_ekf))}%` }} />
            </div>
          </div>
        </div>

        {/* BMS Electrical Parameters */}
        <div className="bms-card electrical-card">
          <div className="bms-card-header">
            <span>PACK ELECTRICAL STATE</span>
          </div>

          <div className="elec-metrics-grid">
            <div className="elec-box">
              <div className="elec-hdr">
                <Zap size={14} className="text-amber" />
                <span>Pack Voltage</span>
              </div>
              <div className="elec-val text-amber">{formatVal(v_batt, 1, 'V')}</div>
              <span className="elec-sub">Terminal Voltage</span>
            </div>

            <div className="elec-box">
              <div className="elec-hdr">
                <Activity size={14} className="text-blue" />
                <span>Pack Current</span>
              </div>
              <div className={`elec-val ${i_batt < 0 ? 'text-cyan' : 'text-blue'}`}>
                {formatVal(i_batt, 1, 'A')}
              </div>
              <span className="elec-sub">{i_batt < 0 ? 'Charging (Regen)' : 'Discharging'}</span>
            </div>

            <div className="elec-box">
              <div className="elec-hdr">
                <Cpu size={14} className="text-purple" />
                <span>SOC Error (Δ)</span>
              </div>
              <div className={`elec-val ${isErrHigh ? 'text-amber' : 'text-purple'}`}>
                {formatVal(soc_err, 2, '%')}
              </div>
              <span className="elec-sub">Actual − EKF</span>
            </div>

            <div className="elec-box">
              <div className="elec-hdr">
                <Layers size={14} className="text-cyan" />
                <span>CAN Reported SOC</span>
              </div>
              <div className="elec-val text-cyan">{formatVal(soc_can, 2, '%')}</div>
              <span className="elec-sub">BMS Bus Signal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
