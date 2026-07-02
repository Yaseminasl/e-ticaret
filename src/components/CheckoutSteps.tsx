const steps = ["Sepet", "Teslimat", "Ödeme", "Onay"];

type CheckoutStepsProps = {
  currentStep?: number;
};

export function CheckoutSteps({ currentStep = 3 }: CheckoutStepsProps) {
  return (
    <div className="mb-8 rounded-lg border border-[#D7BDF8] bg-white/80 p-5 shadow-sm backdrop-blur dark:border-[#5A1F2D] dark:bg-[#161114]">
      <div className="grid gap-4 sm:grid-cols-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={step} className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold ${
                  isCompleted
                    ? "bg-[#338caa] text-white dark:bg-[#7F1D1D]"
                    : isActive
                      ? "bg-[#D7ECFF] text-[#338caa] ring-2 ring-[#338caa]/20 dark:bg-[#2A1218] dark:text-[#F5D0D8] dark:ring-[#BE123C]/30"
                      : "bg-slate-100 text-slate-500 dark:bg-[#0B0B0C] dark:text-[#9CA3AF]"
                }`}
              >
                {isCompleted ? "✓" : stepNumber}
              </span>

              <div>
                <p
                  className={`text-sm font-extrabold ${
                    isActive
                      ? "text-[#338caa] dark:text-[#F5D0D8]"
                      : "text-slate-700 dark:text-[#D1D5DB]"
                  }`}
                >
                  {step}
                </p>
                <p className="text-xs text-[#6A7F95] dark:text-[#9CA3AF]">
                  {isCompleted
                    ? "Tamamlandı"
                    : isActive
                      ? "Bu adım"
                      : "Sıradaki"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
