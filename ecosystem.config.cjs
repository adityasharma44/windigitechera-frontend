module.exports = {
  apps: [{
    name: 'frontend',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/html/frontend',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    interpreter: '/home/ubuntu/.nvm/versions/node/v22.20.0/bin/node'
  }]
};
