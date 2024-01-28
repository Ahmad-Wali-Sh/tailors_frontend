import React, { useState } from 'react'
import TailorShopSettings from './TailorShopSettings'
import SettingsButtons from './SettingsButtons'
import MesurementSettings from './MesurementSettings'
import OrderSettings from './OrderSettings'
import Shortcuts from './Shortcuts'

function Settings() {

  const [currentStep, setCurrentStep] = useState('')

  const goToStep = (step) => {
    setCurrentStep(step)
  }

  return (
    <div>
        <SettingsButtons currentStep={currentStep} onStepClick={goToStep} />
        {currentStep === 'اطلاعات خیاطی' && <TailorShopSettings />}
        {currentStep === 'اندازه گیری' && <MesurementSettings />}
        {currentStep === 'سفارشات' && <OrderSettings />}
        {currentStep === 'میانبر ها' && <Shortcuts />}
    </div>
  )
}

export default Settings