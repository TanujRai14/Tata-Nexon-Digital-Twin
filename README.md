# 🚗 Tata Nexon EV Digital Twin

An end-to-end **Electric Vehicle Digital Twin** inspired by the **Tata Nexon EV**, developed using **MATLAB/Simulink** and an interactive **React-based dashboard**. The project combines EV powertrain modeling, battery estimation, regenerative braking, CAN communication, cybersecurity fault injection, and real-time telemetry visualization into a unified digital twin platform.

---

## 🌐 Live Demo

🔗 **Dashboard:** https://tata-nexon-digital-twin.vercel.app/

---

## 📌 Project Overview

Modern electric vehicles generate thousands of signals every second from their motors, batteries, sensors, and ECUs. A Digital Twin provides a virtual representation of the physical vehicle, enabling monitoring, diagnostics, control, and fault analysis in real time.

This project recreates the core subsystems of an EV and streams simulated telemetry to an interactive dashboard, allowing users to visualize vehicle performance and cybersecurity events.

---

## ✨ Features

- ⚡ PMSM-based Electric Vehicle Powertrain
- 🎯 Field-Oriented Control (FOC)
- 🔋 Battery Pack Modeling
- 📈 Extended Kalman Filter (EKF) based SOC Estimation
- ♻️ Regenerative Braking
- 📡 CAN Bus Communication
- 🛡️ Cyber Attack Simulation
  - Spoof Attack
  - Replay Attack
  - Denial of Service (DoS)
  - Data Corruption
- 🚨 Real-Time Fault Detection
- 📊 Interactive Telemetry Dashboard
- 📉 Real-Time Battery & Motor Monitoring
- 📂 Telemetry Export to Excel

---

# 🏗️ System Architecture

```
               Driver Inputs
                     │
                     ▼
            Speed Controller (PI)
                     │
                     ▼
             Current Controller
                     │
                     ▼
             Voltage Controller
                     │
                     ▼
               PMSM Motor Model
                     │
                     ▼
            Vehicle Dynamics Model
                     │
                     ▼
              Battery Pack Model
                     │
                     ▼
             EKF SOC Estimation
                     │
                     ▼
              CAN Communication
                     │
                     ▼
        Cyber Attack Injection Layer
                     │
                     ▼
           Fault Detection Module
                     │
                     ▼
          Telemetry Export (Excel)
                     │
                     ▼
      Interactive Digital Twin Dashboard
```

---

# 🚗 Dashboard Features

The web dashboard provides real-time visualization of vehicle telemetry including:

- Vehicle Speed
- Motor Torque
- Battery Voltage
- Battery Current
- State of Charge (SOC)
- EKF Estimated SOC
- Motor Current
- Power Flow
- CAN Signals
- Fault Status
- Cyber Attack Timeline
- Telemetry Playback Controls

---

# 🔒 Cybersecurity Module

The Digital Twin supports simulation of common automotive CAN attacks.

| Attack | Description |
|---------|-------------|
| Spoof Attack | Fake sensor values injected onto the CAN Bus |
| Replay Attack | Previously recorded CAN messages replayed |
| Denial of Service | Communication interruption |
| Data Corruption | Random corruption of transmitted signals |

The dashboard detects these attacks in real time and visualizes their severity.

---

# 📊 Battery Management

Implemented battery functionality includes:

- Battery Voltage Monitoring
- Battery Current Monitoring
- Power Estimation
- Extended Kalman Filter
- State of Charge Estimation
- Regenerative Charging

---

# ⚙️ Motor Control

The EV powertrain is controlled using **Field-Oriented Control (FOC)** for the PMSM motor.

Implemented controllers include:

- Speed PI Controller
- d-axis Current Controller
- q-axis Current Controller
- Voltage Limiter

---

# 🛠️ Technologies Used

## Simulation

- MATLAB
- Simulink
- Simscape Electrical
- Vehicle Network Toolbox

## Control

- PMSM
- Field-Oriented Control
- PI Controllers
- Extended Kalman Filter

## Dashboard

- JavaScript
- Tailwind CSS
- Plotly

## Data

- Python
- Pandas
- Excel Telemetry

---

# 📂 Repository Structure

```
├── Dashboard/
│   ├── frontend/
│   ├── backend/
│   └── assets/
│
├── MATLAB/
│   ├── Final_Tata_Nexon_EV_Model.slx
│   ├── MATLAB Functions
│   └── Telemetry Export
│
├── Images/
│
└── README.md
```

---

# 🚀 Future Improvements

- Battery Thermal Model
- Battery SOH Estimation
- Cell Balancing Simulation
- Predictive Maintenance
- AI-based Fault Classification
- Cloud-Based Digital Twin
- OTA Diagnostics
- Fleet Monitoring

---

# 🎥 Demonstration

The dashboard demonstrates:

- Vehicle Acceleration
- Cruise Operation
- Regenerative Braking
- Battery Charging
- CAN Communication
- Cyber Attack Detection
- Real-Time Telemetry Visualization

---

# 👨‍💻 Author

**Tanuj Rai**

Electrical & Electronics Engineering  
Vellore Institute of Technology, Chennai

---

# ⭐ If you found this project interesting...

Please consider giving the repository a ⭐ on GitHub.

It helps others discover the project and motivates future development.

---

## 📬 Connect with Me

**LinkedIn:** www.linkedin.com/in/tanuj-rai-9b968828b

**GitHub:** https://github.com/TanujRai14

**Live Dashboard:** https://tata-nexon-digital-twin.vercel.app/
