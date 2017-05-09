module.exports = {
	'rest' : {
		'secret': 'aguantemagmaplayout_$123%4567Bd89AA654sdf-.,',
		'port' : 8001,
		'tokenExpires' : 86400, // In seconds - 86400 = 24 hours 
	},
	'ws' : {
		'port' : 8002
	},
	
	"logger": {
        "api": "logs/api.log",
        "exception": "logs/exceptions.log"
    },
	'db' : {
		'name' : 'mp_playout',
		'host' : '127.0.0.1',
		'user' : 'root',
		'password' : 'root1234'
	}
};