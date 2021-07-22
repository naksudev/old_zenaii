const config = {
	// Settings of the bot
	owners: ["263246215859142656"],
	presence: {
		activity: { 
			name: `d!help`,  
			type: `PLAYING`
		  },
		status: 'online'
	},

	// MongoDB default settings
	DEFAULTSETTINGS: {
		prefix: "d!"
	}
}

module.exports = config;
