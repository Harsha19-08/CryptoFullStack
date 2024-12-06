import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';

const Signup = ({handleClose}) => {
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const [confirmPassword,setConfirmPassword] =useState("");
    
    const { setAlert }=CryptoState();
    const handleSubmit=async()=>{
        if(password!==confirmPassword){
            setAlert({
                open:true,
                message:"Password don't match",
                type:"error",
            });
            return;
        }

        try{
            const result=await createUserWithEmailAndPassword(
                auth,email,password);
            setAlert({
                open:true,
                message:`Sign Up Successfull. Welcome ${result.user.email}`,
                type:"success",
            });
            handleClose();
        }catch(error){
            setAlert({
                open:true,
                message:error.message,
                type:"error",
            });
            return;
        
         }
    }
  return (
        <Box
        p={3}
        style={{display:"flex",flexDirection:"column",gap:"20px"}}
        >
            <TextField
            variant='outlined'
            type='email'
            label="Enter Email"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            fullWidth
            />
            <TextField
            variant='outlined'
            type='password'
            label="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            fullWidth
            />
            <TextField
            variant='outlined'
            type='password'
            label="ConfirmPassword"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            fullWidth
            
            />
            <Button
              variant='contained'
              size='large'
              style={{backgroundColor:"white", color:"black",fontWeight:"bold"}}
              onClick={handleSubmit}
            
            >Sign Up</Button>
        </Box> 

    )
}

export default Signup
