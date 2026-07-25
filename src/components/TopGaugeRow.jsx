import React from 'react';
import { Gauge, Zap, Battery, Cpu, Activity, Compass, Flame } from 'lucide-react';
import { formatVal } from '../utils/formatters';

export default function TopGaugeRow({ data }) {
  if (!data) return null;

  const {
    speed_kmh = 0,
    rpm = 0,
    te = 0,
    soc = 0,
    soc_ekf = 0,
    v_batt = 0,
    i_batt = 0
  } = data;

  const isRegen = i_batt < -1.0;
  const isHighTorque = te > 500;

  return (
    <div className="top-gauge-grid">
      {/* 1. Vehicle Speed */}
      <div className="gauge-card speed-card">
        <div className="card-header">
          <Gauge className="card-icon text-cyan" size={18} />
          <span className="card-label">VEHICLE SPEED</span>
        </div>
        <div className="card-body">
          <div className="gauge-value text-cyan">
            {formatVal(speed_kmh, 1)}
            <span className="gauge-unit">km/h</span>
          </div>
          <div className="gauge-bar-track">
            <div 
              className="gauge-bar-fill bg-cyan" 
              style={{ width: `${Math.min(100, (speed_kmh / 140) * 100)}%` }}
            />
          </div>
          <div className="card-subtext">
            <span>Motor: {formatVal(rpm, 0, 'RPM')}</span>
          </div>
        </div>
      </div>

      {/* 2. Motor Torque */}
      <div className={`gauge-card torque-card ${isRegen ? 'regen' : ''}`}>
        <div className="card-header">
          <Flame className={`card-icon ${te < 0 ? 'text-cyan' : 'text-amber'}`} size={18} />
          <span className="card-label">MOTOR TORQUE</span>
          {te < 0 && <span className="badge-regen">REGEN</span>}
        </div>
        <div className="card-body">
          <div className={`gauge-value ${te < 0 ? 'text-cyan' : (isHighTorque ? 'text-amber' : 'text-emerald')}`}>
            {formatVal(te, 1)}
            <span className="gauge-unit">Nm</span>
          </div>
          <div className="gauge-bar-track">
            <div 
              className={`gauge-bar-fill ${te < 0 ? 'bg-cyan' : 'bg-amber'}`} 
              style={{ width: `${Math.min(100, (Math.abs(te) / 1300) * 100)}%` }}
            />
          </div>
          <div className="card-subtext">
            <span>Range: -610 to +1280 Nm</span>
          </div>
        </div>
      </div>

      {/* 3. Battery SOC */}
      <div className="gauge-card soc-card">
        <div className="card-header">
          <Battery className="card-icon text-emerald" size={18} />
          <span className="card-label">ACTUAL SOC</span>
        </div>
        <div className="card-body">
          <div className="gauge-value text-emerald">
            {formatVal(soc, 2)}
            <span className="gauge-unit">%</span>
          </div>
          <div className="gauge-bar-track">
            <div 
              className="gauge-bar-fill bg-emerald" 
              style={{ width: `${Math.min(100, Math.max(0, soc))}%` }}
            />
          </div>
          <div className="card-subtext">
            <span>BMS Ground Truth</span>
          </div>
        </div>
      </div>

      {/* 4. EKF SOC */}
      <div className="gauge-card ekf-card">
        <div className="card-header">
          <Cpu className="card-icon text-purple" size={18} />
          <span className="card-label">EKF ESTIMATED SOC</span>
        </div>
        <div className="card-body">
          <div className="gauge-value text-purple">
            {formatVal(soc_ekf, 2)}
            <span className="gauge-unit">%</span>
          </div>
          <div className="gauge-bar-track">
            <div 
              className="gauge-bar-fill bg-purple" 
              style={{ width: `${Math.min(100, Math.max(0, soc_ekf))}%` }}
            />
          </div>
          <div className="card-subtext">
            <span>Kalman Delta: {formatVal(soc - soc_ekf, 2, '%')}</span>
          </div>
        </div>
      </div>

      {/* 5. Battery Voltage */}
      <div className="gauge-card voltage-card">
        <div className="card-header">
          <Zap className="card-icon text-amber" size={18} />
          <span className="card-label">BATTERY VOLTAGE</span>
        </div>
        <div className="card-body">
          <div className="gauge-value text-amber">
            {formatVal(v_batt, 1)}
            <span className="gauge-unit">V</span>
          </div>
          <div className="gauge-bar-track">
            <div 
              className="gauge-bar-fill bg-amber" 
              style={{ width: `${Math.min(100, ((v_batt - 300) / 100) * 100)}%` }}
            />
          </div>
          <div className="card-subtext">
            <span>HV Bus Pack Voltage</span>
          </div>
        </div>
      </div>

      {/* 6. Battery Current */}
      <div className={`gauge-card current-card ${isRegen ? 'regen' : ''}`}>
        <div className="card-header">
          <Activity className={`card-icon ${isRegen ? 'text-cyan' : 'text-blue'}`} size={18} />
          <span className="card-label">BATTERY CURRENT</span>
        </div>
        <div className="card-body">
          <div className={`gauge-value ${isRegen ? 'text-cyan' : 'text-blue'}`}>
            {formatVal(i_batt, 1)}
            <span className="gauge-unit">A</span>
          </div>
          <div className="gauge-bar-track">
            <div 
              className={`gauge-bar-fill ${isRegen ? 'bg-cyan' : 'bg-blue'}`} 
              style={{ width: `${Math.min(100, (Math.abs(i_batt) / 350) * 100)}%` }}
            />
          </div>
          <div className="card-subtext">
            <span>{isRegen ? '🔋 Regenerative Charge' : '⚡ Discharge Current'}</span>
          </div>
        </div>
      </div>

      {/* 7. Motor Speed */}
      <div className="gauge-card rpm-card">
        <div className="card-header">
          <Compass className="card-icon text-indigo" size={18} />
          <span className="card-label">MOTOR SPEED</span>
        </div>
        <div className="card-body">
          <div className="gauge-value text-indigo">
            {formatVal(rpm, 0)}
            <span className="gauge-unit">RPM</span>
          </div>
          <div className="gauge-bar-track">
            <div 
              className="gauge-bar-fill bg-indigo" 
              style={{ width: `${Math.min(100, (rpm / 10500) * 100)}%` }}
            />
          </div>
          <div className="card-subtext">
            <span>{formatVal(data.omega, 1, 'rad/s')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
