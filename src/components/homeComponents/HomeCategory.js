import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export function HomeCategory({ name, count }) {

const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <Button sx={{
        color: "#ff8800",
        display: "grid",
        justifyContent: "start",
        fontSize: "normal",
        margin: "0px 0px 10px 10px",
        transition: "all 0.3s ease-in-out",
        ":hover": {
          background: "#ff8800",
          color: "white",
        }
      }}
      onClick={()=>navigate(`/${name}`)}
      >
        {name}
      </Button>
      <span style={{ fontSize: "1.2rem" }}>( {count} )</span>
    </Box>
  );
}
