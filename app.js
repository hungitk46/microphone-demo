document.getElementById('start-btn').addEventListener('click', startRecording);
document.getElementById('stop-btn').addEventListener('click', stopRecording);

let mediaRecorder;
let audioChunks = [];

async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.start();
  document.getElementById('start-btn').disabled = true;
  document.getElementById('stop-btn').disabled = false;

  mediaRecorder.ondataavailable = event => {
    audioChunks.push(event.data);
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = document.getElementById('audio');
    audio.src = audioUrl;
    audioChunks = [];
  };
}

function stopRecording() {
  mediaRecorder.stop();
  document.getElementById('start-btn').disabled = false;
  document.getElementById('stop-btn').disabled = true;
}
