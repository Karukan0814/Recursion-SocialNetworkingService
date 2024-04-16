import React from "react";
import "../style/SidebarOption.css";
import { useNavigate } from "react-router-dom";
type Props = {
  text: string;
  Icon: React.ElementType;
  active?: boolean;
  path?: string;
};
function SidebarOption({ text, Icon, active = false, path }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path); // 指定のパスに遷移
    }
  };
  return (
    <div
      className={`sidebarOption  ${active && "sidebarOption--active"}`}
      onClick={handleClick}
    >
      <Icon className="sidebarOptionIcon" />

      <h2 className="sidebarOptionTile">{text}</h2>
    </div>
  );
}

export default SidebarOption;
