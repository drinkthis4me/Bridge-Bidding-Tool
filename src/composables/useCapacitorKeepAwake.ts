import { KeepAwake } from '@capacitor-community/keep-awake'
import { Notify } from 'quasar'

export function useCapacitorKeepAwake() {
  const keepAwake = async () => {
    try {
      const isSupported = await checkIsSupported()
      if (!isSupported) {
        throw new Error('keep-awake is not support on this device')
      }
      await KeepAwake.keepAwake()
    } catch (e) {
      Notify.create({
        message: (e as Error).message,
        type: 'negative'
      })
    }
  }

  const allowSleep = async () => {
    try {
      const isSupported = await checkIsSupported()
      if (!isSupported) {
        throw new Error('keep-awake is not support on this device')
      }
      await KeepAwake.allowSleep()
    } catch (e) {
      Notify.create({
        message: (e as Error).message,
        type: 'negative'
      })
    }
  }

  const checkIsSupported = async () => {
    const result = await KeepAwake.isSupported()
    return result.isSupported
  }

  const changeKeepAwake = async (active = true) => {
    if (active) {
      keepAwake()
    } else {
      allowSleep()
    }
  }

  return {
    keepAwake,
    allowSleep,
    checkIsSupported,
    changeKeepAwake
  }
}
