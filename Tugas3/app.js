const http = require("http");
const url = require("url");
const winston = require("winston");
require("winston-logstash");

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.Logstash({
      port: 11598,
      host: "08e1de76-d5e5-40f2-b0b9-974a6d26127b-ls.logit.io",
      ssl_enable: true,
      max_connect_retries: -1,
    }),
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// winston.add();

const host = "localhost";
const port = 8000;

const requestListener = function (req, res) {
  const param = url.parse(req.url, true).query["param"];
  logger.error('This is a test error log message');
  res.writeHead(200);
  if (param) {
    // winston.log(param, { custom: 'field', Environment: 'local' });
    res.end(param);
    return;
  }
  res.end("Please input parameter");
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
