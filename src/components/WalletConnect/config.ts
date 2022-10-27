import Metamask from "./Icons/Metamask";
import WalletConnect from "./Icons/WalletConnect";
import { Config, ConnectorNames } from './type';

const connectors: Config[] = [
  {
    title: "Metamask",
    Icon: Metamask,
    connectorId: ConnectorNames.Injected,
  },
  {
    title: "WalletConnect",
    Icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
  },
];

export default connectors;
