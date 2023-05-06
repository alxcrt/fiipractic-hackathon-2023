const BillingPlan = () => {
  return (
    <div className="flex grow flex-col items-start justify-center overflow-hidden rounded-md border bg-white shadow-md dark:border-gray-700 dark:bg-gray-900">
      <div className="flex w-full flex-row items-center justify-between border-b px-4 py-3 dark:border-gray-700">
        <div className="text-base font-semibold sm:text-base"> Your plan</div>
        <div className="grid">
          <div className="relative order-1 col-span-1 sm:order-2">
            <div className="relative z-20 flex flex-col gap-3 bg-white p-4 dark:bg-gray-900">
              <div className="flex items-center justify-between text-xl font-semibold">
                Free
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPlan;
