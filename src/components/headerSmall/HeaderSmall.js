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
import IconButton from '@mui/material/IconButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete from '@mui/material/Autocomplete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState, useContext,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { context } from '../../App';
import { API } from '../../API';
import toast from 'react-hot-toast';

export function HeaderSmall() {

  const navigate = useNavigate();

  const style = {
    display: "block",
    position: "fixed",
    background: "black",
    width: "100%",
    zIndex: "4"
  }

  const { setShowMenu,handleCartDialogOpen,handleCheckOutDialogOpen } = useContext(context);

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


  return (
    <Box id='headerSmall' sx={style}>

      <Box sx={{ display: "flex", padding: "0", alignItems: "center" }}>

        <Button color="warning" onClick={() => setShowMenu(true)}>
          <MenuRoundedIcon sx={{ fontSize: "2.5rem" }} />
        </Button>

        <Box sx={{ display: "flex", color: "#ff8800", cursor: "pointer" }} onClick={()=>navigate("/")}>
          <Avatar
            alt="RV"
            src={RVlogo2}
            sx={{ minWidth: 60, minHeight: 60 }}
          />
          <h3 style={{ transform: "translateX(-0.8rem)" }}><i>.in</i></h3>
        </Box>


        <Box sx={{ display: "flex", margin: "0 2% 0 auto" }}>

          <Button color="warning" sx={{}} onClick={()=>handleCartDialogOpen()}>
            <Badge
              color="warning"
              badgeContent={0}>
              <ShoppingCartOutlinedIcon
                sx={{
                  fontSize: "2rem",
                  color: "#ff8800"
                }} />
            </Badge>
          </Button>
          <IconButton sx={{ color: "#ff8800" }} onClick={()=>handleCheckOutDialogOpen()}>
            <AccountCircleIcon
              sx={{
                fontSize: "2rem",
                color: "#ff8800"
              }} />
          </IconButton>

        </Box>

      </Box>
      <Box sx={{
        display: "flex",
        border: "3px solid #ff8800",
        borderRadius: "2rem",
        margin: "1% 2%",
        width:"96%",
      }}>

          <Select color="warning"
            value={searchBy}
            sx={{
              color: "#black",
              width: "auto",
              border: { borderRadius: "3rem" },
              background: "#ff8800",
              margin: "0.25rem 0.75rem 0px 0.25rem",
              height: "2rem"
            }}
            variant="outlined"
            onChange={ handleSelect}>

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
              id="search-keyword"
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
    </Box>
  );
}
