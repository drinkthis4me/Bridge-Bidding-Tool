import { KeepAwake } from '@capacitor-community/keep-awake'

export function useCapacitorKeepAwake() {
  const keepAwake = async () => {
    try {
      if (await !isSupported()) return
      await KeepAwake.keepAwake()
    } catch (e) {
      console.log(e)
    }
  }

  const allowSleep = async () => {
    try {
      if (await !isSupported()) return
      await KeepAwake.allowSleep()
    } catch (e) {
      console.log(e)
    }
  }

  const isSupported = async () => {
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
    isSupported,
    changeKeepAwake
  }
}
