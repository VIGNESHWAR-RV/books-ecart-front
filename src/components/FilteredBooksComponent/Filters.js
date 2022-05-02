
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import orange from '@mui/material/colors/orange';
// import FormControlLabel from '@mui/material/FormControlLabel';
import Button from "@mui/material/Button";
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


export 
function FiltersForFilteredBooks({filter,filterCategory}) {


    const [isFilterSelected,setIsFilterSelected] = useState(false);

    const [priceFilter,setPriceFilter] = useState("");
    const [yearFilter,setYearFilter] = useState("");
    const [languageFilter,setLanguageFilter] = useState("");


    useEffect(()=>{
          setIsFilterSelected(false);
          setPriceFilter("");
          setYearFilter("");
          setLanguageFilter("");

    },[filterCategory]);

    const priceList = [{label:"50 & Below",value:50},
                       {label:"100 & Below",value:100},
                       {label:"150 & Below",value:150},
                       {label:"300 & Below",value:300}
                       ]

    const yearList = [1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013];

    const languageList = ["Tamil","English","French","Hindi"];

    const handlePriceFilterChange = (e)=>{
        setPriceFilter(e.target.value);
        if(isFilterSelected === false){
             setIsFilterSelected(true);
        }
    }

    const handleYearFilterChange=(e)=>{
        setYearFilter(e.target.value);
        if(isFilterSelected === false){
            setIsFilterSelected(true);
       }
    }

    const handleLanguageFilterChange=(e)=>{
        setLanguageFilter(e.target.value);
        if(isFilterSelected === false){
            setIsFilterSelected(true);
       }
    }

    const applyFilters = ()=>{
        let query = "";
        if(priceFilter !== ""){
            query += `price=${priceFilter}&`;
        }
        if(yearFilter !== ""){
            query += `publishedYear=${yearFilter}&`;
        }
        if(languageFilter !== ""){
            query += `language=${languageFilter}&`;
        }
        // if(query[query.length - 1] === "&"){
            
        //     query.pop();
        // }
        // console.log(query);
        filter(query); 
    }

    const clearFilters = ()=>{
        setIsFilterSelected(false);
        setPriceFilter("");
        setYearFilter("");
        setLanguageFilter("");
        filter("");
        return;
    }

  return (
    <Box sx={{my:3,display:"grid"}}>

        {/* price filter */}
    <FormControl sx={{mx:"auto",my:2}} color="warning">
      <InputLabel sx={{color:"#ff8800"}} id="priceSelect">Book Price</InputLabel>
      <Select 
            value={priceFilter}
            labelId="priceSelect"
            label="Price"
            color="warning"
            sx={{
              width:"15rem",
              color:"#ff8800"
            }}
            variant="standard"
            onChange={ handlePriceFilterChange }
          >
            {priceList.map(({label,value})=><MenuItem key={value} value={value}>{label}</MenuItem>)}
      </Select>
    </FormControl>

       <hr style={{width:"95%",border:"1px solid #ff8800",backgroundColor:"#ff8800"}}/>
         {/* year filter */}
    <FormControl sx={{mx:"auto",my:2}} color="warning">
      <InputLabel sx={{color:"#ff8800"}} id="yearSelect">Published Year</InputLabel>
      <Select 
            value={yearFilter}
            labelId="yearSelect"
            label="Published Year"
            color="warning"
            sx={{
              width:"15rem",
              color:"#ff8800"
            }}
            variant="standard"
            onChange={ handleYearFilterChange }
          >
            {yearList.map((year)=><MenuItem key={year} value={year}>{year}</MenuItem>)}
      </Select>
    </FormControl>

       <hr style={{width:"95%",border:"1px solid #ff8800",backgroundColor:"#ff8800"}}/>
         {/* language filter */}
    <FormControl sx={{mx:"auto",my:2}} color="warning">
      <InputLabel sx={{color:"#ff8800"}} id="languageSelect">Language</InputLabel>
      <Select 
            value={languageFilter}
            labelId="languageSelect"
            label="Language"
            color="warning"
            sx={{
              width:"15rem",
              color:"#ff8800"
            }}
            variant="standard"
            onChange={ handleLanguageFilterChange }>

            {languageList.map((language)=><MenuItem key={language} value={language}>{language}</MenuItem>)}
      </Select>
    </FormControl>
  
       <hr style={{width:"95%",border:"1px solid #ff8800",backgroundColor:"#ff8800"}}/>

    
    {(isFilterSelected)
      ?<Button color="warning" variant="contained" sx={{mx:2,my:2}} onClick={applyFilters}>
           Apply Filters
       </Button>
      :""}

    {(isFilterSelected)
      ?<Button color="error" variant='contained' sx={{mx:4,my:2}} onClick={clearFilters}>
            Clear Filters
       </Button>
      :""}


    </Box>
  )
}

// eslint-disable-next-line 
{/* <FormControl color="warning" sx={{mx:"auto"}}>
      <FormLabel sx={{color:"#ff8800"}} id="demo-controlled-radio-buttons-group">Price</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={priceFilter}
        onChange={handlePriceFilterChange}
      >
        <FormControlLabel  value="50" control={<Radio sx={{ '&.Mui-checked': {color: orange[500]} }}/>} label={`50 & Below`} />
        <FormControlLabel value="100" control={<Radio sx={{ '&.Mui-checked': {color: orange[500]} }}/>} label={`100 & Below`} />
        <FormControlLabel value="150" control={<Radio sx={{ '&.Mui-checked': {color: orange[500]} }}/>} label={`150 & Below`} />
        <FormControlLabel value="300" control={<Radio sx={{ '&.Mui-checked': {color: orange[500]} }}/>} label={`300 & Below`} />
      </RadioGroup>
    </FormControl> */}

    // eslint-disable-next-line 
  {/* <FormControl color="warning" sx={{mx:"auto"}}>
      <FormLabel sx={{color:"#ff8800"}} id="demo-controlled-radio-buttons-group">Language</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={languageFilter}
        onChange={handleLanguageFilterChange}
      >
        <FormControlLabel  value="Tamil" control={<Radio sx={{ '&.Mui-checked': {color: orange[500]} }}/>} label="Tamil" />
        <FormControlLabel value="English" control={<Radio sx={{ '&.Mui-checked': {color: orange[500]} }}/>} label="English" />
        <FormControlLabel value="French" control={<Radio sx={{ '&.Mui-checked': {color: orange[500]} }}/>} label="French" />
        <FormControlLabel value="Hindi" control={<Radio sx={{ '&.Mui-checked': {color: orange[500]} }}/>} label="Hindi" />
      </RadioGroup>
    </FormControl> */}