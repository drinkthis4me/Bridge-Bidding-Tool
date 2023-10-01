import { Haptics, ImpactStyle } from '@capacitor/haptics'

export function useCapacitorHaptics() {
  async function hapticsImpactMedium() {
    await Haptics.impact({ style: ImpactStyle.Medium })
  }

  async function hapticsImpactLight() {
    await Haptics.impact({ style: ImpactStyle.Light })
  }

  async function hapticsVibrate() {
    await Haptics.vibrate({ duration: 500 })
  }

  return {
    hapticsImpactMedium,
    hapticsImpactLight,
    hapticsVibrate
  }
}
