import React, { useRef } from "react";
import { HomeOutlined, UserOutlined, FormOutlined, LoginOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { type MenuProps, Dropdown, Avatar } from "antd";
import { HOME_URL, LOGIN_URL } from "@/config";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "@/api/modules/login";
import { useDispatch } from "@/redux";
import { setToken } from "@/redux/modules/user";
import { setAuthMenuList } from "@/redux/modules/auth";
import { modal, message } from "@/hooks/useMessage";
import InfoModal, { InfoModalRef } from "./InfoModal";
import PasswordModal, { PasswordModalRef } from "./PasswordModal";
import avatar from "@/assets/images/avatar.png";

const AvatarIcon: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passRef = useRef<PasswordModalRef>(null);
  const infoRef = useRef<InfoModalRef>(null);

  const logout = () => {
    modal.confirm({
      title: "温馨提示 🧡",
      icon: <ExclamationCircleOutlined />,
      content: "是否确认退出登录？",
      okText: "确认",
      cancelText: "取消",
      mask: { closable: true },
      onOk: async () => {
        // Execute the logout interface
        await logoutApi();

        // Set token to empty
        dispatch(setToken(""));

        // Set menu list empty
        dispatch(setAuthMenuList([]));

        // Jump to login page
        navigate(LOGIN_URL, { replace: true });

        message.success("退出登录成功！");
      }
    });
  };

  const style = { fontSize: "14px" };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span className="dropdown-item">首页</span>,
      icon: <HomeOutlined style={style} />,
      onClick: () => navigate(HOME_URL)
    },
    {
      key: "2",
      label: <span className="dropdown-item">个人信息</span>,
      icon: <UserOutlined style={style} />,
      onClick: () => infoRef.current?.showModal({ name: "hooks" })
    },
    {
      key: "3",
      label: <span className="dropdown-item">修改密码</span>,
      icon: <FormOutlined style={style} />,
      onClick: () => passRef.current?.showModal({ name: "hooks" })
    },
    {
      type: "divider"
    },
    {
      key: "4",
      label: <span className="dropdown-item">退出登录</span>,
      icon: <LoginOutlined style={style} />,
      onClick: logout
    }
  ];

  return (
    <React.Fragment>
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottom" arrow>
        <Avatar className="avatar" size={42} src={avatar} />
      </Dropdown>
      <InfoModal ref={infoRef} />
      <PasswordModal ref={passRef} />
    </React.Fragment>
  );
};

export default AvatarIcon;
