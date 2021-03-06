//some other icons
// https://cdn4.iconfinder.com/data/icons/jolly-icons-social-media-and-communication/120/1304-smiley-sad-512.png
// https://cdn4.iconfinder.com/data/icons/jolly-icons-social-media-and-communication/120/1305-smiley-happy-512.png

var request=require('request');

function Slack(domain,token) {
	this.domain = domain;
	this.token = token;	
}

Slack.prototype.send = function(message,cb) {
	
	
	if (!message.text) {
		if (cb) cb.call(null,{message:'No text specified'},null);
		return;
	}
	if (!message.channel) { message.channel = '#general'; }
		
	var command = 'https://' + this.domain + '.slack.com/services/hooks/incoming-webhook?token=' + this.token;
	var options = {
		
		"channel":message.channel,
		"text": message.text,
		"username":message.username,
		"icon_url":message.icon_url || "https://cdn4.iconfinder.com/data/icons/jolly-icons-social-media-and-communication/120/2014-social-github-octocat-512.png"
			
	};
	
	request.post({url:command,body:JSON.stringify(options)},function(e,r,body) {

		// done!
		if (!e && body!='ok') {
			e = {message:body};
			body = null;
		}
		if (cb) cb.call(null,e,body);
				
	});
	
}


Slack.prototype.respond = function(query,cb) {
	
	var obj = {};
	
	obj.token = query.token;
	obj.team_id = query.team_id;
	obj.channel_id = query.channel_id;
	obj.channel_name = query.channel_name;
	obj.timestamp = new Date(query.timestamp);
	obj.user_id = query.user_id;
	obj.user_name = query.user_name;
	obj.text = query.text;
	
	if (!cb) {
		return {text:''};
	} else {
		return cb.call(null,obj);
	}
	
}

module.exports = Slack;
