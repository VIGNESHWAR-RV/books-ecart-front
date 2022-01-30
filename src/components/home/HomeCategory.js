import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export function HomeCategory({ name, count }) {

const history = useHistory();

  return (
    <Box sx={{ display: "flex" }}>
      <Button sx={{
        color: "#ff8800",
        display: "grid",
        justifyContent: "start",
        fontSize: " 1.15vh",
        margin: "0px 0px 10px 10px",
        transition: "all 0.3s ease-in-out",
        ":hover": {
          background: "#ff8800",
          color: "white",
        }
      }}
      onClick={()=>history.push(`/${name}`)}
      >
        {name}
      </Button>
      <span style={{ fontSize: "1.2rem" }}>( {count} )</span>
    </Box>
  );
}
