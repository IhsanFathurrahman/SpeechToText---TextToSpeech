export default async function handler(req,res){

const {text,voice}=req.body;

const response=await fetch(
`https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
{
method:"POST",
headers:{
"xi-api-key":process.env.ELEVENLABS_API_KEY,
"Content-Type":"application/json"
},
body:JSON.stringify({
text:text,
model_id:"eleven_multilingual_v2"
})
}
);

const buffer=await response.arrayBuffer();

res.setHeader("Content-Type","audio/mpeg");

res.send(Buffer.from(buffer));

}