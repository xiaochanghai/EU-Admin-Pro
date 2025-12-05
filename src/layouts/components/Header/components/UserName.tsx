import { RootState, useSelector } from "@/redux";

const UserName: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  return <span className="username">{userInfo.name}</span>;
};

export default UserName;
