export const Spinner = () => {
  return (
    <div data-testid="spinner" className="flex items-center justify-center ">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full animate-spin bg-[conic-gradient(#0000_10%,#4ade80)] [mask-image:radial-gradient(farthest-side,#0000_calc(100%-8px),#000_0)]"></div>
    </div>
  );
};
