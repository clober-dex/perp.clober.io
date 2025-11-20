import {useMemo} from "react";
import Link from "next/link";
import {TradingPageProps} from "@orderly.network/trading";
import {BottomNavProps, FooterProps, MainNavWidgetProps,} from "@orderly.network/ui-scaffold";
import {type RestrictedInfoOptions} from "@orderly.network/hooks";
import {AppLogos} from "@orderly.network/react-app";
import {useTranslation} from "@orderly.network/i18n";
import {PathEnum} from "@/constant";

export type OrderlyConfig = {
  orderlyAppProvider: {
    appIcons: AppLogos;
    restrictedInfo?: RestrictedInfoOptions;
  };
  scaffold: {
    mainNavProps: MainNavWidgetProps;
    footerProps: FooterProps;
    bottomNavProps: BottomNavProps;
  };
  tradingPage: {
    tradingViewConfig: TradingPageProps["tradingViewConfig"];
    sharePnLConfig: TradingPageProps["sharePnLConfig"];
  };
};

export const useOrderlyConfig = () => {
  const { t } = useTranslation();

  return useMemo<OrderlyConfig>(() => {
    return {
      scaffold: {
        mainNavProps: {
          mainMenus: [
            {
              name: t("common.trading"),
              href: PathEnum.Root,
              isHomePageInMobile: true,
            },
            { name: t("common.portfolio"), href: PathEnum.Portfolio },
            { name: t("common.markets"), href: PathEnum.Markets },
            {
              name: t("tradingLeaderboard.leaderboard"),
              href: PathEnum.Leaderboard,
            },
            {
              name: "Spot",
              target: "_blank",
              href: "https://app.clober.io",
            },
          ],
          initialMenu: PathEnum.Root,
        },
        footerProps: {
          discordUrl: "https://discord.gg/clober-dex",
          twitterUrl: "https://twitter.com/CloberDEX",
        },
        bottomNavProps: {
          mainMenus: [
            // {
            //   name: t("common.markets"),
            //   href: PathEnum.Markets,
            //   activeIcon: <MarketsActiveIcon />,
            //   inactiveIcon: <MarketsInactiveIcon />,
            // },
            // {
            //   name: t("common.trading"),
            //   href: PathEnum.Root,
            //   activeIcon: <TradingActiveIcon />,
            //   inactiveIcon: <TradingInactiveIcon />,
            // },
            // {
            //   name: t("common.portfolio"),
            //   href: PathEnum.Portfolio,
            //   activeIcon: <PortfolioActiveIcon />,
            //   inactiveIcon: <PortfolioInactiveIcon />,
            // },
          ],
        },
      },
      orderlyAppProvider: {
        appIcons: {
          main: {
            component: (
              <Link id="primary-logo-link" data-discover="true" href="/perp">
                <img src="/clober-logo.svg" alt="logo" style={{ width: 114 }} />
              </Link>
            ),
          },
        },
        restrictedInfo: {
          enableDefault: true,
          customRestrictedIps: [],
          customRestrictedRegions: [],
        },
      },
      tradingPage: {
        tradingViewConfig: {
          scriptSRC: "/tradingview/charting_library/charting_library.js",
          library_path: "/tradingview/charting_library/",
          customCssUrl: "/tradingview/chart.css",
        },
        sharePnLConfig: {
          backgroundImages: [
            // TODO: add background images
            // "/pnl/poster_bg_1.png",
            // "/pnl/poster_bg_2.png",
            // "/pnl/poster_bg_3.png",
            // "/pnl/poster_bg_4.png",
          ],

          color: "rgba(255, 255, 255, 0.98)",
          profitColor: "rgba(41, 223, 169, 1)",
          lossColor: "rgba(245, 97, 139, 1)",
          brandColor: "rgba(255, 255, 255, 0.98)",

          // ref
          refLink: typeof window !== 'undefined' ? window.location.origin : undefined,
          refSlogan: "Clober Dex",
        },
      },
    };
  }, [t]);
};
