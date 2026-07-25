/**
 * Formats a floating point value safely for display without scientific notation
 */
export function formatVal(val, decimals = 1, unit = '') {
  if (val === undefined || val === null || isNaN(val)) {
    return `0${unit ? ' ' + unit : ''}`;
  }
  // Treat tiny numerical noise (< 1e-4) as exact zero
  if (Math.abs(val) < 0.0001) {
    val = 0.0;
  }
  
  const formatted = Number(val).toFixed(decimals);
  return unit ? `${formatted} ${unit}` : formatted;
}

/**
 * Formats time in seconds to MM:SS.ms format
 */
export function formatTime(seconds) {
  if (seconds === undefined || seconds === null) return '00:00.00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 100);
  
  const mm = String(mins).padStart(2, '0');
  const ss = String(secs).padStart(2, '0');
  const mms = String(ms).padStart(2, '0');
  
  return `${mm}:${ss}.${mms}`;
}

/**
 * Attack type mappings
 */
export const ATTACK_TYPES = {
  0: 'None',
  1: 'Spoof Attack',
  2: 'Replay Attack',
  3: 'DoS Attack',
  4: 'Data Corruption'
};

export const ATTACK_COLORS = {
  1: '#a855f7', // Purple for Spoof
  2: '#f59e0b', // Amber for Replay
  3: '#ef4444', // Red for DoS
  4: '#06b6d4', // Cyan for Data Corruption
  0: '#10b981'  // Green for Normal
};

export function getSignalName(sig) {
  switch (sig) {
    case 'Te': return 'Motor Torque (Te)';
    case 'Iq': return 'q-Axis Current (Iq)';
    case 'Vdc': return 'DC Bus Voltage (Vdc)';
    default: return sig;
  }
}

/**
 * Returns simulation phase based on time (seconds)
 */
export function getSimPhase(time) {
  if (time < 15.0) {
    return { name: 'Startup & Acceleration', icon: '⚡', color: '#3b82f6', phase: 1 };
  } else if (time < 30.0) {
    return { name: 'Cruising & Steady State', icon: '🚗', color: '#10b981', phase: 2 };
  } else if (time < 45.0) {
    return { name: 'Regenerative Braking', icon: '🔋', color: '#06b6d4', phase: 3 };
  } else if (time < 90.0) {
    return { name: 'Cyber Security Attack Vector', icon: '⚠️', color: '#ef4444', phase: 4 };
  } else {
    return { name: 'System Recovery & Normal State', icon: '✅', color: '#10b981', phase: 5 };
  }
}
