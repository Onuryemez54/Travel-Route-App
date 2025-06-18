import { Link } from "react-router-dom";

interface LogoProps {
  className: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/">
      <img
        src="/travel-route.png"
        alt="Travel Route Logo"
        className={className}
      />
    </Link>
  );
};
