module.exports = {
	apps: [
		{
			name: 'tutorial',
			script: './index.js'
		},
		{
			name: 'mqtt',
			script: './mqtt.js'
		},
		{
			name: 'Wednesday',
			script: './testSend.js',
			instances: 1,
    		cron_restart: "* * * * *",
    		watch: false,
    		restart_delay: 43200000 // this ensures it runs only once in the approved minute
    		// "cron_restart": "41 * * * *", // restart every minute (used for testing)
    		// autorestart: false
		}
	],
	deploy: {
		production: {
			user: 'ubuntu',
			host: 'ec2-13-58-157-199.us-east-2.compute.amazonaws.com',
			key: '~/.ssh/test.pem',
			ref: 'origin/master',
			repo: 'https://github.com/cdSheriff/server.git',
			path: '/home/ubuntu/server',
			'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
		}
	}
}