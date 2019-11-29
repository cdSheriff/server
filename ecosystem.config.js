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
    		cron_restart: "* */5 * * *",
    		watch: false,
    		autorestart: false
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