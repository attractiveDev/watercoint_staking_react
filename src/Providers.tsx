import { Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux';
import getLibrary from './utils/getLibrary'
import store from './redux/store';


const Providers = ({ children }: any) => {

  return (
    <>
      <Provider store={store}>
        <Web3ReactProvider getLibrary={getLibrary}>
          {children}
        </Web3ReactProvider>
      </Provider>
    </>
  );
}

export default Providers;