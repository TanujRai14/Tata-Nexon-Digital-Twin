import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { LineChart, Activity, Zap, Flame, Battery } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function TelemetryGraphs({ fullData, currentIndex, windowSize = 300 }) {
  if (!fullData || fullData.length === 0) return null;

  // Compute sliding window slice (e.g. 300 points = 15 seconds of 0.05s resolution data)
  const startIdx = Math.max(0, currentIndex - windowSize);
  const slice = fullData.slice(startIdx, currentIndex + 1);

  const labels = slice.map((d) => `${d.time.toFixed(1)}s`);

  // Chart options template
  const createOptions = (titleStr, yMin = undefined, yMax = undefined) => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 0 }, // Disable Chart.js animation for instant 60fps playback sync!
    interaction: { mode: 'index', intersect: false },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b', maxTicksLimit: 8, font: { size: 10 } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } },
        min: yMin,
        max: yMax
      }
    },
    plugins: {
      legend: {
        labels: { color: '#cbd5e1', boxWidth: 12, font: { size: 11 } }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        borderWidth: 1,
        titleColor: '#38bdf8',
        bodyColor: '#f8fafc'
      }
    }
  });

  // 1. Torque Chart Data
  const torqueData = {
    labels,
    datasets: [
      {
        label: 'Real Torque Te (Nm)',
        data: slice.map((d) => d.te),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        fill: true
      },
      {
        label: 'CAN Torque Te_CAN (Nm)',
        data: slice.map((d) => d.te_can),
        borderColor: '#ef4444',
        borderDash: [4, 4],
        borderWidth: 2,
        pointRadius: 0
      }
    ]
  };

  // 2. Battery Electrical Chart Data
  const battElecData = {
    labels,
    datasets: [
      {
        label: 'Battery Voltage (V)',
        data: slice.map((d) => d.v_batt),
        borderColor: '#38bdf8',
        borderWidth: 2,
        pointRadius: 0,
        yAxisID: 'y'
      },
      {
        label: 'Battery Current (A)',
        data: slice.map((d) => d.i_batt),
        borderColor: '#10b981',
        borderWidth: 2,
        pointRadius: 0,
        yAxisID: 'y1'
      }
    ]
  };

  const battElecOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 0 },
    interaction: { mode: 'index', intersect: false },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b', maxTicksLimit: 8, font: { size: 10 } }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: { display: true, text: 'Voltage (V)', color: '#38bdf8', font: { size: 10 } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#38bdf8', font: { size: 10 } }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: { display: true, text: 'Current (A)', color: '#10b981', font: { size: 10 } },
        grid: { drawOnChartArea: false },
        ticks: { color: '#10b981', font: { size: 10 } }
      }
    },
    plugins: {
      legend: { labels: { color: '#cbd5e1', boxWidth: 12, font: { size: 11 } } }
    }
  };

  // 3. SOC vs EKF Chart Data
  const socData = {
    labels,
    datasets: [
      {
        label: 'Actual BMS SOC (%)',
        data: slice.map((d) => d.soc),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        fill: true
      },
      {
        label: 'EKF Estimated SOC (%)',
        data: slice.map((d) => d.soc_ekf),
        borderColor: '#a855f7',
        borderWidth: 2,
        pointRadius: 0
      }
    ]
  };

  // 4. Speed & Motor RPM Chart Data
  const speedData = {
    labels,
    datasets: [
      {
        label: 'Vehicle Speed (km/h)',
        data: slice.map((d) => d.speed_kmh),
        borderColor: '#06b6d4',
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
        backgroundColor: 'rgba(6, 182, 212, 0.1)'
      },
      {
        label: 'q-Axis Current Iq (A)',
        data: slice.map((d) => d.iq),
        borderColor: '#6366f1',
        borderWidth: 1.5,
        pointRadius: 0
      }
    ]
  };

  return (
    <div className="telemetry-graphs-container">
      <div className="section-title-bar">
        <LineChart className="text-cyan" size={18} />
        <span>REAL-TIME SLIDING WINDOW SIGNAL TELEMETRY (LAST 15 SECONDS)</span>
      </div>

      <div className="graphs-grid">
        {/* Graph 1: Torque */}
        <div className="graph-card">
          <div className="graph-card-header">
            <Flame className="text-amber" size={16} />
            <span>Motor Torque: Real vs CAN Injected Fault</span>
          </div>
          <div className="graph-canvas-box">
            <Line data={torqueData} options={createOptions('Torque')} />
          </div>
        </div>

        {/* Graph 2: Battery Electrical */}
        <div className="graph-card">
          <div className="graph-card-header">
            <Activity className="text-cyan" size={16} />
            <span>High Voltage Battery (Voltage & Current)</span>
          </div>
          <div className="graph-canvas-box">
            <Line data={battElecData} options={battElecOptions} />
          </div>
        </div>

        {/* Graph 3: SOC vs EKF */}
        <div className="graph-card">
          <div className="graph-card-header">
            <Battery className="text-emerald" size={16} />
            <span>State of Charge: Ground Truth vs Extended Kalman Filter</span>
          </div>
          <div className="graph-canvas-box">
            <Line data={socData} options={createOptions('SOC', 70, 85)} />
          </div>
        </div>

        {/* Graph 4: Speed & Powertrain */}
        <div className="graph-card">
          <div className="graph-card-header">
            <Zap className="text-indigo" size={16} />
            <span>Vehicle Dynamics & Quadrature Current</span>
          </div>
          <div className="graph-canvas-box">
            <Line data={speedData} options={createOptions('Speed Dynamics')} />
          </div>
        </div>
      </div>
    </div>
  );
}
