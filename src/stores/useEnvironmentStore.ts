import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePlayAudio } from 'src/composables/usePlayAudio'
import { useCapacitorPreferences } from 'src/composables/useCapacitorPreferences'
import { useCapacitorHaptics } from 'src/composables/useCapacitorHaptics'
import { useCapacitorKeepAwake } from 'src/composables/useCapacitorKeepAwake'

export const useEnvironmentStore = defineStore('Environment', () => {
  //
  // composables
  //
  const { getPreferences, setPreferences } = useCapacitorPreferences()
  const { playBeep } = usePlayAudio()
  const { hapticsImpact, ImpactStyle } = useCapacitorHaptics()
  const { changeKeepAwake } = useCapacitorKeepAwake()

  //
  // user preference settings
  //
  const settings = ref({
    inputMethod: 'single', // 'single' | 'double' | 'button'
    isScreenAlwaysOn: true,
    isSoundOn: true,
    volume: 1,
    isVibrationOn: true
  })

  function _getDefaultSettings() {
    return {
      inputMethod: 'single', // 'single' | 'double' | 'button'
      isScreenAlwaysOn: true,
      isSoundOn: true,
      volume: 1,
      isVibrationOn: true
    }
  }

  async function init() {
    const value = await getPreferences('bid-environment')
    if (value) {
      // load old settings
      settings.value = value
    } else {
      reset()
    }
    changeKeepAwake(settings.value.isScreenAlwaysOn)
  }

  async function save() {
    await setPreferences('bid-environment', settings.value)
  }

  function reset() {
    settings.value = _getDefaultSettings()
  }

  //
  // actions with state as settings
  //

  async function playBeepSound() {
    if (!settings.value?.isSoundOn) return
    playBeep(settings.value.volume)
  }

  async function vibrate() {
    if (!settings.value?.isVibrationOn) return
    hapticsImpact(ImpactStyle.Medium)
  }

  return {
    // state
    settings,

    // actions
    init,
    save,
    reset,
    playBeepSound,
    vibrate
  }
})
