const axios = require('axios');

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

// Function to send data to the API
const sendDataToAPI = async () => {
    try {
        const data = generateStackData();
        const response = await axios.post(
            'https://api.ocems.ebhoom.com/api/handleSaveMessage',
            data
        );
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data:', error.message);
    }
};

// Send data every 1 minute (60000 milliseconds)
setInterval(sendDataToAPI, 60000);

console.log('Data transmission started. Sending data every 1 minute...');
