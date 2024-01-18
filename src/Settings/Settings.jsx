import React from 'react'
import InputSettings from './InputSettings'
import TailorShopSettings from './TailorShopSettings'

function Settings() {
  return (
    <div className='new-container'>
        <TailorShopSettings />
        <InputSettings />
    </div>
  )
}

export default Settings