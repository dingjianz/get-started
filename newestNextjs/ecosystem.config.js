module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: 'gaia',
      script: './server.js',
      max_memory_restart: '200M',
      exec_mode: 'cluster',
      instances: 2,
      env: {
        PORT: 3010,
        COMMON_VARIABLE: 'true',
      },
      env_dev: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
