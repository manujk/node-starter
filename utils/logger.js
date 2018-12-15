const winston = require('winston');
const path = require('path');
const config = require('./config');

let transports = [];

transports.push(
    new winston.transports.DailyRotateFile({
        name: 'file',
        datePattern: '.yyyy-MM-ddTHH',
        filename: path.join(__dirname, 'logs', 'realtime-profile.log')
    })
);

if (process.env.NODE_ENV !== 'production') {
    transports.push(
        new winston.transports.Console()
    );
}

const logger = winston.createLogger({
    level: config.logger.level,
    format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD hh:mm:ss'}),
        winston.format.json()
    ),
    transports: transports,
});

module.exports = logger;
