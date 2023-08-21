load1 = 0;
interval = null;
emojis = ["&#128077;","&#128076;","&#9996;",];

speech_recognition = window.webkitSpeechRecognition;
spr = new speech_recognition();
if(!spr){
    console.error(spr+" is not supported in this Browerser")
}

classifyer = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/xQRttb4CE/model.json",modelLoaded)
function modelLoaded(){
    console.log("Model Has Loaded",ml5.vesion);
}

Webcam.set({
    width:380,
    heigth:380,
    image_format : 'png',
    png_quality:90,
    flip_horiz:true
})
if (!Webcam) {
    console.error("Webcam is not available.");
}
else console.log("Webcam loaded")
cam = document.querySelector("#cam");
console.log("video is updated into the var "+cam);

if(!cam){
    console.error("Html Element 'cam' is not found")
}

try{
    Webcam.attach(cam);
}catch (error){
    console.error("Failed to Attach Web cam : ",error);
}
try{
    cam.autoplay = "true";
}catch (error){
    console.error("can't set autoplay to 'true' error conecting "+error)
}



function snap()
{
    synthesis = window.speechSynthesis;
    speak_time = 5
    
    word = "Get Ready! the Image will be taken in "+speak_time;
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
            Webcam.snap(function(img){
            document.getElementById("emoji").innerHTML = "<img class='img-responsive' id='imgs' src='"+img+"' >";
            })
        }
    }, 1500);
}

function get_result(img){
    load1 = 1; loading();
    if(img){
        load1 = 0;
        document.getElementById("result").innerHTML = "Prediction <br> Recognised as : "+img[0]+"<br> Accuracy : "+img[1];
        document.getElementById("emoji").innerHTML = img[2];
        document.getElementById("labelw").innerHTML = "Look something is there &#x1F633;"
    }else{
    get_emoji(document.getElementById("imgs"));
    document.getElementById("labelw").innerHTML = "Watchout. Incoming &#x1F4E8;"
    }

}
function get_emoji(img){
    classifyer.classify(img,gotResult);
}
function gotResult(error,result){
    if(error){
        console.error(error);
    }else{
        console.log(result);
        label = result[0].label.toString()
        label = label.charAt(0).toUpperCase() + label.slice(1);
        confidence = Math.floor(result[0].confidence*100)+"%";
        console.log(label , confidence)
        emoji = emojis[0];
    
        switch(label){
            
            case "best":
                emoji = emojis[1]
                break;
            case "amazing":
                emoji = emojis[2]
                break;
            case "victory":
                emoji = emojis[3]
                break;
        }
        array = [label, confidence, emoji];
        get_result(array);
    }
}
function loading() {
    console.log("loading loaded");
    id2 = document.getElementById("labelw")
    var id = document.getElementById("result");
    var icon = ["|", "\\", "-", "/"];
    var color = ["red","green","blue","black"];
    var i = 0;

    if (load1) {
        interval = setInterval(function () {
            if (load1) {
                var word = "Loading " + icon[i];
                id.innerHTML = word;
                console.log(word);
                id2.style.backgroundColor = color[i];
                
                i = (i + 1) % icon.length;
            } else {
                clearInterval(interval);
            }
        }, 500);
    } else {
        clearInterval(interval);
        id.innerHTML = ""; // Clear the loading message
    }
}