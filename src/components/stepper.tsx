// components/Stepper.tsx
import { useApplicationStore } from "@/store/application";

const TOTAL_STEPS = 5; // Increased from 4 to 5

export function Stepper() {
  const currentStep = useApplicationStore((state) => state.step);

  return (
    <div className="my-6 w-full">
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-white">
        <div
          className="absolute h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>Section A</span>
        <span>Section B</span>
        <span>Section C</span>
        <span>Section D</span>
        <span>Finish</span>
      </div>
    </div>
  );
}
