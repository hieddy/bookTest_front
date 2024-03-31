import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Path } from "../../Router";

const LandingPage = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(Path.SEARCHRESULT);
  };

  return (
    <>
      <h1>Hi</h1>
      <h2>Click Here ⬇</h2>
      <Button type="primary" onClick={clickHandler}>
        시작하기
      </Button>
    </>
  );
};

export { LandingPage };
