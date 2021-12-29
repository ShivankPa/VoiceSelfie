var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
    document.getElementById("tebo").innerHTML = "";
    recognition.start();
}

recognition.onresult = function run(event) {
    console.log("Event is" + event);
    var content  = event.results[0][0].transcript;
    document.getElementById("tebo").innerHTML = content;

    if(content == "take my selfie") {
        console.log("Ready to take your selfie.");
        speak();
    }
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data = "Taking selfie of your cute and beautiful face in 5 SECONDS";
    var utter = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter);
    Webcam.attach(camera);
    console.log("Started Uttering");
    setTimeout(function(){
        take_snapshot();
    },5000);
}

Webcam.set({
    width: 360,
    height: 250,
    image_format:'png',
    png_quality: 100
});

camera = document.getElementById("camera");

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+data_uri+'">';
        });
}

function save() {
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src;
    link.href = image;
    link.click();
}