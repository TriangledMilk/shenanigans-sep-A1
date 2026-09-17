// import Express library and activate it
const express = require('express');
const app = express();
// publish our static frontend files
app.use('/',express.static('./public')) 
// for some reason when i had the stuff in a public folder github freaked the fuck out
// gooood fucking god bruh

// listen for requests from the frontend
app.get("/silver-price", async (req, res) => {
    // assemble a url for the Metals Sentinel API
    const url = new URL('https://metal-sentinel.p.rapidapi.com/silver-price');
    url.searchParams.set('currency', 'CAD');

    let options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': process.env.RAPIDAPI_KEY, 
			'x-rapidapi-host': 'metal-sentinel.p.rapidapi.com',
		    'Content-Type': 'application/json'
        }
    };// end of options object

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(json);
        }

        // Relay the results back to the frontend.
        res.json(json);
    } catch (error) {
        console.error('Silver price request failed:', error);
        res.status(500).json({ error: 'Unable to fetch the silver price.' });
    }
}); 



// Start Express
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Express is now Live.`) 
    console.log(`Public URL: ${process.env.PUBLIC_URL || `http://localhost:${port}`}`)
}); 

