const express = require('express');
const app = express();
const PORT = process.env.PORT || 30000;
const iplookup = require('./lib/iplookup');
const requestIp = require('request-ip');


// Configure express
app.use(express.static('public'));
app.set('view engine', "ejs");
app.use(requestIp.mw());


// Router Express 
app.get("*", async(req, res) => {
    let iplookup_ = await iplookup(req.clientIp);
    let { ip, city, country, org, timezone } = iplookup_;
    let messageHandler = {
        ID: {
            title_web: "Akses ini ditunda Sementara",
        },
        EN: {
            title_web: "temporary delay to Access"
        }
    }
    res.render('../views/index', {
        title: messageHandler[country]?.title_web,
        geolocation: iplookup_
    });
});


app.listen(PORT, function() {
    console.log("App running on port:", PORT);
})