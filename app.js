const mqtt = require('mqtt');

// MQTT broker connection options
const options = {
    host: '3.110.40.48',  // Your MQTT broker's public IP
    port: 1883,            // Default MQTT port
    clientId: 'EbhoomPublisher',
    protocol: 'mqtt',       // Use 'mqtt' protocol
    keepalive: 30,          // Keep connection alive for 30 seconds
    clean: true,            // Use clean session
};

// Connect to the MQTT broker
const client = mqtt.connect(options);

// Helper function to generate a random value within a specific range
const getRandomValueInRange = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

// Function to generate the provided stack data dynamically
const generateStackData = () => ({
    product_id: "8",
    companyName: "Seafood Park (India) Ltd & Sea Lab",
    userName: "SFP008",
    industryType: "STP/ETP",
    mobileNumber: "8086090680",
    email: "george.sealab@gmail.com",
    stacks: [
        {
            stackName: 'Effluent_SeafoodLab_Monitoring',
            stationType: 'effluent',
            ph: getRandomValueInRange(6, 6.9),
            temperature: getRandomValueInRange(28, 35),
            BOD: getRandomValueInRange(9, 10.85),
            COD: getRandomValueInRange(23, 25.85),
            TSS: getRandomValueInRange(12, 17.85),
        },
    ]
});

// Event when the client connects to the broker
client.on('connect', () => {
    console.log('Connected to MQTT broker!');

    const topic = 'ebhoomPub';

    // Publish the message every 10 seconds
    setInterval(() => {
        const messagePayload = generateStackData();
        const message = JSON.stringify(messagePayload);

        client.publish(topic, message, { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error('Publish error:', error);
            } else {
                console.log(`Message published to topic "${topic}":`, message);
            }
        });
    }, 60000); // 10 seconds interval
});

// Handle connection errors
client.on('error', (error) => {
    console.error('Connection error:', error);
    client.end();
});

// Handle disconnection
client.on('close', () => {
    console.log('Disconnected from MQTT broker');
});
