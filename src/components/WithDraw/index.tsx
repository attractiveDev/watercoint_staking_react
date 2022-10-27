import { useEffect, useState, useCallback } from 'react';
import { Box, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify';
import Abi from '../../contract/abi.json';
import config from '../../Config/config.json';
import { getData, getMaxTime, getContract } from '../../utils/contractHelpers'
import useActiveWeb3React from '../../hook/useActiveWeb3React';

const WithDraw = (props: any) => {
  const { action } = props;
  const [loading, setLoading] = useState(false);
  const { account, chainId, library } = useActiveWeb3React();
  const [data, setData] = useState<any>([]);
  const [maxTime, setMaxTime] = useState<any>();
  const fetchData = useCallback(async () => {
    try {
      if (!!account && chainId) {
        const tempData = await getData(Abi, config.stake_contract, account, library?.getSigner());
        setData([...tempData])
      }
      const tempMaxTime = await getMaxTime(Abi, config.stake_contract, library?.getSigner());
      setMaxTime(tempMaxTime);

    }
    catch (err) {
      console.log("err", err);
    }
  }, [account, chainId, library]);
  const withdraw = async (index: number) => {
    setLoading(true);
    try {
      const contract = getContract(Abi, config.stake_contract, library?.getSigner());
      let tx = await contract.withdraw(index);
      await tx.wait();
      toast("Success Withdraw", { position: "bottom-left", type: "success" });
    }
    catch (err) {
      toast("Failured Withdraw", { position: "bottom-left", type: "error" });
      console.log("erro", err);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, [account, action, fetchData])
  return (
    <>
      <Box
        sx={{
          overflow: 'scroll',
          width: '350px',
          height: '450px',
          padding: '10px',
          backgroundColor: '#F1F5F9',
          borderRadius: '10px',
          border: '2px solid #7DD3FC'
        }}>
        {
          data.length === 0 ?
            <Box>You have no stakes yet!</Box>
            :
            <Box>
              {
                data.map((item: any, index: number) => (
                  <Stack key={index} direction='row' spacing={1.5} sx={{ padding: '10px 0px' }}>
                    <div>{index + 1}</div>
                    {
                      item.withdrawn && <div>Already withdrawn!</div>
                    }
                    {
                      (!item.withdrawn && (Date.now() - item.created * 1000 > maxTime * 1000)) && <div>Safe to Withdraw!</div>
                    }
                    {
                      (!item.withdrawn && (Date.now() - item.created * 1000 < maxTime * 1000)) && <div>Subject to penalties<p style={{ color: 'dodgerblue', marginTop: '5px', fontSize: '12px' }}>{
                        (maxTime * 1000 - (Date.now() - item.created * 1000)) /
                          1000 /
                          3600 < 1 ? ((maxTime * 1000 - (Date.now() - item.created * 1000)) / 1000 / 60).toFixed(0) + "minutes left" : ((maxTime
                            * 1000 - (Date.now() - item.created * 1000)) / 1000 / 3600).toFixed(0) + " hours left"}</p></div>
                    }
                    <div>
                      <div>You staked {item.amount / 10 ** 9}</div>
                    </div>
                    {
                      !item.withdrawn && <LoadingButton key={index} loading={loading} loadingIndicator="Loading…"
                        variant="outlined" sx={{ color: 'white', backgroundColor: 'dodgerblue', margin: '2px', fontSize: '12px', maxHeight: '30px', padding: '15px' }} onClick={() => { withdraw(index) }} >Withdraw</LoadingButton>
                    }
                  </Stack>
                ))
              }
            </Box>

        }
      </Box>
    </>
  );
}

export default WithDraw;