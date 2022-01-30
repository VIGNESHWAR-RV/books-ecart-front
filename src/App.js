
import './App.css';
import * as React from 'react';
import { useState,createContext } from 'react';
import Paper from '@mui/material/Paper';
import {Switch , Route} from "react-router-dom";
import Box from '@mui/material/Box';
import { HeaderLarge } from './components/headerLarge/HeaderLarge';
import { HeaderSmall } from './components/headerSmall/HeaderSmall';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Home } from './components/home/Home';
import { Footer } from './components/Footer';
import { MenuBar } from './components/MenuBar';
import { Categories } from './components/Categories/Categories';


const context = createContext("");

function App() {

  const [theme,setTheme] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: (theme)?'dark' : "light",
    },
  });
 

  const [showMenu,setShowMenu] = useState(false);

  const color = (theme)?"black":"whiteSmoke";

  return (
  <ThemeProvider theme={darkTheme}>
    <context.Provider value={{theme,setTheme,setShowMenu,color}}>
      <Paper sx={{ borderRadius: "0", width: "100%",minHeight:"min-content",background:(theme)?"black":"whiteSmoke" }}>
    <div className="App">

      {(showMenu)
        ?<MenuBar/>
        :""}
     <HeaderLarge/>
      <HeaderSmall/>
         <Box id="content">
                 <Switch>
                    <Route exact path="/">
                       <Home/>
                    </Route>
                    <Route exact path="/:id">
                       <Categories/>
                    </Route>
                    <Route path="*">
                       <h1>404 Not Found</h1>
                    </Route>
                 </Switch>
         </Box>   
         {/*add footer  */}
         <hr style={{width:"95%"}}/>
         <Footer/>
    </div>
       </Paper>
     </context.Provider>
    </ThemeProvider>
  );
}

export default App;
export {context};