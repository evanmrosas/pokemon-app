import { useEffect, useState } from "react"
import * as React from 'react';
import axios from 'axios'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';


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
console.log(pokemonData)
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokiverse
          </Typography>
          <Button color="inherit">Battle</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Box>
      <Typography variant="h4">Pick Your Pokemon!!</Typography>
    </Box>
    <Box component="section" sx={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap'
      }}>
      {pokemonData.map((poki, index) => (
        <Card key={index} sx={{ 
          width: 200,
          margin: 3
          }} >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {poki.name}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Add
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
    </>
    
  )
}

export default App
