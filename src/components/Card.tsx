import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Pokemon } from '@/utils/interfaces';
import { styled } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Fab from '@mui/material/Fab';
import SaveIcon from '@mui/icons-material/Save';
import { Tooltip } from '@mui/material';
import { MediaCardProps } from '@/utils/interfaces';


const CardContainer = styled(Card)({
  maxWidth: 345,
  minWidth: 200,
});

const CardImage = styled(CardMedia)({
  height: 140,
  cursor: "pointer"
});

const CardTitle = styled(Typography)({
  marginBottom: '10px',
});

const ActionsContainer = styled(CardContent)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const CheckboxContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const CheckboxText = styled(Typography)({
  marginLeft: '10px',
});

const LearnMoreButton = styled(Button)({
  marginLeft: 'auto',
});

const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border: 2px solid #000000;
  box-shadow: 24px;
  padding: 16px;
`;

const SaveButton = styled(Fab)({
  position: 'fixed',
  top: '20px',
  right: '20px',
  transition: 'all 0.3s ease-in-out',
});

const MediaCard: React.FC<MediaCardProps> = ({ name, img, Add, save, setSave, SaveData, Remove }) => {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      Add(name);
      if (!save) {
        setShowSaveButton(true);
        setSave(true);
      }
    }
    else{
      Remove(name)
    }
  };


  const handleLearnMoreClick = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <CardContainer>
      <CardImage image={img} title={name} onClick={handleLearnMoreClick} />
      <CardContent>
        <CardTitle gutterBottom variant="h5">
          {name}
        </CardTitle>
      </CardContent>
      <ActionsContainer>
        <CheckboxContainer>
          <Checkbox checked={checked} onChange={handleCheckboxChange} />
          <CheckboxText>Add to DB</CheckboxText>
        </CheckboxContainer>
      </ActionsContainer>
      <Modal open={open} onClose={handleCloseModal}>
        <ModalContent>
          <Typography variant="h6" component="h2">
            {name}
          </Typography>
          <Typography>A sample model for adding information about {name}</Typography>
        </ModalContent>
      </Modal>
      {showSaveButton && (
        <Slide direction="left" in={showSaveButton}>
          <Tooltip title="Click to Save">
          <SaveButton color="primary" onClick={SaveData}>
            <SaveIcon />
          </SaveButton>
          </Tooltip>
        </Slide>
      )}
    </CardContainer>
  );
};

export default MediaCard;
