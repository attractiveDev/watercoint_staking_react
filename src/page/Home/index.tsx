import { useState } from 'react';
import { Box, Stack, useMediaQuery } from '@mui/material';
import WalletButton from '../../components/WalletConnect/WalletButton';
import useActiveWeb3React from '../../hook/useActiveWeb3React';
import Stake from '../../components/Stake';
import WithDraw from '../../components/WithDraw';

const Home = () => {
  const [action, setAction] = useState<boolean>(false);
  const { chainId, account } = useActiveWeb3React();
  const mobile = useMediaQuery('(max-width: 900px)');
  return (
    <>
      <Box sx={{ padding: '7px 15px' }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src='./logo.png' style={{ width: '100px' }} alt='logo' />
          <WalletButton />
        </Box>
        <Stack direction={!mobile ? "row" : "column"} spacing={5} justifyContent='center' alignItems='center' sx={{ marginTop: '50px' }}>
          <Stake setAction={setAction} />
          {
            (!!account && chainId) &&
            <WithDraw action={action} />
          }
        </Stack>
      </Box>
    </>
  );
}


export default Home;