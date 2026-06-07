export function useVoiceNavigation() {
  function speak(text: string) {
    if (!window.speechSynthesis) return
    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = 'zh-CN'
    speech.rate = 1
    speech.pitch = 1
    window.speechSynthesis.speak(speech)
  }

  function stopSpeaking() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }

  return { speak, stopSpeaking }
}
