import * as React from 'react';
import "./headerLarge.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import RVlogo2 from "../../author images/RVlogo2.jfif"
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CottageTwoToneIcon from '@mui/icons-material/CottageTwoTone';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { useState, useContext, useRef } from 'react';
import { context } from '../../App';
import toast from 'react-hot-toast';
import { API } from '../../API';

export function HeaderLarge() {


  const { theme, setTheme,cartItems } = useContext(context);

  // for cart dialog open
  const { handleCartDialogOpen } = useContext(context);

  const { handleCheckOutDialogOpen } = useContext(context);

  const navigate = useNavigate();

  //  style for header section
  const style = {
    display: "block",
    position: "fixed",
    background: (theme) ? "rgba(40, 30, 0, 1)" : "rgb(50, 40, 30)",
    width: "100%",
    zIndex: "4",
  }

  const [keyword,setKeyword] = useState("");

  const [isLoading,setIsLoading] = useState(false);

  const [result,setResult] = useState([]);

  const [searchBy,setSearchBy] = useState("title")

  const searchByRef = useRef("title");

  const getSuggest = async(searchBy , keyword)=>{
    
     const response = await fetch(`${API}search?${searchBy}=${keyword}`);
     const data = await response.json();

     setIsLoading(false);
     if(response.status === 200){
         setResult([...data.result]);
         return;
     }
     else{
         toast.error("Server Busy, please try again later");
         return;
     }
    // console.log(data);
  }

  const handleSelect=(e)=>{
    // setValue({...value,select:e.target.value});
    searchByRef.current = e.target.value;
    setSearchBy(e.target.value);
    return;
  }

  const handleChange = (e,typingValue)=>{
     
      if(isLoading === false){
         setIsLoading(true);
      }
      // console.log(searchByRef.current,typingValue);
      if(typingValue !== ""){
         getSuggest(searchByRef.current , typingValue);
      }
      // setValue({...value,keyword:changedValue})
      setKeyword(typingValue);
      if(typingValue === ""){
         setIsLoading(false);
      }
  }

  const handleBlur = (e)=>{
    setIsLoading(false);
  }

  const handleSearch=(e,typedValue)=>{
    
    if(typedValue === null){
      return;
    }
    if(e.key === "Enter"){
      // console.log(value.select,value.keyword);
      navigate(`results?searchBy=${searchByRef.current}&keyword=${keyword}`);
      return;
    }
    //  console.log(searchByRef.current,typedValue);
      navigate(`results?searchBy=${searchByRef.current}&keyword=${typedValue}`); //`${searchByRef.current}/${keyword}`
    return;
  }

  const handleNavigate = ()=>{

      if(keyword !== null && keyword !== ""){
        // console.log(value.keyword);
        navigate(`results?searchBy=${searchByRef.current}&keyword=${keyword}`); 
      }
      else{
        toast.error("Type something to search through books");
      }
      return;
  }

  // const handleFocus = (e)=>{
  //   //  setIsLoading(true);
  // }


  // for buttons in the header 2 ( menu bar )
  const categoryStyles = {
    color: "#ff8800",
    borderRight: "3px solid #ff8800",
    padding: "0 2%",
    fontSize: "1rem",
    borderRadius: "0",
    transition: "all 0.6s ease-in-out",
    ":hover": {
      fontSize: "1.25rem",
      color: (theme) ? "white" : "black"
    }
  }

  return (
    <Box id='headerLarge' sx={style}>
              {/* header 1 ( logo , search , cart , account ) */}
      <Box sx={{ display: "flex", padding: "1rem", alignItems: "start" }}>

           {/* logo icon */}
        <Box sx={{ display: "flex", color: "#ff8800", cursor: "pointer", padding: "0 1.5%" }} onClick={()=>navigate("/")}>
          <Avatar
            alt="RV"
            src={RVlogo2}
            sx={{ minWidth: 66, minHeight: 66 }}
          />
          <h3 style={{
            transform: "translateX(-0.8rem)",
            background: "black",
            height: "1.7rem",
            width: "1.7rem",
            borderRadius: "1rem"
          }}><i>.in</i></h3>
        </Box>
           
           {/* search box */}
        <Box sx={{
          display: "flex",
          border: "3px solid #ff8800",
          borderRadius: "2rem",
          alignItems: "end",
          width: "100%",
          padding: "0 1rem 0 0.25rem",
          marginBottom: "1rem"
        }}>

          <Select color="warning"
            value={searchBy}
            sx={{
              color: "#black",
              width: "auto",
              border: { borderRadius: "3rem" },
              background: "#ff8800",
              margin: "0 1rem 4px 0rem",
              height: "2rem"
            }}
            variant="outlined"
            onChange={ handleSelect}
          >
            <MenuItem value={"title"}>Title</MenuItem>
            <MenuItem value={"isbn"}>ISBN</MenuItem>
            <MenuItem value={"authors"}>Author</MenuItem>
            <MenuItem value={"categories"}>Category</MenuItem>
          </Select>

         
          <Autocomplete
              freeSolo
              sx={{
               // display: 'inline-block',
               '& input': {
                  color:'#ff8800'
               //   color: (theme) =>
               //     theme.palette.getContrastText(theme.palette.background.paper),
               },
             }}
              fullWidth
              id="search"
              // value={value.keyword}
              options={result}
              getOptionLabel={(option) => option+""}
              // filterOptions={(x)=>x}
              autoComplete
              // includeInputInList
              // filterSelectedOptions
              // defaultValue={states.teamMembers}
              // isOptionEqualToValue={(option,value) => option.userName === value.userName}
              // onFocus={handleFocus}
              onBlur={handleBlur}
              // onKeyDown={(event) => {
              //   if (event.key === 'Enter') {
              //     // Prevent's default 'Enter' behavior.
              //     event.preventDefault();
              //     // your handler code
              //   }
              // }}
              onChange={(e,value)=>handleSearch(e,value)}
              onInputChange={(e,value)=>handleChange(e,value)}
                // should  pass params
              renderInput={(params) => (
                 <TextField variant="standard" 
                            color="warning"
                            style={{}}
                           //  onFocus={()=>setOpen(true)}  for showing loading state while search
                           //  onBlur={()=>setOpen(false)}
                           placeholder="Type Here"
                           label=""
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                 <>
                                   {(isLoading) ? <CircularProgress color="warning" size={24} /> : null}
                                   {params.InputProps.endAdornment}
                                 </>
                              )
                           }}/>
                )} 
                />
        
          <IconButton color="warning" onClick={handleNavigate}>
             <SearchRoundedIcon/>
          </IconButton>
        </Box>

            {/* cart and login button */}
        <Box sx={{ display: "flex", padding: "0 2%" }}>

          <IconButton color="warning" sx={{}} onClick={handleCartDialogOpen}>
            <Badge
              color="warning"
              badgeContent={Object.keys(cartItems).length }>
              <ShoppingCartOutlinedIcon
                sx={{
                  fontSize: "2.8rem",
                  color: "#ff8800",
                }} />
            </Badge>
          </IconButton>

          <IconButton sx={{ color: "#ff8800" }} onClick={()=>handleCheckOutDialogOpen()}>
            <AccountCircleIcon
              sx={{
                fontSize: "2.8rem",
                color: "#ff8800"
              }} />
          </IconButton>
 
         

        </Box>

      </Box>
              {/* Header 2 ( menu bar ) */}
      <Box sx={{ display: "flex", width: "100%" }}>

               {/* for menu buttons */}
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          margin: "0 0 10px 0",
          width: "100%",
        }}>

          <Button sx={categoryStyles} onClick={()=>navigate("/")}>
            <CottageTwoToneIcon sx={{
              color: "#ff8800",
              fontSize: "2.2vmax",
              transition: "all 0.6s ease-in-out",
              ":hover": {
                transform: "scale(1.25)",
                color: (theme) ? "white" : "black"
              }
            }} />
          </Button>
          <Button sx={categoryStyles} onClick={() => navigate("Books")}>
            Books
          </Button>
          <Button sx={categoryStyles} onClick={() => navigate("New Arrivals")}>
            New Arrivals
          </Button>
          <Button sx={categoryStyles} onClick={() => navigate("Best Sellers")}>
            Best Sellers
          </Button>
          <Button sx={categoryStyles} onClick={() => navigate("Award Winners")}>
            Award Winners
          </Button>
          <Button sx={{ ...categoryStyles, border: "none" }} onClick={() => navigate("Staff Picks")}>
            Staff Picks
          </Button>
        </Box>
               
               {/* theme switch button */}
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

// eslint-disable-next-line 
 {/* <TextField
            InputLabelProps={{ style: { color: (theme) ? "black" : '#ff8800', fontSize: "1rem" } }}
            sx={{ input: { color: (theme) ? "black" : '#ff8800' } }}
            variant="standard"
            color='warning'
            label="Search"
            fullWidth
            value={value.keyword}
            onKeyDown={handleSearch}
            onChange={handleChange}
          /> */}