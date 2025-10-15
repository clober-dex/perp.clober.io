"use client";

import React, { FC, useEffect } from "react";
import { OrderlyAppProvider } from "@orderly.network/react-app";
import { useLocalStorage } from "@orderly.network/hooks";
import {
  WalletConnectorPrivyProvider,
  wagmiConnectors,
} from "@orderly.network/wallet-connector-privy";
import { Adapter, WalletError } from "@solana/wallet-adapter-base";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useOrderlyConfig } from "@/hooks/useOrderlyConfig";
import {
  getLocalePathFromPathname,
  i18n,
  LocaleCode,
  LocaleProvider,
} from "@orderly.network/i18n";
import { usePathWithoutLang } from "@/hooks/usePathWithoutLang";
import { usePathname } from "next/navigation";
import { useNav } from "@/hooks/useNav";

const OrderlyProvider: FC<React.PropsWithChildren> = (props) => {
  const config = useOrderlyConfig();
  const path = usePathWithoutLang();
  const pathname = usePathname();
  const { onRouteChange } = useNav();

  const [networkId, setNetworkId] = useLocalStorage(
    "dmm-local-storage-network-id",
    // TODO: Change to mainnet when launching
    "mainnet"
  );

  const solWallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new LedgerWalletAdapter(),
  ];

  const onLanguageChanged = async (lang: LocaleCode) => {
    window.history.replaceState({}, "", `/${lang}${path}`);
  };

  const loadPath = (lang: LocaleCode) => {
    // if (lang === LocaleEnum.en) {
    //   // because en is built-in, we need to load the en extend only
    //   return `/locales/extend/${lang}.json`;
    // }
    return [`/locales/en.json`, `/locales/extend/en.json`];
  };

  useEffect(() => {
    const lang = getLocalePathFromPathname(pathname);
    // if url is include lang, and url lang is not the same as the i18n language, change the i18n language
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [pathname]);

  return (
    <LocaleProvider
      onLanguageChanged={onLanguageChanged}
      backend={{ loadPath }}
    >
      <WalletConnectorPrivyProvider
        // termsOfUse={"https://learn.woo.org/legal/terms-of-use"}
        network={networkId}
        solanaConfig={{
          wallets: solWallets as Adapter[],
          onError: (error: WalletError, adapter?: Adapter) => {
            console.log("solana wallet error", error, adapter);
            console.error(error);
          },
        }}
        wagmiConfig={{
          connectors: [
            wagmiConnectors.injected(),
            wagmiConnectors.walletConnect({
              projectId: "14e09398dd595b0d1dccabf414ac4531",
              showQrModal: true,
              storageOptions: {},
              metadata: {
                name: "CloberDex",
                description: "Fully On-chain Order Book",
                url: "https://clober.io",
                icons: ["/clober-logo.svg"],
              },
            }),
          ],
        }}
        enableSwapDeposit
      >
        <OrderlyAppProvider
          // TODO: change it
          brokerId="demo"
          brokerName="Orderly"
          networkId={networkId}
          appIcons={config.orderlyAppProvider.appIcons}
          enableSwapDeposit
          onChainChanged={(
            chainId: number,
            state: {
              isTestnet: boolean;
              isWalletConnected: boolean;
            }
          ) => {
            const nextState = state.isTestnet ? "testnet" : "mainnet";
            setNetworkId(nextState);
            if (networkId !== nextState) {
              window.location.reload();
            }
          }}
          onRouteChange={onRouteChange}
        >
          {props.children}
        </OrderlyAppProvider>
      </WalletConnectorPrivyProvider>
    </LocaleProvider>
  );
};

export default OrderlyProvider;
