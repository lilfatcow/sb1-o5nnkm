class Logger {
  constructor(options = {}) {
    this.enabled = options.enabled !== false;
    this.level = options.level || 'info';
  }

  _log(level, message, meta = {}) {
    if (!this.enabled) return;

    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...meta
    };

    console.log(JSON.stringify(logEntry));
  }

  error(message, meta) {
    this._log('error', message, meta);
  }

  warn(message, meta) {
    this._log('warn', message, meta);
  }

  info(message, meta) {
    this._log('info', message, meta);
  }

  debug(message, meta) {
    if (this.level === 'debug') {
      this._log('debug', message, meta);
    }
  }
}

module.exports = new Logger({
  enabled: process.env.ENABLE_LOGGING !== 'false',
  level: process.env.LOG_LEVEL || 'info'
});