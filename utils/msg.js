//Luxon
const { DateTime } = require("luxon");

//Format message
const formatMessage = (username, text) => {
    return {
        username,
        text,
        time: DateTime.now().toLocaleString(DateTime.TIME_SIMPLE)
    }
}

module.exports = formatMessage