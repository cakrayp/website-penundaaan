const { default: Axios } = require('axios');


module.exports = function(ip) {
    return Axios.request({
        method: "GET",
        url: 'https://ipinfo.io/' + ip,
        timeout: 120000,
        responseType: 'json'
    })
    .then(async({ data: location }) => {
        delete location.readme;
        return location;
    })
    .catch(async() => {
        return { code: 500, message: error.message };
    });
};