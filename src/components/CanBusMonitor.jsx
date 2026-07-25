import React from 'react';
import { ArrowDown, AlertCircle, CheckCircle2, Network } from 'lucide-react';
import { formatVal } from '../utils/formatters';

export default function CanBusMonitor({ data }) {
  if (!data) return null;

  const {
    te = 0,
    te_can = 0,
    det_te = 0,
    sev_te = 0,
    iq = 0,
    iq_can = 0,
    det_iq = 0,
    sev_iq = 0,
    v_batt = 0,
    vdc_can = 0,
    det_vdc = 0,
    sev_vdc = 0
  } = data;

  const diffTe = Math.abs(te - te_can);
  const isTeFault = det_te === 1 || diffTe > 5.0;

  const diffIq = Math.abs(iq - iq_can);
  const isIqFault = det_iq === 1 || diffIq > 5.0;

  const diffVdc = Math.abs(v_batt - vdc_can);
  const isVdcFault = det_vdc === 1 || diffVdc > 5.0;

  const comparisons = [
    {
      id: 'te',
      name: 'Torque (Te)',
      realVal: te,
      canVal: te_can,
      unit: 'Nm',
      diff: diffTe,
      isFault: isTeFault,
      sev: sev_te
    },
    {
      id: 'iq',
      name: 'q-Axis Current (Iq)',
      realVal: iq,
      canVal: iq_can,
      unit: 'A',
      diff: diffIq,
      isFault: isIqFault,
      sev: sev_iq
    },
    {
      id: 'vdc',
      name: 'DC Voltage (Vdc)',
      realVal: v_batt,
      canVal: vdc_can,
      unit: 'V',
      diff: diffVdc,
      isFault: isVdcFault,
      sev: sev_vdc
    }
  ];

  return (
    <div className="can-monitor-container">
      <div className="section-title-bar">
        <Network className="text-cyan" size={18} />
        <span>CAN BUS TELEMETRY VS SENSOR PHYSICAL DATA</span>
      </div>

      <div className="can-comparison-grid">
        {comparisons.map((c) => (
          <div key={c.id} className={`can-card ${c.isFault ? 'can-mismatch' : 'can-match'}`}>
            <div className="can-card-header">
              <span className="can-signal-name">{c.name}</span>
              {c.isFault ? (
                <span className="can-badge badge-fault">
                  <AlertCircle size={14} /> MISMATCH DETECTED
                </span>
              ) : (
                <span className="can-badge badge-ok">
                  <CheckCircle2 size={14} /> SYNCHRONIZED
                </span>
              )}
            </div>

            <div className="can-flow-body">
              <div className="val-box real-box">
                <span className="box-title">PHYSICAL SENSOR (REAL)</span>
                <span className="box-val text-cyan">{formatVal(c.realVal, 1, c.unit)}</span>
              </div>

              <div className="flow-arrow">
                <ArrowDown className={`arrow-icon ${c.isFault ? 'pulse-red text-red' : 'text-subtle'}`} size={20} />
                <span className="flow-label">CAN BUS</span>
              </div>

              <div className={`val-box can-box ${c.isFault ? 'box-error' : ''}`}>
                <span className="box-title">CAN BUS REPORTED</span>
                <span className={`box-val ${c.isFault ? 'text-red font-bold' : 'text-emerald'}`}>
                  {formatVal(c.canVal, 1, c.unit)}
                </span>
              </div>
            </div>

            <div className="can-card-footer">
              <span>Discrepancy Delta: <strong className={c.isFault ? 'text-red' : 'text-emerald'}>{formatVal(c.diff, 1, c.unit)}</strong></span>
              {c.isFault && <span>Severity: <strong className="text-amber">{formatVal(c.sev, 1)}</strong></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
