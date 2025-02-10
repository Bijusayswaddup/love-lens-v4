// Main JavaScript logic will go here
function speak(text) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.voice = speechSynthesis.getVoices().find(v => v.name.includes('Fiona'));
    speechSynthesis.speak(msg);
}