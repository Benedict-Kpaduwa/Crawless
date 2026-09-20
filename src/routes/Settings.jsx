import React, { useEffect, useState } from 'react'

const Settings = () => {
  const [defaultUserAgent, setDefaultUserAgent] = useState('')
  const [apiToken, setApiToken] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!window.crawless) return
    window.crawless.getSettings().then((settings) => {
      setDefaultUserAgent(settings.defaultUserAgent || '')
      setApiToken(settings.apiToken || '')
    })
  }, [])

  async function handleSave(e) {
    e.preventDefault()
    if (!window.crawless) return
    await window.crawless.setSettings({ defaultUserAgent, apiToken })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className='absolute left-[52px] top-0 h-full w-[243px]'>
      <div className="text-gray-400 leading-[16px] m-0 bg-[#1C1C23] border-r-2 border-r-gray-900 border-l-2 border-l-gray-900 font-normal w-[240px] min-w-[196px] max-w-[512px] flex flex-1 flex-col h-screen p-2 gap-3">
        <h2 className='text-[#ECECEC] text-[14px] font-semibold'>Settings</h2>
        <form onSubmit={handleSave} className='flex flex-col gap-3 text-[12px] text-[#ECECEC]'>
          <div className='flex flex-col gap-1'>
            <label>Default User Agent</label>
            <input
              className='bg-[#151515] rounded-[4px] p-1'
              value={defaultUserAgent}
              onChange={(e) => setDefaultUserAgent(e.target.value)}
              placeholder='e.g. Firefox v9.99'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label>API Token</label>
            <input
              className='bg-[#151515] rounded-[4px] p-1'
              type='password'
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              placeholder='Stored encrypted via the OS keychain'
            />
          </div>
          <input type='submit' value='Save' className='self-start cursor-pointer px-2 py-1 rounded-[4px] bg-[#2D2763]'/>
          {saved && <div className='text-[#A9EF7B]'>Saved.</div>}
        </form>
      </div>
    </div>
  )
}

export default Settings
