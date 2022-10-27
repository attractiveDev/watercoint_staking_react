import { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import useActiveWeb3React from '../../hook/useActiveWeb3React';
import { getContract } from '../../utils/contractHelpers';
import Abi from '../../contract/abi.json';
import ERC20 from '../../contract/secondaryabi.json';
import config from '../../Config/config.json';

const Stake = (props: any) => {
  const { setAction } = props;
  const [loading, setLoading] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(0);
  const { account, library, chainId } = useActiveWeb3React();
  const handleChange = (event: any) => {
    setStakeAmount(event.target.value);
  }
  const handleStake = async () => {
    setLoading(true);
    setAction(true);
    try {
      if (!!account && chainId) {
        if (stakeAmount === 0) {
          toast("Enter the values correctly.", { position: "bottom-left", type: "error" });
          setLoading(false);
          return 0;
        }
        const stakeContract = getContract(Abi, config.stake_contract, library?.getSigner());
        const tokenAddress = await stakeContract.getTokenAdd();
        const erc20Contract = getContract(ERC20, tokenAddress, library?.getSigner());
        const allowance = await erc20Contract.allowance(account, config.stake_contract);
        const decimals = await erc20Contract.decimals();
        const tempAmount = ethers.utils.parseUnits(stakeAmount.toString(), decimals);
        if (allowance.lt(tempAmount) || allowance.isZero()) {
          let atxHandle = await erc20Contract.approve(config.stake_contract, BigInt(10 ** 25));
          await atxHandle.wait();
        }
        const aTxHandle = await stakeContract.stake(stakeAmount * 10 ** 9);
        await aTxHandle.wait();
        toast("Stake Success.", { position: "bottom-left", type: "success" });
      } else {
        toast("Please connect wallet", { position: "bottom-left", type: "error" });
      }
    } catch (err: any) {
      toast(err?.error?.data.message || err.message, { position: "bottom-left", type: "error" });
    }
    setLoading(false);
    setAction(false)
  }
  return (
    <>
      <Box
        sx={{
          width: '350px',
          height: '450px',
          padding: "10px",
          backgroundColor: '#F1F5F9',
          borderRadius: '10px',
          border: '2px solid #7DD3FC'
        }}
      >
        <Stack direction='column' spacing={7}>
          <Typography>Select an amount to stake...</Typography>
          <Typography sx={{ maxWidth: '200px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: 'ellipsis' }}>Accont: {account}</Typography>
          <input value={stakeAmount} onChange={handleChange} style={{ width: '100%', fontSize: '18px' }} />
          <LoadingButton onClick={() => handleStake()} sx={{ color: 'white', backgroundColor: 'gray', fontSize: '20px', '&:hover': { backgroundColor: 'dodgerblue' } }} loading={loading} loadingIndicator="Loading…" variant="contained">Stake</LoadingButton>
        </Stack>
      </Box>
    </>
  );
}

export default Stake;