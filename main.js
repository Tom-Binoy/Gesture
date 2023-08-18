speech_recognition = window.webkitSpeechRecognition;
spr = new speech_recognition();
if(!spr){
    console.error(spr+" is not supported in this Browerser")
}

Webcam.set({
    width:350,
    heigth:300,
    image_format : 'png',
    png_quality:90
})
if (!Webcam) {
    console.error("Webcam is not available.");
}

cam = document.getElementById("cam")

if(!cam){
    console.error("Html Element 'cam' is not found")
}
try{
    Webcam.attach( '#cam' );
}catch (error){
    console.error("Failed to Attach Web cam : ",error);
}

function snap()
{
    synthesis = window.speechSynthesis;
    speak_time = 5
    
    word = "Get Ready! Your Selfi will be taken in "+speak_time;
    tell(word,speak_time);
    speak_time--
    console.log("get ready s = ",speak_time)
    setTimeout(() => {
        time(speak_time)
    }, 3000);
   
}
function tell(word,set,speak_time){
    tell1 = new SpeechSynthesisUtterance(word);
    synthesis.speak(tell1);
    console.log("tell function loaded"+word,speak_time)

    if(set && !speak_time){
        clearInterval(set)
        console.log("clearinterval() ",speak_time)
        return;
    }
    return;
}
function time(interval){
    speak_time = 4
    set = setInterval(() => {
        if(interval){

            word = speak_time
            word = word.toString()
            tell(word,set,interval);
            console.log("word : ",word);

            speak_time--
            interval--
        }
        else if(interval <1){
            console.log("cheese")
            word = "CHEESE!!";
            tell(word,set,interval);
            Webcam.snap(function(uri){
            document.getElementById("emoji").innerHTML = "<img class='img-responsive' src='"+uri+"' >";
            speak_time = 0; interval = 0;
            })
        }
    }, 1500);
}