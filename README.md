# WebSocket Server for IoT Device Communication

This project implements a WebSocket server using Node.js, Express, and the `ws` (WebSocket) library. It facilitates real-time communication between IoT devices and web clients by managing device registrations, connections, and status updates.

## Features
- **Device Management**: Registers IoT devices and keeps track of their status.
- **Web Client Integration**: Allows web clients to monitor connected devices.
- **Real-Time Communication**: Devices and web clients receive updates instantly.
- **Automatic Device Synchronization**: Devices are dynamically added or removed based on their connection status.

## How It Works
1. Devices connect to the WebSocket server and send identification data.
2. Web clients connect and receive a list of active devices.
3. Real-time updates are sent to web clients whenever devices connect/disconnect.
4. Bidirectional communication enables devices and web clients to exchange messages.

## Technologies Used
- Node.js
- Express.js
- WebSocket (`ws` library)
- Python (`websockets`, `asyncio`)

## Setup & Execution
### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) and Python installed on your system.

### Node.js WebSocket Server
#### Install Dependencies
```bash
npm install express ws
```

#### Run the Server
```bash
node server.js
```

The WebSocket server starts on port `80`, ready to handle connections.

### Python WebSocket Server
#### Install Dependencies
```bash
pip install websockets asyncio
```

#### Run the Server
```bash
python server.py
```

The WebSocket server starts on port `80`, ready to handle connections.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries or contributions, feel free to reach out.
