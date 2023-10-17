import { Device } from '@capacitor/device'
import { Notify } from 'quasar'

export function useDeviceInfo() {
  async function getDeviceInfo() {
    try {
      const info = await Device.getInfo()
      return info
    } catch (e) {
      Notify.create({
        message: (e as Error).message,
        type: 'negative'
      })
    }
  }

  return {
    getDeviceInfo
  }
}
