'use client'
import React, { useState } from 'react';
import { Pokemon } from '@/utils/interfaces';
import {styled} from '@mui/system';
import { getFirestore } from 'firebase/firestore';
import { getApp } from '@/services/db';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import MediaCard from '@/components/Card';
import AlertComponent from '@/components/Alert';
const MainContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
  padding: '20px',
});

const Title = styled('h1')({
  textAlign: 'center',
  fontSize: '36px',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#333',
  textTransform: 'uppercase',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
});

const CardContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '20px',
});

type MainProps = {
  pokemon: Pokemon[];
};

export default function Main({ pokemon }: MainProps) {
  const [selected, setselected] = useState<Array<string>>([]);
  const [saveButtonClicked, setSaveButtonClicked] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setseverity] = useState(true)
   const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAdd = (data: string) => {
    setselected([...selected, data]);
  };

  const handleRemove =(data: string) => {
    setselected(selected.filter((val:string) => val!==data))
  }
  const SaveData= async()=>{
      try{
        const app=  getApp();
        const db = getFirestore(app);
        const selectedDataRef = collection(db, 'stored_data');
        const userId= localStorage.getItem("userId");
        await addDoc(selectedDataRef, { userId, selected });
        setSnackbarMessage("Data uploaded succssfully")
        setseverity(false)
        setSnackbarOpen(true)
    }
    catch(e){
      console.log(e);
      setSnackbarMessage("Error in data upload")
      setseverity(true);
      setSnackbarOpen(true)
    }
    
  }

  return (
    <MainContainer>
      <Title>pokedex</Title>
      <CardContainer>
        {pokemon?.map((poke: Pokemon) => (
          <MediaCard 
          key={poke.name} 
          name={poke.name} 
          img={poke.img} 
          Add={handleAdd}
          save={saveButtonClicked}
          setSave={setSaveButtonClicked}
          SaveData={SaveData}
          Remove={handleRemove}
           />
        ))}
      </CardContainer>
      <AlertComponent open={snackbarOpen} close={handleSnackbarClose} msg={snackbarMessage} severity={severity} />
    </MainContainer>
  );
}
