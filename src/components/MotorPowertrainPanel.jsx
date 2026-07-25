import React from 'react';
import { Gauge, Cpu, Flame, Zap, ShieldAlert } from 'lucide-react';
import { formatVal } from '../utils/formatters';

export default function MotorPowertrainPanel({ data }) {
  if (!data) return null;

  const {
    te = 0,
    id = 0,
    iq = 0,
    iq_ref = 0,
    vd = 0,
    vq = 0,
    rpm = 0
  } = data;

  const iqTrackingErr = Math.abs(iq - iq_ref);

  return (
    <div className="motor-panel-container">
      <div className="section-title-bar">
        <Cpu className="text-amber" size={18} />
        <span>PERMANENT MAGNET SYNCHRONOUS MOTOR (PMSM) D-Q FIELD DYNAMICS</span>
      </div>

      <div className="motor-grid">
        {/* Torque Card */}
        <div className="motor-card">
          <div className="m-card-hdr">
            <Flame size={16} className="text-amber" />
            <span>Electromagnetic Torque (Te)</span>
          </div>
          <div className="m-card-val text-amber">{formatVal(te, 1, 'Nm')}</div>
          <div className="m-card-bar">
            <div className="m-bar-fill bg-amber" style={{ width: `${Math.min(100, (Math.abs(te)/1300)*100)}%` }} />
          </div>
          <div className="m-card-sub">Shaft Output Torque</div>
        </div>

        {/* Id Current */}
        <div className="motor-card">
          <div className="m-card-hdr">
            <Zap size={16} className="text-cyan" />
            <span>d-Axis Current (Id)</span>
          </div>
          <div className="m-card-val text-cyan">{formatVal(id, 1, 'A')}</div>
          <div className="m-card-bar">
            <div className="m-bar-fill bg-cyan" style={{ width: `${Math.min(100, (Math.abs(id)/500)*100)}%` }} />
          </div>
          <div className="m-card-sub">Flux Weakening Vector</div>
        </div>

        {/* Iq Current */}
        <div className="motor-card">
          <div className="m-card-hdr">
            <Zap size={16} className="text-blue" />
            <span>q-Axis Current (Iq)</span>
          </div>
          <div className="m-card-val text-blue">{formatVal(iq, 1, 'A')}</div>
          <div className="m-card-bar">
            <div className="m-bar-fill bg-blue" style={{ width: `${Math.min(100, (Math.abs(iq)/1200)*100)}%` }} />
          </div>
          <div className="m-card-sub">Torque Producing Current</div>
        </div>

        {/* Iq Reference */}
        <div className="motor-card">
          <div className="m-card-hdr">
            <Gauge size={16} className="text-indigo" />
            <span>Iq Reference (Iq_ref)</span>
          </div>
          <div className="m-card-val text-indigo">{formatVal(iq_ref, 1, 'A')}</div>
          <div className="m-card-bar">
            <div className="m-bar-fill bg-indigo" style={{ width: `${Math.min(100, (Math.abs(iq_ref)/1200)*100)}%` }} />
          </div>
          <div className="m-card-sub">FOC Command Reference</div>
        </div>

        {/* Vd Voltage */}
        <div className="motor-card">
          <div className="m-card-hdr">
            <Zap size={16} className="text-purple" />
            <span>d-Axis Voltage (Vd)</span>
          </div>
          <div className="m-card-val text-purple">{formatVal(vd, 1, 'V')}</div>
          <div className="m-card-bar">
            <div className="m-bar-fill bg-purple" style={{ width: `${Math.min(100, (Math.abs(vd)/300)*100)}%` }} />
          </div>
          <div className="m-card-sub">Stator d-Vector Voltage</div>
        </div>

        {/* Vq Voltage */}
        <div className="motor-card">
          <div className="m-card-hdr">
            <Zap size={16} className="text-emerald" />
            <span>q-Axis Voltage (Vq)</span>
          </div>
          <div className="m-card-val text-emerald">{formatVal(vq, 1, 'V')}</div>
          <div className="m-card-bar">
            <div className="m-bar-fill bg-emerald" style={{ width: `${Math.min(100, (Math.abs(vq)/300)*100)}%` }} />
          </div>
          <div className="m-card-sub">Stator q-Vector Voltage</div>
        </div>
      </div>
    </div>
  );
}
