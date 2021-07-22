const config = {
	// Settings of the bot
	owners: ["263246215859142656"],
	presence: {
		activity: { 
			name: `.help`,  
			type: `PLAYING`
		  },
		status: 'online'
	},

	// MongoDB default settings
	DEFAULTSETTINGS: {
		prefix: "."
	}
}

module.exports = config;
