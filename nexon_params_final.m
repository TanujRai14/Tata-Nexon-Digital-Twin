% =========================================
% Nexon EV Digital Twin — Parameter File
% nexon_params.m
% =========================================

%% Battery Pack
V_nom    = 350;
V_max    = 403;
V_min    = 280;
Q_nom    = 116;
R_int    = 0.12;
SOC_init = 0.8;

%% Motor
P_motor   = 106400;
T_max     = 215;
omega_max = 942;

% --- PMSM Block Parameters ---
N  = 6;         % Number of pole pairs
PM = 0.03;      % Permanent magnet flux linkage (Wb)
Ld = 0.0002;    % Stator d-axis inductance (H)
Lq = 0.0002;    % Stator q-axis inductance (H)
Rs = 0.013;     % Stator resistance per phase (Ohm)

% Mechanical Parameters 
% Note: If the solver throws an error about algebraic loops or infinite acceleration, 
% you may need to change inertia from 0 to a small value like 0.1.
J_rotor = 0;    % Rotor inertia (kg*m^2)
B_rotor = 0;    % Rotor damping (N*m/(rad/s))

%% Vehicle
m_veh   = 1600;
r_wheel = 0.329;
Cd      = 0.36;
A_front = 2.3;
Crr     = 0.012;

%% SOC breakpoints — 7 points matching default block size
SOC_vec = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1.0];

%% Temperature breakpoints — 3 points in Kelvin matching block default
T_vec = [278, 293, 313];   % 5, 20, 40 degC

%% OCV table — must be [7 x 3] = [length(SOC_vec) x length(T_vec)]
% Same OCV values at all temperatures for now
OCV_col = [300; 318; 330; 341; 355; 375; 403];  % 7x1 at nominal temp
OCV_table = [OCV_col, OCV_col, OCV_col];         % 7x3

%% R0 table — must be [7 x 3]
R0_table = R_int * ones(7, 3);                   % 7x3
%% EKF Battery ECM Parameters
R0_ekf  = 0.12;        % Series resistance (Ohm)
R1_ekf  = 0.05;        % Polarization resistance (Ohm)
C1_ekf  = 3600;        % Polarization capacitance (F)
Q_ekf   = 116 * 3600;  % Capacity in Coulombs (116 Ah)
dt_ekf  = 0.05;        % Sample time matching your ZOH (s)

%% EKF Noise Covariance Tuning
Q_noise = diag([1e-6, 1e-5]);   % Process noise [SOC, Vc1]
R_noise = 0.01;                  % Measurement noise variance (V^2)
P0_ekf  = diag([0.01, 0.001]);  % Initial error covariance

%% EKF Initial conditions — deliberately wrong to show convergence
SOC_ekf_init  = 0.6;   % Start wrong (true is 0.8) — shows EKF correcting
Vc1_ekf_init  = 0.0;
%% Fault Injection Schedule — randomized but reproducible, single source of truth
%% ============================================================
%% Fault Injection Schedule (DEBUG VERSION - SINGLE FAULT)
%% ============================================================

% Columns:
% [signal_index, fault_type, start_time, end_time]
%
% signal_index:
% 1 = Te_CAN
% 2 = Iq_CAN
% 3 = Vdc_CAN
%
% fault_type:
% 1 = Spoof
% 2 = Replay
% 3 = DoS
% 4 = Corruption

%% Centralized Fault Schedule
% Columns: [signal_idx, fault_type, start_time, end_time]
% Signal:  1=Te  2=Iq  3=Vdc
% Type:    1=spoof  2=replay  3=dos  4=corruption

fault_schedule = [
%  sig  type  start   end
    1,   1,   18.0,  20.5;   % Te    spoof
    1,   4,   45.0,  47.0;   % Te    corruption
    2,   2,   25.0,  27.5;   % Iq    replay
    2,   3,   60.0,  62.0;   % Iq    dos
    3,   3,   33.0,  35.0;   % Vdc   dos
    3,   1,   72.0,  74.5;   % Vdc   spoof
    1,   3,   50.0,  51.5;   % Te    dos
    2,   4,   80.0,  82.0;   % Iq    corruption
    3,   2,   88.0,  90.0;   % Vdc   replay
];

disp('=== Fault Schedule ===');
disp('sig(1=Te,2=Iq,3=Vdc) | type(1=spoof,2=replay,3=dos,4=corrupt) | start | end');
disp(fault_schedule);

disp('=================================================');
disp('Fault Schedule');
disp('=================================================');
disp(fault_schedule);
disp('Signal 1 = Te_CAN');
disp('Fault    = Spoof');
disp('Start    = 5 s');
disp('End      = 7 s');
disp('=================================================');

%% Verify sizes
disp('Parameter sizes:');
disp(['SOC_vec:   ' num2str(size(SOC_vec))]);
disp(['T_vec:     ' num2str(size(T_vec))]);
disp(['OCV_table: ' num2str(size(OCV_table))]);
disp(['R0_table:  ' num2str(size(R0_table))]);