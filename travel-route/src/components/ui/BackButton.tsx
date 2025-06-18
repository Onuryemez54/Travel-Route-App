import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { TiArrowBack } from "react-icons/ti";

export const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Button type="back" click={handleBack}>
      <TiArrowBack />
    </Button>
  );
};
