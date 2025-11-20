"use client";
import React, { ReactNode, useMemo } from "react";
import {
  PortfolioLayoutWidget,
  PortfolioLeftSidebarPath,
} from "@orderly.network/portfolio";
import { useNav } from "@/hooks/useNav";
import { useOrderlyConfig } from "@/hooks/useOrderlyConfig";
import { usePathWithoutLang } from "@/hooks/usePathWithoutLang";
import { PathEnum } from "@/constant";
import {useTranslation} from "@orderly.network/i18n";

export default function PortfolioLayout(props: { children: ReactNode }) {
  const config = useOrderlyConfig();
  const path = usePathWithoutLang();
  const { t } = useTranslation();
  const { onRouteChange } = useNav();

  const currentPath = useMemo(() => {
    if (path.endsWith(PathEnum.ApiKey)) return PortfolioLeftSidebarPath.ApiKey;

    return path;
  }, [path]);

    const customSideBarItems = [
        {
            name: t("common.overview"),
            href: "/portfolio"
        },
        {
            name: t("common.positions"),
            href: "/portfolio/positions"
        },
        {
            name: t("common.orders"),
            href: "/portfolio/orders"
        },
        {
            name: t("common.assets"),
            href: "/portfolio/assets"
        },
        {
            name: t("portfolio.apiKeys"),
            href: "/portfolio/api-key"
        },
        {
            name: t("portfolio.setting"),
            href: "/portfolio/setting"
        },
    ];

  return (
    <PortfolioLayoutWidget
      key={currentPath} // Force re-mount when path changes
      items={customSideBarItems}
      footerProps={config.scaffold.footerProps}
      mainNavProps={{
        ...config.scaffold.mainNavProps,
        initialMenu: PathEnum.Portfolio,
      }}
      routerAdapter={{
        onRouteChange,
        currentPath,
      }}
      leftSideProps={{
        current: currentPath,
      }}
      bottomNavProps={config.scaffold.bottomNavProps}
    >
      {props.children}
    </PortfolioLayoutWidget>
  );
}
