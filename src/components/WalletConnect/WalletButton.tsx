import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import WalletModal from './WalletModal';
import useActiveWeb3React from '../../hook/useActiveWeb3React';
import { setupNetwork } from '../../utils/wallet';

const StyleButton = styled(Button)({
  background: 'gray',
  border: 'none',
  borderRadius: '50px',
  padding: '2px 10px',
  width: '200px',
  color: 'white',
})


const WalletButton = ({ component }: any) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { account, chainId, deactivate, library } = useActiveWeb3React();
  return (
    <>
      {
        (!account) &&
        <StyleButton
          size='large'
          onClick={() => setModalVisible(true)}>
          Connect
        </StyleButton>
      }
      {
        (!!account && chainId === 56) &&
        <StyleButton
          size='large'
          onClick={() => deactivate()}>
          Disconnect
        </StyleButton>
      }
      {
        (account && chainId !== 56) &&
        <StyleButton
          size='large'
          onClick={() => setupNetwork(library?.provider)}>
          Switch
        </StyleButton>
      }
      {
        modalVisible &&
        <WalletModal
          {...component}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      }
    </>
  );
}

export default WalletButton;
