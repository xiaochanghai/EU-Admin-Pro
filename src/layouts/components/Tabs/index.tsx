import React, { useEffect } from "react";
import { Tabs } from "antd";
import { CSS } from "@dnd-kit/utilities";
import { useUpdateEffect } from "ahooks";
import { type DragEndEvent, DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import { useLocation, useMatches, useNavigate } from "react-router-dom";
import { RootState, useDispatch, useSelector } from "@/redux";
import { addTab, removeTab, setTabsList } from "@/redux/modules/tabs";
import { TabsListProp } from "@/redux/interface";
import { MetaProps } from "@/routers/interface";
import { Icon } from "@/components/Icon";
import MoreButton from "./components/MoreButton";
import "./index.less";

type TargetKey = string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>;

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  "data-node-key": string;
}

const DraggableTabNode = ({ ...props }: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props["data-node-key"]
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleX: 1 }),
    transition
  };

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners
  });
};

const LayoutTabs: React.FC = () => {
  const matches = useMatches();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname + location.search;

  const tabs = useSelector((state: RootState) => state.global.tabs);
  const tabsIcon = useSelector((state: RootState) => state.global.tabsIcon);
  const tabsDrag = useSelector((state: RootState) => state.global.tabsDrag);
  const tabsList = useSelector((state: RootState) => state.tabs.tabsList);
  const flatMenuList = useSelector((state: RootState) => state.auth.flatMenuList);

  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });

  useEffect(() => initTabs(), []);

  const initTabs = () => {
    flatMenuList.forEach(item => {
      if (item.meta?.isAffix && !item.meta.isHide && !item.meta.isFull) {
        const tabValue = {
          icon: item.meta.icon!,
          title: item.meta.title!,
          path: item.path!,
          closable: !item.meta.isAffix
        };
        dispatch(addTab(tabValue));
      }
    });
  };

  // Listen for route changes
  useUpdateEffect(() => {
    const meta = matches[matches.length - 1].data as MetaProps & { redirect: boolean };
    if (!meta?.redirect) {
      const tabValue = {
        icon: meta.icon!,
        title: meta.title!,
        path: path,
        closable: !meta.isAffix
      };
      dispatch(addTab(tabValue));
    }
  }, [matches]);

  const items = tabsList.map(item => {
    return {
      key: item.path,
      label: (
        <React.Fragment>
          {tabsIcon && <Icon name={item.icon} />}
          {item.title}
        </React.Fragment>
      ),
      closable: item.closable
    };
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = tabsList.findIndex(i => i.path === active.id);
      const overIndex = tabsList.findIndex(i => i.path === over?.id);
      dispatch(setTabsList(arrayMove<TabsListProp>(tabsList, activeIndex, overIndex)));
    }
  };

  const onChange = (path: string) => {
    navigate(path);
  };

  const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    if (action === "remove" && typeof targetKey == "string") {
      dispatch(removeTab({ path: targetKey, isCurrent: targetKey == path }));
    }
  };

  return (
    <React.Fragment>
      {tabs && (
        <Tabs
          hideAdd
          type="editable-card"
          className="tabs-box"
          size="middle"
          items={items}
          activeKey={path}
          onEdit={onEdit}
          onChange={onChange}
          tabBarExtraContent={<MoreButton path={path} />}
          {...(tabsDrag && {
            renderTabBar: (tabBarProps, DefaultTabBar) => (
              <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                <SortableContext items={items.map(i => i.key)} strategy={horizontalListSortingStrategy}>
                  <DefaultTabBar {...tabBarProps}>
                    {node => (
                      <DraggableTabNode {...node.props} key={node.key}>
                        {node}
                      </DraggableTabNode>
                    )}
                  </DefaultTabBar>
                </SortableContext>
              </DndContext>
            )
          })}
        />
      )}
    </React.Fragment>
  );
};

export default LayoutTabs;
