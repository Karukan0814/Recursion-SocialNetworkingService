import React from "react";
import "../style/SidebarOption.css";

type Props = {
  text: string;
  Icon: React.ElementType;
  active?: boolean;
};
function SidebarOption({ text, Icon, active = false }: Props) {
  return (
    <div className={`sidebarOption  ${active && "sidebarOption--active"}`}>
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}

export default SidebarOption;
