var util = require('util'),
    twitter = require('twitter');

var twit = new twitter({
    consumer_key: '$CONSUMER_KEY',
    consumer_secret: '$CONSUMER_SECRET',
    access_token_key: '$ACCESS_TOKEN_KEY',
    access_token_secret: '$ACCESS_TOKEN_SECRET'
});

var bot_name = '$BOT_SCREEN_NAME';

twit.verifyCredentials(function(data) {
});

twit.stream('user', {track: bot_name}, function(stream) {
	stream.on('data', function(data) {
		if (data.hasOwnProperty('direct_message')) {
			var text = '"@' + data['direct_message']['sender']['screen_name'];
			text = text + ': ' + data['direct_message']['text'] + '"';
			twit.updateStatus(text, function(data) {
				console.log(text);
			});
		}
	});
});