import { Button } from "../components/ui/Button";

const Pricing = () => {
  return (
    <div className="w-full mt-10 text-center slide-in-bottom">
      <h2 className="mb-5 text-base font-extrabold text-transparent sm:text-2xl md:text-3xl bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-green-500">
        Only $1/month — Unlimited Travel Planning
      </h2>
      <p className="mb-6 text-gray-600 md:text-lg">
        Enjoy premium features, cloud sync, and priority support for the price
        of a coffee.
      </p>

      <div className="inline-block px-8 py-6 shadow-2xl bg-gradient-to-br from-blue-100 via-white to-green-100 rounded-xl">
        <p className="mb-2 text-sm font-medium text-gray-500">Monthly Plan</p>
        <div className="flex items-end justify-center mb-4">
          <span className="text-5xl font-bold text-gray-800">$1</span>
          <span className="ml-2 text-lg text-gray-500">/month</span>
        </div>
        <ul className="mb-6 text-left text-gray-600 list-disc list-inside">
          <li>Unlimited access to route planner</li>
          <li>Cloud sync across devices</li>
          <li>Priority support</li>
        </ul>
        <Button type="secondary">Subscribe Now</Button>
      </div>
    </div>
  );
};
export default Pricing;
