// components/Stepper.tsx
import { useApplicationStore } from "@/store/application";

const TOTAL_STEPS = 5;

export function Stepper() {
  const { step, subStep } = useApplicationStore((state) => ({
    step: state.step,
    subStep: state.subStep,
  }));

  // Calculate progress including sub-steps
  const calculateProgress = () => {
    // Calculate base progress (completed sections)
    const completedSections = step - 1;
    const baseProgress = completedSections / (TOTAL_STEPS - 1);

    // Calculate sub-progress for current section
    const subProgress = (subStep - 1) / 2; // Each section has 2 sub-steps
    const currentSectionProgress = subProgress / (TOTAL_STEPS - 1);

    return (baseProgress + currentSectionProgress) * 100;
  };

  const getStepLabel = (stepNumber: number) => {
    const labels = [
      "Section A",
      "Section B",
      "Section C",
      "Section D",
      "Finish",
    ];
    return labels[stepNumber - 1] || "";
  };

  const isStepCompleted = (stepNumber: number) => {
    return step > stepNumber;
  };

  const isCurrentStep = (stepNumber: number) => {
    return step === stepNumber;
  };

  const isStepActive = (stepNumber: number) => {
    return isStepCompleted(stepNumber) || isCurrentStep(stepNumber);
  };

  return (
    <div className="my-6 w-full">
      {/* Progress Bar with Dots */}
      <div className="relative flex items-center justify-between">
        {/* Background Line */}
        <div className="absolute left-0 right-0 h-0.5 bg-gray-300"></div>

        {/* Progress Line */}
        <div
          className="absolute left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${calculateProgress()}%` }}
        ></div>

        {/* Step Dots */}
        {[1, 2, 3, 4, 5].map((stepNumber) => (
          <div key={stepNumber} className="relative z-10">
            <div
              className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ease-in-out ${
                isStepActive(stepNumber)
                  ? "border-primary bg-primary"
                  : "border-gray-300 bg-white"
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="mt-3 flex justify-between text-xs">
        {[1, 2, 3, 4, 5].map((stepNumber) => (
          <span
            key={stepNumber}
            className={`font-medium transition-colors duration-300 ${
              isStepActive(stepNumber) ? "text-primary" : "text-gray-500"
            }`}
          >
            {getStepLabel(stepNumber)}
          </span>
        ))}
      </div>

      {/* Sub-step indicator */}
      {step < 5 && (
        <div className="mt-2 flex justify-center text-xs text-gray-600">
          <span>{/* {getStepLabel(step)} - Part {subStep} */}</span>
        </div>
      )}
    </div>
  );
}
