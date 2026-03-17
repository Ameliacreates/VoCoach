let mediaRecorder;
let audioChunks = [];
let isRecording = false;

const recordButton = document.getElementById('record-button');

recordButton.addEventListener('click', async () => {
    if (!isRecording) {
        // Start recording
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        audioChunks = [];
        mediaRecorder.ondataavailable = event => audioChunks.push(event.data);

        mediaRecorder.start();
        isRecording = true;

        // Change button to STOP symbol
        recordButton.textContent = "■";

    } else {
        // Stop recording
        mediaRecorder.stop();
        isRecording = false;

        // Change button back to PLAY symbol
        recordButton.textContent = "▶";

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);

            console.log("Recording complete:", audioBlob);
            console.log("Preview URL:", audioUrl);
        };
    }
});
