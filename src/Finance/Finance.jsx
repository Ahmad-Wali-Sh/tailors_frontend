import React, { useState } from "react";
import Expense from "./Expense";
import FinanceButtons from "./FinanceButtons";
import Insight from "./Insight";
import Liabilities from "./Liabilities";
import Receivables from "./Receivables";

function Finance() {
  const [currentStep, setCurrentStep] = useState("");

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  return (
    <div>
      <FinanceButtons currentStep={currentStep} onStepClick={goToStep} />
      {currentStep === "گذارش" && <Insight />}
      {currentStep === "مصارف - خریداری" && <Expense />}
      {currentStep === "حساب طلبات" && <Receivables />}
      {currentStep === "حساب قروض" && <Liabilities />}
    </div>
  );
}

export default Finance;
