// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';
import { useState } from 'react';
import { useEffect } from 'react';
import  axios  from 'axios';
// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------
// {fShortenNumber(total)}
AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, ...other }) {
  const [User,setUser]=useState([])
  console.log(title);
  useEffect(() => {
    axios.get("http://localhost:5002/api/client/getAllclient").then(res=>{setUser(res.data)
}).catch(err => console.log(err))
    
      }, [])
      const generateUniqueSortedNumber = ((arr) => {
       
          let result;
        
          var i =0
          while(i<4){
            const element = arr[i];
        
          
            
              result = element;
              i++
          return result;
          }
        }
      )
      
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
     
      <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </StyledIcon>

      <Typography variant="h3">{generateUniqueSortedNumber(['5','6',User.length,"0"])}</Typography>
      
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
