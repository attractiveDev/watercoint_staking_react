import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material'
import Modal from '@mui/material/Modal';
import connectors from './config';
import useAuth from '../../hook/useAuth';

const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '350px',
  bgcolor: 'white',
  border: '2px solid #00d2ff',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'space-around',
};


export default function WalletModal({ modalVisible, setModalVisible }: any) {
  const handleClose = () => setModalVisible(false);
  const { login } = useAuth();
  return (

    <Modal
      open={modalVisible}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {
          connectors.map((Info: any, index: number) => (
            <Button key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '200px',
                color: 'black'
              }}

              onClick={() => { login(Info.connectorId); setModalVisible(false); }}
            >
              <Info.Icon sx={{ width: '50px', height: 'auto' }} />
              <Typography>{Info.title}</Typography>
            </Button>
          ))
        }

      </Box>
    </Modal>

  );
}
