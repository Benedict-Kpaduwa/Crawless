const fs = require('fs')
const path = require('path')

// Uses Electron's safeStorage, which encrypts with a key held by the OS
// keychain (macOS Keychain / Windows DPAPI / libsecret) rather than a key
// embedded in the app — so there is no key material in the app itself for
// someone decompiling it to recover, unlike a manually-managed symmetric key.
function makeSettingsStore(userDataDir, safeStorage) {
  const filePath = path.join(userDataDir, 'settings.enc')

  function read() {
    if (!fs.existsSync(filePath)) return {}
    if (!safeStorage.isEncryptionAvailable()) return {}
    try {
      const encrypted = fs.readFileSync(filePath)
      const decrypted = safeStorage.decryptString(encrypted)
      return JSON.parse(decrypted)
    } catch {
      return {}
    }
  }

  function write(settings) {
    if (!safeStorage.isEncryptionAvailable()) {
      throw new Error('OS-level encryption is not available on this machine')
    }
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    const encrypted = safeStorage.encryptString(JSON.stringify(settings))
    fs.writeFileSync(filePath, encrypted)
  }

  function update(patch) {
    const next = { ...read(), ...patch }
    write(next)
    return next
  }

  return { read, write, update }
}

module.exports = { makeSettingsStore }
