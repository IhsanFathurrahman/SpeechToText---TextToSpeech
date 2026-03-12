let recognition;
let audioPlayer;

function showTTS(){

document.getElementById("ttsSection").classList.remove("hidden");
document.getElementById("sttSection").classList.add("hidden");

}

function showSTT(){

document.getElementById("sttSection").classList.remove("hidden");
document.getElementById("ttsSection").classList.add("hidden");

}


// TTS PLAY

async function speak(){

let text=document.getElementById("ttsText").value;
let voice=document.getElementById("voice").value;

let res=await fetch("/api/tts",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({text,voice})
});

let blob=await res.blob();

let audioURL=URL.createObjectURL(blob);

audioPlayer=new Audio(audioURL);

audioPlayer.play();

audioPlayer.ontimeupdate=function(){

let progress=(audioPlayer.currentTime/audioPlayer.duration)*100;

document.getElementById("progress").style.width=progress+"%";

let seconds=Math.floor(audioPlayer.currentTime);
let minutes=Math.floor(seconds/60);
seconds=seconds%60;

document.getElementById("time").innerText=
minutes+":"+(seconds<10?"0":"")+seconds;

}

}

// DOWNLOAD

async function downloadAudio(){

let text=document.getElementById("ttsText").value;
let voice=document.getElementById("voice").value;

let res=await fetch("/api/tts",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({text,voice})
});

let blob=await res.blob();

let link=document.createElement("a");

link.href=URL.createObjectURL(blob);
link.download="tts_audio.mp3";

link.click();

}


// STT

function startListening(){

recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.lang = "id-ID";

recognition.start();

document.getElementById("status").innerText = "Status: Mendengarkan";

document.getElementById("micBtn").classList.add("mic-active");


recognition.onresult = function(e){

document.getElementById("sttResult").value =
e.results[0][0].transcript;

};


recognition.onend = function(){

document.getElementById("micBtn").classList.remove("mic-active");
document.getElementById("status").innerText = "Status: Rekaman berhenti";

};

}

function stopAudio(){

if(recognition){

recognition.stop();

}

document.getElementById("micBtn").classList.remove("mic-active");

document.getElementById("status").innerText = "Status: Rekaman dihentikan";

}


// COPY

function copySTT(){

let text=document.getElementById("sttResult").value;

navigator.clipboard.writeText(text);

alert("Text disalin");

}
