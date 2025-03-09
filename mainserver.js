"use strict";

const serverPort = 80,
    http = require("http"),
    express = require("express"),
    app = express(),
    server = http.createServer(app),
    WebSocket = require("ws"),
    websocketServer = new WebSocket.Server({ server });

// Client maps
const clients = new Map();
const devices = new Map();
const webClients = new Map();

// Function to send a JSON stringified message to a specific client
function sendMessage(client, message) {
    client.send(JSON.stringify(message));
}

// Function to handle the 'checkconnection' type
function handleCheckConnection(client, messageParsed) {
    if (messageParsed.type === "checkconnection") {
        // Send devices to the client
        sendMessage(client, { devices: Array.from(devices.values()) });
    }
}

// Function to handle the 'device' type
function handleDeviceType(client, messageParsed) {
    if (messageParsed.type === "device") {
        // Add device to devices map
        devices.set(messageParsed.device.id, messageParsed.device);

        // Send devices to all webClients
        webClients.forEach((webClient) => {
            sendMessage(webClient, { devices: Array.from(devices.values()) });
        });
    }
}

// Function to handle the 'web' type
function handleWebType(client, messageParsed) {
    if (messageParsed.type === "web") {
        // Add webClient to webClients map
        webClients.set(client, true);

        // Send devices to the webClient
        sendMessage(client, { devices: Array.from(devices.values()) });

        // Send a "hello" message from web clients
        sendMessage(client, { message: "Hello from web" });
    }
}

// Function to handle the 'disconnect' event
function handleDisconnect(client) {
    // Check if the disconnected client is a webClient
    if (webClients.has(client)) {
        // Remove webClient from webClients map
        webClients.delete(client);

        // Send updated devices to all remaining webClients
        webClients.forEach((webClient) => {
            sendMessage(webClient, { devices: Array.from(devices.values()) });
        });
    } else {
        // Check if the disconnected client is a device
        devices.forEach((device, deviceId) => {
            if (device.client === client) {
                // Remove device from devices map
                devices.delete(deviceId);

                // Send updated devices to all webClients
                webClients.forEach((webClient) => {
                    sendMessage(webClient, { devices: Array.from(devices.values()) });
                });
            }
        });
    }
}

// When a websocket connection is established
websocketServer.on('connection', (webSocketClient) => {
    // Send feedback to the incoming connection
    webSocketClient.send(JSON.stringify({ connection: "ok" }));

    // When a message is received
    webSocketClient.on('message', (message) => {
        try {
            const messageParsed = JSON.parse(message);

            // Add the client to the clients map
            clients.set(webSocketClient, true);

            // Handle different message types
            handleCheckConnection(webSocketClient, messageParsed);
            handleDeviceType(webSocketClient, messageParsed);
            handleWebType(webSocketClient, messageParsed);

        } catch (error) {
            console.error("Error parsing message:", error);
        }
    });

    // When the connection is closed
    webSocketClient.on('close', () => {
        handleDisconnect(webSocketClient);
    });

    // Send a "hello" message from device clients
    devices.forEach((device, deviceId) => {
        if (device.client === webSocketClient) {
            sendMessage(webSocketClient, { message: "Hello from device" });
        }
    });
});

// Start the web server
server.listen(serverPort, () => {
  console.log(`Websocket server started on port ` + serverPort);
});
