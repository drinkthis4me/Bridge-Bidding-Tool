import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics'
import { Notify } from 'quasar'

export function useCapacitorHaptics() {
  async function hapticsImpact(style?: ImpactStyle) {
    try {
      if (style) {
        await Haptics.impact({ style })
      } else {
        await Haptics.impact()
      }
    } catch (e) {
      Notify.create({
        message: (e as Error).message,
        type: 'negative'
      })
    }
  }

  async function hapticsVibrate(duration: number) {
    try {
      await Haptics.vibrate({ duration: duration })
    } catch (e) {
      Notify.create({
        message: (e as Error).message,
        type: 'negative'
      })
    }
  }

  async function hapticsNotification(type?: NotificationType) {
    try {
      if (type) {
        await Haptics.notification({ type: type })
      } else {
        await Haptics.notification()
      }
    } catch (e) {
      Notify.create({
        message: (e as Error).message,
        type: 'negative'
      })
    }
  }

  return {
    hapticsImpact,
    hapticsVibrate,
    hapticsNotification,
    ImpactStyle,
    NotificationType
  }
}
