import { useEffect, useState } from "react";
import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [squad, setSquad] = useState([]);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
      .then((res) => {
        setPokemonData(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Function to add a Pokémon to the squad
  const addToSquad = (poki) => {
    if (squad.length < 6) {
      setSquad([...squad, poki]);
      setPokemonData(pokemonData.filter((p) => p.name !== poki.name));
    }
  };

  // Function to remove a Pokémon from the squad
  const removeFromSquad = (poki) => {
    setPokemonData([...pokemonData, poki]); // Restore to main list
    setSquad(squad.filter((p) => p.name !== poki.name)); // Remove from squad
  };

  return (
    <>
      {/* Navigation Bar */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Pokiverse
            </Typography>
            <Button color="inherit" disabled={squad.length < 2}>
              Battle
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Title */}
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography variant="h4">Pick Your Pokémon!!</Typography>
      </Box>

      {/* Squad List */}
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="h5">Your Squad ({squad.length}/6)</Typography>
        <Grid container justifyContent="center" spacing={2}>
          {squad.map((poki, index) => (
            <Grid item key={index}>
              <Card sx={{ width: 200 }}>
                <CardContent>
                  <Typography variant="h5">{poki.name}</Typography>
                </CardContent>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => removeFromSquad(poki)}
                >
                  Remove
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Available Pokémon List */}
      <Box
        component="section"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          mt: 4,
        }}
      >
        {pokemonData.map((poki, index) => (
          <Card key={index} sx={{ width: 200, margin: 2 }}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                {poki.name}
              </Typography>
            </CardContent>
            <Button
              size="small"
              color="primary"
              onClick={() => addToSquad(poki)}
              disabled={squad.length >= 6}
            >
              Add
            </Button>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default App;
