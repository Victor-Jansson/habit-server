module.exports = {
    apps: [{
      name: "habit",
      script: "index.js",
      env: {
        PORT: "8080",
      }
    }],
    deploy: {
      aws: {
        key: "/Users/victor/victor2.pem",
        user: "ec2-user",
        host: ["34.236.148.171"],
        ref: "origin/master",
        repo: "git@github.com:Victor-Jansson/habit-server.git",
        path: "/home/ec2-user/server",
        'ssh_options': 'ForwardAgent=yes',
        "post-deploy": "npm install --production && pm2 startOrReload ecosystem.config.js"
      },
    }
  }