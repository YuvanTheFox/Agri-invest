const express = require('express');
const axios = require('axios');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs'); // File system module
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));  // Serve frontend static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup file upload (using Multer)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Files will be saved in 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// ✅ Set `login.html` as the default landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// ✅ Route for Sign-Up Page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// ✅ Route for Home Page
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// ✅ Route for Index Page (if needed later)
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Route to handle form submission and save to file
app.post('/submit-form', upload.fields([{ name: 'aadhaar' }, { name: 'pan' }]), async (req, res) => {
    console.log('Received Form Data:', req.body); // Log submitted data

    const { name, email, mobile, soilType, location } = req.body;

    // Data to be saved
    const userData = {
        name,
        email,
        mobile,
        soilType,
        location,
        submittedAt: new Date().toISOString()
    };

    // Save data to a JSON file
    fs.appendFile('submissions.json', JSON.stringify(userData, null, 2) + ',\n', (err) => {
        if (err) {
            console.error('Error saving data:', err);
        } else {
            console.log('Data saved successfully to submissions.json');
        }
    });

    res.json({ message: 'Form submitted successfully!', receivedData: userData });
});

// ✅ Fetch weather data using OpenWeatherMap API
async function getWeatherData(location) {
    const apiKey = 'your_openweather_api_key';  // Replace with your actual API key
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
    return response.data;
}

// ✅ Suggest crops based on weather data
function suggestCropsBasedOnWeather(weatherData) {
    const temperature = weatherData.main.temp;
    const rainfall = weatherData.rain ? weatherData.rain['1h'] : 0;
    
    // Simple weather-based crop suggestions
    if (temperature >= 20 && temperature <= 30 && rainfall > 100) {
        return ['Rice', 'Wheat'];
    } else if (temperature > 30 && rainfall < 50) {
        return ['Maize', 'Sorghum'];
    } else {
        return ['Barley', 'Oats'];
    }
}

// ✅ Suggest crops based on soil type
function suggestCropsBasedOnSoil(soilType) {
    const soilCrops = {
        'Loamy': ['Rice', 'Wheat'],
        'Sandy': ['Maize', 'Barley'],
        'Clay': ['Paddy', 'Cotton']
    };

    return soilCrops[soilType] || [];
}

// ✅ Get market prices for crops (Placeholder API)
async function getMarketPrices(crops) {
    const marketPrices = {};
    
    for (const crop of crops) {
        const response = await axios.get(`https://api.example.com/market-prices/${crop}`);
        marketPrices[crop] = response.data.price;
    }
    
    return marketPrices;
}

// ✅ Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

