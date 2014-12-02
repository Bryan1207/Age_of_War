SOUND_EFFECTS = new Object();
SOUND_EFFECTS.audio = {};
SOUND_EFFECTS.audio_src = {};


if (document.createElement('audio').canPlayType('audio/ogg; codecs="vorbis"') == "probably" || document.createElement('audio').canPlayType('audio/ogg; codecs="vorbis"') == "maybe") {
	var audioType = ".ogg";
	var audioFormat = "audio/ogg; codec='vorbis'";
} else if(document.createElement('audio').canPlayType("audio/x-m4a") == "probably" || document.createElement('audio').canPlayType("audio/x-m4a") == "maybe") {
	var audioType = ".m4a";
	var audioFormat = "audio/x-m4a"; //MPEG-4
} else if(document.createElement('audio').canPlayType('audio/aac') == "probably" || document.createElement('audio').canPlayType('audio/aac') == "maybe") {
	var audioType = ".m4a";
	var audioFormat = "audio/aac";
} else if(document.createElement('audio').canPlayType('audio/mp4') == "probably" || document.createElement('audio').canPlayType('audio/mp4') == "maybe") {
	var audioType = ".m4a";
	var audioFormat = "audio/mp4";
}
var is_safari = navigator.userAgent.indexOf("Safari") > -1;
var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
if ((is_chrome)&&(is_safari)) {is_safari=false;}

if(is_safari) {
	var audio = {
		/* Sounds in Safari moeten langer dan 1 sec!! */
		bg_menu: './sounds/background_menu'+audioType,
		bg_game: './sounds/background_game'+audioType
	};
} else {
	var audio = {
		bg_menu: './sounds/background_menu'+audioType,
		bg_game: './sounds/background_game'+audioType
	};
}
function AudioPlayer()
{
	this.audio_ctx = null;
	this.all_musicLoaded = false;
	this.muted = false;
	if (typeof AudioContext !== 'undefined') {
		this.audio_ctx = new AudioContext();
		if(this.checkDeviceIsOld(this.audio_ctx)) {
			audioPlayer = null;	return;
		} else {
			this.loadMusicContext(this.audio_ctx);
		}
	} else if (typeof webkitAudioContext !== 'undefined') {
		this.audio_ctx = new webkitAudioContext();
		if(this.checkDeviceIsOld(this.audio_ctx)) {
			audioPlayer = null; return;
		} else {
			this.loadMusicContext(this.audio_ctx);
		}
	} else {
		this.loadMusicHTML5();
	}
	this.navU = navigator.userAgent;
	// Android Mobile
	this.isAndroidMobile = this.navU.indexOf('Android') > -1 && this.navU.indexOf('Mozilla/5.0') > -1 && this.navU.indexOf('AppleWebKit') > -1;
	
	// Android Browser (not Chrome)
	this.regExAppleWebKit = new RegExp(/AppleWebKit\/([\d.]+)/);
	this.resultAppleWebKitRegEx = this.regExAppleWebKit.exec(this.navU);
	this.appleWebKitVersion = (this.resultAppleWebKitRegEx === null ? null : parseFloat(this.regExAppleWebKit.exec(this.navU)[1]));
	this.isAndroidBrowser = this.isAndroidMobile && this.appleWebKitVersion !== null && this.appleWebKitVersion < 537;
}

/* Audio Context */
AudioPlayer.prototype.loadMusicContext = function(audio_ctx)  {
	var currentSound = 0;
	var aantal_sounds = 0;
	if(DEV_MODE) console.log("Loading sound in AudioContext...");
	for(var name in audio) {
		loadingScreen.AddProgress(name);
		aantal_sounds++;
	}

	function loadMusic(url, callback) {
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
		req.responseType = 'arraybuffer';

		req.onerror = function() {
			console.log("Error on: " + url);
		}

		req.onload = function() {
			window.setTimeout(function() {
				audio_ctx.decodeAudioData(req.response, callback);
			}, 1000);
		}
		req.send();
	}

	var loadAudioData = function(name, url) {
		//Async
		loadMusic(url, function(buffer) {
			SOUND_EFFECTS.audio[name] = buffer;
			if(DEV_MODE) console.log("Sound loaded: " + name + audioType);
			if(currentSound >= (aantal_sounds-1) ) {
				audioPlayer.all_musicLoaded = true;
				document.addEventListener('touchstart', testIOS, true);
				if(DEV_MODE) console.log("All sound loaded!");
			}
			loadingScreen.SetItemDone(name);
			currentSound++;
		});
	};
	for(var name in audio) {
		var url = audio[name];
		loadAudioData(name, url);
	}
};

/* HTML5 */
AudioPlayer.prototype.loadMusicHTML5 = function() {
	var currentSound = 0;
	var aantal_sounds = 0;
	var audioElement = null;
	var all_musicLoaded = false;
	if(DEV_MODE) console.log("Loading sound in HTML5...");

	for(var name in audio) {
		loadingScreen.AddProgress(name);
		aantal_sounds++;
	}

	for(var name in audio) {
		var url = audio[name];
		audioElement = document.createElement('audio');
		var src1_el = document.createElement('source');

		audioElement.setAttribute("id", name);
		src1_el.setAttribute("src", url);
		src1_el.setAttribute("type", audioFormat);

		audioElement.preload = 'auto';
		audioElement.autoplay = 'false';

		audioElement.setAttribute("loaded", false);
		audioElement.appendChild(src1_el);
		
		document.body.appendChild(audioElement);
		audioElement.pause();
		SOUND_EFFECTS[name] = audioElement;
		audioElement.oncanplaythrough = musicDoneLoading(name, this);
	}

	function musicDoneLoading(name, audioPlayer) {
		window.setTimeout(function() {
			SOUND_EFFECTS[name].setAttribute("loaded", true);
			if(DEV_MODE) console.log("Sound loaded: " + name + audioType);
			if(currentSound >= (aantal_sounds-1) ) {
				audioPlayer.all_musicLoaded = true;
				if(DEV_MODE) console.log("All sound loaded!");
			}
			loadingScreen.SetItemDone(name);
			currentSound++;
		}, 1000);
	};
};

