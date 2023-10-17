import { toValue } from 'vue'
import { Preferences } from '@capacitor/preferences'
import { Notify } from 'quasar'

export function useCapacitorPreferences() {
  /**
   * Get parsed value from preferences by key
   * @param key The key to retrieve from preferences
   * @returns {unknown | null} JSON parsed value
   */
  async function getPreferences(key: string) {
    try {
      const { value } = await Preferences.get({ key })
      if (!value) return null
      return JSON.parse(value)
    } catch (e) {
      Notify.create({
        message: (e as Error).message,
        type: 'negative'
      })
      return null
    }
  }

  /**
   * Set stringified value with key to preferences
   * @param key The key to associate with the value being set in preferences
   * @param value The value to set in preferences with the associated key. Will be JSON stringified if not string.
   */
  async function setPreferences(key: string, value: unknown) {
    try {
      let _value = toValue(value)
      if (typeof _value !== 'string') {
        _value = JSON.stringify(_value)
      }
      await Preferences.set({
        key,
        value: _value as string
      })
    } catch (e) {
      Notify.create({
        message: (e as Error).message,
        type: 'negative'
      })
    }
  }

  async function removePreferences(key: string) {
    try {
      await Preferences.remove({ key })
    } catch (e) {
      Notify.create({
        message: (e as Error).message,
        type: 'negative'
      })
    }
  }

  async function clearPreferences() {
    try {
      await Preferences.clear()
    } catch (e) {
      Notify.create({
        message: (e as Error).message,
        type: 'negative'
      })
    }
  }

  return {
    getPreferences,
    setPreferences,
    removePreferences,
    clearPreferences
  }
}
