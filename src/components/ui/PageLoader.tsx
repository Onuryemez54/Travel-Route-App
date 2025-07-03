export const PageLoader = () => {
  return (
    <div
      data-testid="loader"
      className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm "
    >
      <div className="loader"></div>
    </div>
  );
};
