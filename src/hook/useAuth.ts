import { useCallback } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
// import { BscConnector } from '@binance-chain/bsc-connector'
import { UnsupportedChainIdError } from '@web3-react/core';
import { ConnectorNames } from '../components/WalletConnect/type'
import { setupNetwork } from '../utils/wallet';
import config from '../Config/config.json'
import useActiveWeb3React from './useActiveWeb3React';


export const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 25, 338, 97, 56],
});

export const WalletConnect = new WalletConnectConnector({
  rpc: { 97: config.write_rpc },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  supportedChainIds: [1, 3, 4, 5, 42, 25, 338, 97, 56],
});

// export const bscConnector = new BscConnector({ supportedChainIds: [1, 3, 4, 5, 42, 25, 338] })

export const connectorsByName = {
  [ConnectorNames.Injected]: Injected,
  [ConnectorNames.WalletConnect]: WalletConnect,
  // [ConnectorNames.BSC]: bscConnector,
}

const useAuth = () => {
  const { activate, deactivate, setError } = useActiveWeb3React();
  const login = useCallback(
    async (connectorID: ConnectorNames) => {
      const connector = connectorsByName[connectorID];
      if (connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            setError(error)
            const provider = await connector.getProvider();
            const hasSetup = await setupNetwork(provider);
            if (hasSetup) {
              activate(connector);
            }
          }
        })
      }
    }, [activate, setError]
  )
  const logout = useCallback(() => {
    deactivate();
    window.location.reload();
  }, [deactivate])

  return { login, logout };
}
export default useAuth;
