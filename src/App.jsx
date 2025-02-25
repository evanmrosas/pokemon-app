import { useEffect, useState } from "react"
import * as React from 'react';
import axios from 'axios'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function App() {
const [pokemonData, setPokemonData] = useState([]);

useEffect(() => {
  axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
    .then((res) => {
      setPokemonData(res.data.results)
    })
    .catch((err) => {
      console.log(err)
    })
}, [])

  return (
    <>
    <Box component="section" sx={{ 
      border: '1px dashed grey', 
      display: 'flex',
      flexWrap: 'wrap'
      }}>
      {pokemonData.map((poki, index) => (
        <Card sx={{ maxWidth: 345 }} key={index}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {poki.name}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
    </>
    
  )
}

export default App
