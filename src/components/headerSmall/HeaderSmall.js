import * as React from 'react';
import "./headerSmall.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import RVlogo2 from "../../author images/RVlogo2.jfif"
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState, useContext } from 'react';
import { context } from '../../App';

export function HeaderSmall() {

  const style = {
    display: "block",
    position: "fixed",
    background: "black",
    width: "100%",
    zIndex: "4"
  }

  const { setShowMenu } = useContext(context);

  const [selectValue, setSelectValue] = useState("title");


  return (
    <Box id='headerSmall' sx={style}>

      <Box sx={{ display: "flex", padding: "0.1rem", alignItems: "centre" }}>

        <Button color="warning" onClick={() => setShowMenu(true)}>
          <MenuRoundedIcon sx={{ fontSize: "2.5rem" }} />
        </Button>

        <Box sx={{ display: "flex", color: "#ff8800", cursor: "pointer" }}>
          <Avatar
            alt="RV"
            src={RVlogo2}
            sx={{ minWidth: 60, minHeight: 60 }}
          />
          <h3 style={{ transform: "translateX(-0.8rem)" }}><i>.in</i></h3>
        </Box>


        <Box sx={{ display: "flex", margin: "0 2% 0 auto" }}>

          <Button color="warning" sx={{}}>
            <Badge
              color="warning"
              badgeContent={0}
            >
              <ShoppingCartOutlinedIcon
                sx={{
                  fontSize: "2rem",
                  color: "#ff8800"
                }} />
            </Badge>
          </Button>
          <Button sx={{ color: "#ff8800" }}>
            <AccountCircleIcon
              sx={{
                fontSize: "2rem",
                color: "#ff8800"
              }} />
            Login
          </Button>

        </Box>
      </Box>
      <Box sx={{
        display: "flex",
        border: "3px solid #ff8800",
        borderRadius: "2rem",
        margin: "1%"
      }}>

        <Select color="warning"
          value={selectValue}
          sx={{
            color: "#black",
            width: "auto",
            border: { borderRadius: "3rem" },
            background: "#ff8800",
            margin: "8.5px",
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
          InputLabelProps={{ style: { color: '#ff8800' } }}
          sx={{ input: { color: '#ff8800' }, margin: "0 20px 4px 0" }}
          variant="standard"
          color='warning'
          label="Search"
          size="small"
          fullWidth
        />

      </Box>
    </Box>
  );
}
