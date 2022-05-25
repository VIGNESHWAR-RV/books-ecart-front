import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { API } from './API';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
      {/* <Test/> */}
    </Router>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// function Test(){

//   async function test(){
      
//     console.log("Test 1");  // 1st 

//     setTimeout(() => {
//        console.log("test 2");   //4th
//     }, 100);

//     const response = await fetch(API,{method:"GET"});

//     console.log("2.1");  // 2nd

//     if(response){
//        console.log("Test 3");  // 3rd
//     }

//     const data = await response.json();

//     if(data){
//        console.log("Test 4");   //5th
//     }

//     console.log("Test 5");   //6th

//   };
//   test();


//   return(
//     <></>
//   )
// }


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
