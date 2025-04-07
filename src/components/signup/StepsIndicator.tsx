type StepsIndicatorProps = {
  steps: number[];
  currentStep: number;
  setCurrentStep: (index: number) => void;
  isAdmin?: boolean;
};

const StepsIndicator = ({
  steps,
  currentStep,
  setCurrentStep,
  isAdmin = false,
}: StepsIndicatorProps) => {
  return (
    <>
      <div className="flex flex-wrap justify-center space-x-4 ">
        {steps.map((step) => (
          <div
            key={step}
            className={`${
              currentStep === step ? 'border-red' : 'border-gray'
            } border-2 p-2 rounded-full mb-4 md:mb-0 `}
          >
            <div
              className={`${
                currentStep === step ? 'bg-red' : 'bg-gray'
              } rounded-full h-10 w-10 flex items-center justify-center text-white cursor-pointer`}
              onClick={() => (isAdmin ? setCurrentStep(step) : null)}
            >
              {step}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 mt-4">
        <h2 className="text-4xl md:text-6xl font-base mb-2 uppercase">
          Section
        </h2>
        <h2 className="text-4xl md:text-6xl font-bold mb-4 uppercase text-red">
          {currentStep}
        </h2>
      </div>
    </>
  );
};

export default StepsIndicator;
