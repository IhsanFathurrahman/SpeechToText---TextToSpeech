let recognition;

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

if(!text){
alert("Teks kosong");
return;
}

let res=await fetch("/api/tts",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({text,voice})
});

let blob=await res.blob();

let audioURL=URL.createObjectURL(blob);

let audio=new Audio(audioURL);

audio.play();

document.getElementById("status").innerText="Status: Memutar suara";

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

recognition=new(window.SpeechRecognition||window.webkitSpeechRecognition)();

recognition.lang="id-ID";

recognition.start();

document.getElementById("status").innerText="Status: Mendengarkan";

recognition.onresult=function(e){

document.getElementById("sttResult").value=e.results[0][0].transcript;

};

}

function stopSTT(){

if(recognition){

recognition.stop();

document.getElementById("status").innerText="Status: Berhenti";

}

}


// COPY

function copySTT(){

let text=document.getElementById("sttResult").value;

navigator.clipboard.writeText(text);

alert("Text disalin");

}