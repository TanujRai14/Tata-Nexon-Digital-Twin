import React from 'react';
import attackEvents from '../data/attack_events.json';
import { ATTACK_COLORS, formatTime } from '../utils/formatters';
import { AlertTriangle, Flag } from 'lucide-react';

export default function TimelineSlider({ currentTime, maxTime, onSeek }) {
  const percent = (currentTime / maxTime) * 100;

  const handleSliderChange = (e) => {
    const val = parseFloat(e.target.value);
    onSeek(val);
  };

  const handleEventClick = (evtTime) => {
    onSeek(evtTime);
  };

  const phaseTicks = [
    { time: 0, label: '0s Start' },
    { time: 15, label: '15s Cruise' },
    { time: 30, label: '30s Regen' },
    { time: 45, label: '45s Cyber Attacks' },
    { time: 90, label: '90s Recovery' },
    { time: 100, label: '100s End' }
  ];

  return (
    <div className="sticky-timeline-bar">
      <div className="timeline-track-wrapper">
        {/* Phase Region Background Highlights */}
        <div className="phase-regions">
          <div className="region region-1" style={{ left: '0%', width: '15%' }} title="Phase 1: Acceleration">Acc</div>
          <div className="region region-2" style={{ left: '15%', width: '15%' }} title="Phase 2: Cruising">Cruise</div>
          <div className="region region-3" style={{ left: '30%', width: '15%' }} title="Phase 3: Regen Braking">Regen</div>
          <div className="region region-4" style={{ left: '45%', width: '45%' }} title="Phase 4: Cyber Attacks">Cyber Attack Zone</div>
          <div className="region region-5" style={{ left: '90%', width: '10%' }} title="Phase 5: Recovery">Recovery</div>
        </div>

        {/* Attack Event Marker Chips */}
        <div className="attack-markers-bar">
          {attackEvents.map((evt) => {
            const leftPct = (evt.start / maxTime) * 100;
            const color = ATTACK_COLORS[evt.type_id] || '#ef4444';
            const isActive = currentTime >= evt.start && currentTime <= evt.end;

            return (
              <button
                key={evt.id}
                className={`event-marker-chip ${isActive ? 'active-pulse' : ''}`}
                style={{
                  left: `${leftPct}%`,
                  borderColor: color,
                  color: color
                }}
                onClick={() => handleEventClick(evt.start)}
                title={`${evt.signal_label} ${evt.type_name} (${evt.start}s - ${evt.end}s | Max Sev: ${evt.max_sev})`}
              >
                <AlertTriangle size={10} />
                <span className="chip-text">{evt.type_name} ({evt.signal})</span>
              </button>
            );
          })}
        </div>

        {/* Slider Input */}
        <input
          type="range"
          min="0"
          max={maxTime}
          step="0.05"
          value={currentTime}
          onChange={handleSliderChange}
          className="timeline-range-input"
        />

        {/* Progress Fill */}
        <div className="timeline-progress-fill" style={{ width: `${percent}%` }} />
      </div>

      {/* Ticks */}
      <div className="timeline-ticks">
        {phaseTicks.map((pt) => (
          <span
            key={pt.time}
            className="tick-label"
            style={{ left: `${(pt.time / maxTime) * 100}%` }}
            onClick={() => onSeek(pt.time)}
          >
            {pt.label}
          </span>
        ))}
      </div>
    </div>
  );
}
