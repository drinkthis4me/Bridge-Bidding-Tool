import beepSound from 'src/assets/beep.mp3'

export function usePlayAudio() {
  function playBeep(volume = 1) {
    const audio = new Audio(beepSound)
    audio.volume = volume
    audio.play()
  }

  return {
    playBeep
  }
}
