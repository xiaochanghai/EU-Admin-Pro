import React from "react";
import { Watermark } from "antd";
import { RootState, useSelector } from "@/redux";
import LayoutVertical from "./LayoutVertical";
import LayoutClassic from "./LayoutClassic";
import LayoutTransverse from "./LayoutTransverse";
import LayoutColumns from "./LayoutColumns";
import ThemeDrawer from "@/layouts/components/ThemeDrawer";

const LayoutIndex: React.FC = () => {
  const layout = useSelector((state: RootState) => state.global.layout);
  const watermark = useSelector((state: RootState) => state.global.watermark);

  const LayoutComponents = {
    vertical: <LayoutVertical />,
    classic: <LayoutClassic />,
    transverse: <LayoutTransverse />,
    columns: <LayoutColumns />
  };

  return (
    <Watermark className="watermark-content" zIndex={1001} content={watermark ? ["Hooks Admin", "Happy Working"] : []}>
      {LayoutComponents[layout]}
      <ThemeDrawer />
    </Watermark>
  );
};

export default LayoutIndex;
