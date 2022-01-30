import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CottageTwoToneIcon from '@mui/icons-material/CottageTwoTone';
import { context } from '../App';

export function MenuBar() {

  const { setShowMenu, theme } = useContext(context);

  const ButtonStyles = {
    color: "#ff8800",
    fontSize: "1.5vmax",
    borderRadius: "3rem",
    transition: "all 0.3s ease-in-out",
    ":hover": {
      transform: "scale(1.25)",
      color: (theme) ? "white" : "black"
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "0.4fr 0.6fr",
        zIndex: "6",
        background: "rgba(0, 0, 0, 0.766)",
        transition: "all 0.6s ease-in-out"
      }}>
      <Box sx={{ display: "block", borderRight: "3px solid #ff8800", background: (theme) ? "black" : "whiteSmoke" }}>

        <Box sx={{
          height: "10vh",
          display: "grid",
          placeItems: "center",
        }}>
          <Button sx={{ color: "#ff8800", fontSize: "2vmax", textTransform: "capitalize" }}>
            <AccountCircleIcon
              sx={{
                fontSize: "3.3rem",
                color: "#ff8800"
              }} />
            Hello,User
          </Button>
        </Box>

        <hr />

        <Box sx={{ display: "grid", placeItems: "center", rowGap: "1rem" }}>
          <Button sx={ButtonStyles}>
            Home
            <CottageTwoToneIcon sx={ButtonStyles} />
          </Button>
          <Button sx={ButtonStyles}>
            Books
          </Button>
          <Button sx={ButtonStyles}>New Arrivals</Button>
          <Button sx={ButtonStyles}>Best Sellers</Button>
          <Button sx={ButtonStyles}>Award Winners</Button>
          <Button sx={ButtonStyles}>Featured Authors</Button>
        </Box>

      </Box>

      <Box onClick={() => setShowMenu(false)}>
        <Button color="warning">
          <ClearRoundedIcon sx={{ fontSize: "2.5rem" }} />
        </Button>
      </Box>

    </Box>
  );
}
