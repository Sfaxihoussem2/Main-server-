# Main IoT WebSocket Server

**Central WebSocket server for real-time communication between IoT devices and web clients, including device registration and status management.**

---

## Project Overview

This server acts as a hub for IoT devices (ESP32, sensors, cameras, locks, etc.) and browser-based dashboards. Devices connect, identify themselves, and exchange messages. Web clients receive live updates about connected devices and can send commands.

It is designed as the backend communication layer for a multi-device IoT ecosystem.

---

## Key Features

- Device registration and connection tracking
- Real-time status updates (connect / disconnect)
- Bidirectional messaging between devices and web clients
- Dynamic list of active devices pushed to clients
- Built with Node.js, Express and the `ws` library
- Alternative Python implementation notes included

---

## How It Works

1. An IoT device opens a WebSocket connection and sends identification data.
2. The server registers the device and notifies connected web clients.
3. Web clients receive the current list of active devices and live updates.
4. Messages can flow in both directions (commands to devices, telemetry to dashboards).

---

## Technologies

| Component     | Stack                          |
|---------------|--------------------------------|
| Runtime       | Node.js                        |
| HTTP          | Express                        |
| WebSocket     | `ws` library                   |
| Alternative   | Python (`websockets` + asyncio)|

---

## Getting Started

### Prerequisites
- Node.js

### Installation & Run

```bash
git clone https://github.com/Sfaxihoussem2/Main-server-.git
cd Main-server-
npm install express ws   # if not already present
node mainserver.js
```

The server listens on the port defined in the code (commonly port 80 in the current implementation).

---

## Repository Contents

- `mainserver.js` — Main Node.js WebSocket + Express server
- `README.md`

---

## Integration Ideas

This server can serve as the central nervous system for:
- RFID access control events
- ESP32-CAM streams (in coordination with the dedicated camera server)
- Smart home device status
- Sea Drone telemetry
- Custom dashboards

---

## Future Improvements

- Device authentication and authorization
- Persistent device registry (database)
- Topic / room based messaging (MQTT-like semantics over WebSocket)
- Secure WebSocket (WSS) and HTTPS
- Metrics and connection logging
- Docker / process manager (PM2) deployment examples

---

## Author

**Houssem Eddine Sfaxi**  
Embedded Systems & IoT Engineer  
[GitHub](https://github.com/Sfaxihoussem2) · [Portfolio](https://sfaxihoussem2.github.io/My-portfolio/) · [LinkedIn](https://www.linkedin.com/in/houssem-sfaxi-3272a9280)

---

## License

Portfolio and educational project.
