try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
    $('.no-browser-support').hide()
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}

recognition.continuous = true;

recognition.onresult = function(event) {

  var current = event.resultIndex;

  var transcript = event.results[current][0].transcript;

  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
      $('body').append("You > " + transcript + "<br/>");
      
      respond(transcript);
  }

};

recognition.onstart = function() {
  
    
}

var uuid = generateUuid();

function respond(msg){
    $.get(
        "https://www.pandorabots.com/pandora/talk-xml",
        {botid : 'b8d616e35e36e881', custid : uuid, input: msg},
        function(data) {
            response=$(data).find("that").text();
            $('body').append("realperson123 > " + response + "<br/>");
            speak(response);
        }
    );
}

recognition.onspeechend = function() {
    recognition.start();
}

function speak(msg) {
	var speech = new SpeechSynthesisUtterance();

	speech.text = msg;
	speech.volume = 1;
	speech.rate = 1;
	speech.pitch = 1;
  
	window.speechSynthesis.speak(speech);
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
     
  };
}

function generateUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

recognition.start();