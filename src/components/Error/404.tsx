import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.less";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Result
      className="error-page"
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      }
    />
  );
};

export default NotFound;
