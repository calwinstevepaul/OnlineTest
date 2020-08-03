module.exports = {
  apps : [{
    name: 'OnlineTestBackend',
    script: 'index.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: 'one two',
    instances: 0,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '167.71.236.57',
      ref  : 'origin/master',
      repo : 'git@github.com:calwinsteve/OnlineTestBackend.git',
      path : '/var/www/OnlineTestBackend',
      "pre-deploy": "git reset --hard",
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
