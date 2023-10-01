import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Preferences } from '@capacitor/preferences'
import { usePlayAudio } from 'src/composables/usePlayAudio'

export const useEnvironmentStore = defineStore('Environment', () => {
  // todo https://github.com/capacitor-community/keep-awake
  // composables
  const { playBeep } = usePlayAudio()

  const settings = ref({
    inputMethod: 'single', // 'single', 'double', or 'button'
    isScreenAlwaysOn: true,
    isSoundOn: true,
    volume: 1,
    isVibrationOn: true
  })

  function _getDefaultSettings() {
    return {
      inputMethod: 'single', // 'single', 'double', or 'button'
      isScreenAlwaysOn: true,
      isSoundOn: true,
      volume: 1,
      isVibrationOn: true
    }
  }

  async function init() {
    const { value } = await Preferences.get({ key: 'bid-environment' })
    if (value) {
      const parsed = JSON.parse(value)
      settings.value = parsed
    } else {
      reset()
    }
  }

  async function save() {
    await Preferences.set({
      key: 'bid-environment',
      value: JSON.stringify(settings.value)
    })
  }

  function reset() {
    settings.value = _getDefaultSettings()
  }

  function playBeepSound() {
    if (!settings.value?.isSoundOn) return
    playBeep(settings.value.volume)
  }

  return {
    // state
    settings,

    // actions
    init,
    save,
    reset,
    playBeepSound
  }
})
