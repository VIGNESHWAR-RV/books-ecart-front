import * as React from 'react';
import "./headerLarge.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import RVlogo2 from "../../author images/RVlogo2.jfif"
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CottageTwoToneIcon from '@mui/icons-material/CottageTwoTone';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import { useState, useContext } from 'react';
import { context } from '../../App';

export function HeaderLarge() {


  const { theme, setTheme } = useContext(context);


  const style = {
    display: "block",
    position: "fixed",
    background: (theme) ? "rgb(255, 255, 255)" : "black",
    width: "100%",
    zIndex: "4"
  }

  const [selectValue, setSelectValue] = useState("title");

  const categoryStyles = {
    color: "#ff8800",
    borderRight: "3px solid #ff8800",
    padding: "0 2%",
    fontSize: "1vmax",
    borderRadius: "0",
    transition: "all 0.6s ease-in-out",
    ":hover": {
      fontSize: "1.25vmax",
      color: (theme) ? "black" : "white"
    }
  }

  return (
    <Box id='headerLarge' sx={style}>

      <Box sx={{ display: "flex", padding: "1rem", alignItems: "centre" }}>


        <Box sx={{ display: "flex", color: "#ff8800", cursor: "pointer", padding: "0 1.5%" }}>
          <Avatar
            alt="RV"
            src={RVlogo2}
            sx={{ minWidth: 66, minHeight: 66 }}
          />
          <h3 style={{
            transform: "translateX(-0.8rem)",
            background: "black",
            height: "1.8rem",
            width: "1.8rem",
            borderRadius: "1rem"
          }}><i>.in</i></h3>
        </Box>

        <Box sx={{
          display: "flex",
          border: "3px solid #ff8800",
          borderRadius: "2rem",
          alignItems: "baseline",
          width: "100%",
          padding: "0 1rem 0 0.5rem",
          marginBottom: "1rem"
        }}>

          <Select color="warning"
            value={selectValue}
            sx={{
              color: "#black",
              width: "auto",
              border: { borderRadius: "3rem" },
              background: "#ff8800",
              margin: "0 1rem 4px 0rem",
              transform: "translateY(-5px)",
              height: "2rem"
            }}
            variant="outlined"
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <MenuItem value={"title"}>Title</MenuItem>
            <MenuItem value={"isbn"}>ISBN</MenuItem>
            <MenuItem value={"authors"}>Author</MenuItem>
            <MenuItem value={"categories"}>Category</MenuItem>
          </Select>

          <TextField
            InputLabelProps={{ style: { color: (theme) ? "black" : '#ff8800', fontSize: "1rem" } }}
            sx={{ input: { color: (theme) ? "black" : '#ff8800' } }}
            variant="standard"
            color='warning'
            label="Search"
            fullWidth
          />

        </Box>

        <Box sx={{ display: "flex", padding: "0 2%" }}>

          <Button color="warning" sx={{}}>
            <Badge
              color="warning"
              badgeContent={0}
            >
              <ShoppingCartOutlinedIcon
                sx={{
                  fontSize: "2.8rem",
                  color: "#ff8800",
                }} />
            </Badge>
          </Button>
          <Button sx={{ color: "#ff8800" }}>
            <AccountCircleIcon
              sx={{
                fontSize: "2.8rem",
                color: "#ff8800"
              }} />
            Login
          </Button>
        </Box>

      </Box>

      <Box sx={{ display: "flex", width: "100%" }}>

        <Box sx={{
          display: "flex",
          justifyContent: "center",
          margin: "0 0 10px 0",
          width: "100%"
        }}>

          <Button sx={categoryStyles}>
            <CottageTwoToneIcon sx={{
              color: "#ff8800",
              fontSize: "2.2vmax",
              transition: "all 0.6s ease-in-out",
              ":hover": {
                transform: "scale(1.25)",
                color: (theme) ? "black" : "white"
              }
            }} />
          </Button>
          <Button sx={categoryStyles}>
            Books
          </Button>
          <Button sx={categoryStyles}>
            New Arrivals
          </Button>
          <Button sx={categoryStyles}>
            Best Sellers
          </Button>
          <Button sx={categoryStyles}>
            Award Winners
          </Button>
          <Button sx={{ ...categoryStyles, border: "none" }}>
            Featured Authors
          </Button>
        </Box>

        <Button onClick={() => setTheme(!theme)} color="warning">
          {(theme)
            ? <LightModeTwoToneIcon sx={{
              color: "#ff8800",
              fontSize: "2rem",
              padding: "0 20px 10px 10px"
            }} />
            : <DarkModeTwoToneIcon sx={{
              color: "#ff8800",
              fontSize: "2rem",
              padding: "0 20px 10px 10px"
            }} />
          }
        </Button>
      </Box>
    </Box>
  );
}
