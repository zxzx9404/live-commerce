import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import styled from 'styled-components';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SButton = styled.button `
  border: 0px solid black;
  background-color: white;
`;

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <SButton onClick={handleOpen} style={{width: "100%;"}}><HelpOutlineIcon /></SButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            이 버튼들은 뭔가요?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            버튼을 클릭해 여러분의 니즈를 표현해보세요! 클릭 수는 누적되어 여러분이 어떤 정보를 원하는지 호스트가 쉽게 파악할 수 있습니다.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}