const appRoot = require('app-root-path');
const { createLogger, format, transports, addColors } = require('winston');
const { combine, timestamp, prettyPrint, colorize} = format;

var options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true,
    },
    console: {
        level: 'info',
        handleExceptions: false,
        json: true,
        colorize: true,
    },
};
var logger = createLogger({
    format: combine(
        timestamp(),
        prettyPrint(),
        colorize()
    ),
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console),
    ],
    exitOnError: false, 
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};
module.exports = logger;