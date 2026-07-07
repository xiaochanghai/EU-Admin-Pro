import { useState, useEffect, useMemo } from "react";
import { RouterProvider as Router, RouteObject, createHashRouter, createBrowserRouter } from "react-router-dom";
import { convertToDynamicRouterFormat } from "./helper/ConvertRouter";
import { wrappedStaticRouter } from "./modules/staticRouter";
import { RootState, useSelector } from "@/redux";
import { RouteObjectType } from "./interface";
import useTheme from "@/hooks/useTheme";
import useMessage from "@/hooks/useMessage";
import usePermissions from "@/hooks/usePermissions";
import NotFound from "@/components/Error/404";
import { PageLoader } from "@/components/Loading";

const mode = import.meta.env.VITE_ROUTER_MODE;

/**
 * @description Route file entry
 */
const RouterProvider: React.FC = () => {
  // useTheme && useMessage
  useTheme();
  useMessage();

  const { initPermissions } = usePermissions();

  const token = useSelector((state: RootState) => state.user.token);
  const authMenuList = useSelector((state: RootState) => state.auth.authMenuList);

  const [routerList, setRouterList] = useState<RouteObjectType[]>(wrappedStaticRouter);
  const [permissionsReady, setPermissionsReady] = useState(false);

  useEffect(() => {
    // When refreshing the page, there is no menu data
    if (!authMenuList.length) {
      if (!token) {
        setPermissionsReady(true);
        return;
      }
      setPermissionsReady(false);
      initPermissions(token).finally(() => setPermissionsReady(true));
      return;
    }

    // Convert to the routing structure required by react-router
    const dynamicRouter = convertToDynamicRouterFormat(authMenuList);
    let allRouter = [...wrappedStaticRouter, ...dynamicRouter];

    // To prevent 404 from refreshing the page, add the * route at the end
    allRouter.forEach(item => item.path === "*" && (item.element = <NotFound />));

    // Set routerList
    setRouterList(allRouter);
    setPermissionsReady(true);
  }, [authMenuList]);

  const router = useMemo(() => {
    const routerMode = {
      hash: () => createHashRouter(routerList as RouteObject[]),
      history: () => createBrowserRouter(routerList as RouteObject[])
    };
    return routerMode[mode]();
  }, [routerList]);

  if (!permissionsReady) return <PageLoader />;

  return <Router router={router} />;
};

export default RouterProvider;
