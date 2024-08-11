import log from 'loglevel';

const originalFactory = log.methodFactory;

log.methodFactory = (methodName, logLevel, loggerName) => {
  const rawMethod = originalFactory(methodName, logLevel, loggerName);

  return (...args) => {
    rawMethod(...args);

    // Send logs to your server
    fetch('http://16.171.46.36:3001/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level: methodName, message: args.join(' ') }),
    }).catch((error) => console.error('Logging error:', error));
  };
};

log.setLevel(process.env.REACT_APP_LOG_LEVEL || 'info');

export default log;
