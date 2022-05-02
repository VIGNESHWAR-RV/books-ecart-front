import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import  Button  from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CottageTwoToneIcon from '@mui/icons-material/CottageTwoTone';
import { context } from '../App';

export function MenuBarForSmallScreens() {

  const { setShowMenu, theme,handleCheckOutDialogOpen } = useContext(context);

  const navigate = useNavigate();

  const ButtonStyles = {
    color: "#ff8800",
    fontSize: "normal",
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
      <Box sx={{ display: "block", 
                 borderRight: "3px solid #ff8800",
                 minWidth:"16rem", 
                 background: (theme) ? "black" : "whiteSmoke" }}>

        <Box sx={{
          height: "10vh",
          display: "grid",
          placeItems: "center",
        }}>
          <IconButton sx={{ color: "#ff8800", fontSize: "2vmax", textTransform: "capitalize" }}
                      onClick={()=>handleCheckOutDialogOpen()}>
            <AccountCircleIcon
              sx={{
                fontSize: "3.3rem",
                color: "#ff8800"
              }} />
          </IconButton>
        </Box>

        <hr />

        <Box sx={{ display: "grid", placeItems: "center", rowGap: "1rem" }}>
          <Button sx={ButtonStyles} onClick={()=>{setShowMenu(false);navigate("/")}}>
            Home
            <CottageTwoToneIcon sx={ButtonStyles} />
          </Button>
          <Button sx={ButtonStyles}  onClick={()=>{setShowMenu(false);navigate("/Books")}}>
            Books
          </Button>
          <Button sx={ButtonStyles} onClick={()=>{setShowMenu(false);navigate("/New Arrivals")}}>New Arrivals</Button>
          <Button sx={ButtonStyles} onClick={()=>{setShowMenu(false);navigate("/Best Sellers")}}>Best Sellers</Button>
          <Button sx={ButtonStyles} onClick={()=>{setShowMenu(false);navigate("/Award Winners")}}>Award Winners</Button>
          {/* <Button sx={ButtonStyles}>Featured Authors</Button> */}
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