AudioPlayer.prototype.PlaySound = function(name, options) {
	options = options || {};
	
	if(this.muted) return;
	if(!this.all_musicLoaded) return;
	
	if(this.audio_ctx !== null) {
		if(typeof SOUND_EFFECTS.audio[name] === 'undefined') return;

		var buffer = SOUND_EFFECTS.audio[name];
		
		if(!options) callback = options;
		options = options || {};
		
		var src = this.audio_ctx.createBufferSource();
		src.buffer = buffer;
		
		gain_node = this.audio_ctx.createGain();
		
		//gain_node = this.audio_ctx.createGainNode();
		src.connect(gain_node);

		gain_node.connect(this.audio_ctx.destination);

		if(typeof options.volume !== 'undefined')
			gain_node.gain.value = options.volume;
		else
			gain_node.gain.value = 1;

		//Options
		if(options.loop)
			src.loop = true;

		src.start(0);
		//src.noteOn(0); 	//<!-- Safari 6!! oud!
		SOUND_EFFECTS.audio_src[name] = src;
	} else {
		if(typeof SOUND_EFFECTS[name] === 'undefined') return;

		if(SOUND_EFFECTS[name].getAttribute("loaded") === 'true') {
			if(typeof options.volume !== 'undefined') {
				SOUND_EFFECTS[name].volume = options.volume;
			} else {
				SOUND_EFFECTS[name].volume = 1.0;
			}
			if(options.loop) {
				SOUND_EFFECTS[name].loop = options.loop;
			} else {
				SOUND_EFFECTS[name].loop = false;
			}
			SOUND_EFFECTS[name].play();
		}
	}
};

/* Background Music etc.. */
AudioPlayer.prototype.PlayMusic = function(name, options) {
	options = options || {};

	if(this.muted) return;
	if(this.isAndroidBrowser) return;

	if(this.audio_ctx !== null) {
		var buffer = SOUND_EFFECTS.audio[name];

		if(!options) callback = options;
		options = options || {};
		
		var src = this.audio_ctx.createBufferSource();
		src.buffer = buffer;

		gain_node = this.audio_ctx.createGain();
		src.connect(gain_node);

		gain_node.connect(this.audio_ctx.destination);

		if(typeof options.volume !== 'undefined')
			gain_node.gain.value = options.volume;
		else
			gain_node.gain.value = 1;

		//Options
		if(options.loop)
			src.loop = true;
		src.start(0);

		SOUND_EFFECTS.audio_src[name] = src;
	} else {
		if(SOUND_EFFECTS[name].getAttribute("loaded")  === "true") {
			if(typeof options.volume !== 'undefined') {
				SOUND_EFFECTS[name].volume = options.volume;
			} else {
				SOUND_EFFECTS[name].volume = 1.0;
			}
			if(options.loop) {
				SOUND_EFFECTS[name].loop = options.loop;
			} else {
				SOUND_EFFECTS[name].loop = false;
			}
			SOUND_EFFECTS[name].play();
		}
	}
};
AudioPlayer.prototype.StopSound = function(name) {
	if(!this.all_musicLoaded) return;
	if(this.audio_ctx !== null) {
		var src = SOUND_EFFECTS.audio_src[name];
		if(typeof src !== 'undefined')
			src.stop(0);
	} else {
		if(!SOUND_EFFECTS[name].paused)
			SOUND_EFFECTS[name].pause();
	}
};
AudioPlayer.prototype.StopMusic = function(name) {
	if(!this.all_musicLoaded) return;
	if(this.audio_ctx !== null) {
		var src = SOUND_EFFECTS.audio_src[name];
		if(typeof src !== 'undefined')
			src.stop(0);
	} else {
		if(!SOUND_EFFECTS[name].paused)
			SOUND_EFFECTS[name].pause();
	}
}
AudioPlayer.prototype.StopAllMusic = function() {
	if(!this.all_musicLoaded) return;
	if(this.audio_ctx !== null) {
		if(SOUND_EFFECTS.audio_src !== null) {
			for(var name in SOUND_EFFECTS.audio_src) {
				SOUND_EFFECTS.audio_src[name].stop(0);
			}
		}
	} else {
		for(var name in audio) {
			if(!SOUND_EFFECTS[name].paused)
				SOUND_EFFECTS[name].pause();
		}
	}
};
AudioPlayer.prototype.GetMuted = function() {
	return this.muted;
};
AudioPlayer.prototype.SetMuted = function(value) {
	this.muted = value;
	if(value) this.stopAllMusic();
};
function testIOS() {
	document.removeEventListener('touchstart', testIOS, true);
	audioPlayer.PlaySound('bg_menu', { loop: false, volume: 0.0 });
}
AudioPlayer.prototype.checkDeviceIsOld = function(audio_ctx) {
	if(typeof(audio_ctx.createGain) === 'undefined')
		return true;
	else
		return false;
};