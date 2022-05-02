import * as React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
import FreeBreakfastRoundedIcon from '@mui/icons-material/FreeBreakfastRounded';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export function Footer() {

  // const supports = {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "start",
  //   margin: "0 1vw 0 0",
  //   width: "15vw",
  // };

  const buttonStyles = {
    transition: "all 0.3s ease-in-out",
    ":hover": { background: "white", color: "#ff8800" }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Button sx={{
        width: "100%",
        height: "2rem"
      }}
        color="warning"
        onClick={() => scrollTop()}
      >
        Back to top
      </Button> */}
      <Box sx={{ height: "auto", background: "#ff8800",display:"flex" }}>
           <Box>
             <h2 style={{marginBottom:"0%"}}><i>Made with some Coffee and Craziness</i></h2>
             <FreeBreakfastRoundedIcon sx={{fontSize:"2.6rem",m:1}}/>
             <FavoriteBorderTwoToneIcon sx={{fontSize:"2.6rem",m:1}}/>
           </Box>
           <Box sx={{marginLeft:"auto",textAlign:"end"}}>
             <h2 style={{marginBottom:"0%"}}><i>Lets improve the app with Knowledge sharing...</i></h2>
             <Box sx={{mx:2,my:1,display:"flex",alignItems:"center",justifyContent:"end"}}>
                <a style={{color:"white",textDecoration:"none",marginRight:"2%"}} title="LinkedIn/vigneshwar-rv" href="https://www.linkedin.com/in/vigneshwar-rv/" target="_blank" rel="noreferrer">
                  <LinkedInIcon sx={{fontSize:"2.6rem",...buttonStyles,borderRadius:"0.5rem"}} />
                </a>
                 <a style={{color:"white",textDecoration:"none"}} title="GitHub-VIGNESHWAR-RV" href="https://github.com/VIGNESHWAR-RV" target="_blank" rel="noreferrer">
                   <GitHubIcon sx={{fontSize:"2.4rem",...buttonStyles,borderRadius:"2rem"}} />
                 </a>
             </Box>
           </Box>
      </Box>
    </Box>
  );
}

// eslint-disable-next-line
 {/* <Box sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        justifyItems: "stretch",
        marginLeft: "20px"
      }}>
        <Box sx={{ display: "flex", justifyContent: "start" }}>
          <Box sx={supports}>
            <h3>Company</h3>
            <Button sx={buttonStyles}>About us</Button>
            <Button sx={buttonStyles}>Career</Button>
            <Button sx={buttonStyles}>Blog</Button>
            <Button sx={buttonStyles}>Contact Us</Button>
          </Box>
          <Box sx={supports}>
            <h3>Policies</h3>
            <Button sx={buttonStyles}>privacy Policies</Button>
            <Button sx={buttonStyles}>Terms of use</Button>
            <Button sx={buttonStyles}>Secure shopping</Button>
            <Button sx={buttonStyles}>Copyright Policy</Button>
          </Box>
          <Box sx={supports}>
            <h3>Help</h3>
            <Button sx={buttonStyles}>Payment</Button>
            <Button sx={buttonStyles}>Shipping</Button>
            <Button sx={buttonStyles}>Return</Button>
            <Button sx={buttonStyles}>FAQ</Button>
          </Box>
          <Box sx={supports}>
            <h3>Misc</h3>
            <Button sx={buttonStyles}>Affiliate</Button>
            <Button sx={buttonStyles}>Request a book</Button>
            <Button sx={buttonStyles}>Sitemap</Button>
          </Box>
        </Box>
        <Box sx={{ ...supports, width: "auto" }}>
          <h3>Follow Us</h3>
          <Box sx={{ display: "flex", paddingLeft: "1rem" }}>
            {/* <a href="#">
              <GitHubIcon sx={{
                ...buttonStyles,
                padding: "0 0.5rem",
                fontSize: "2.5rem"
              }} />
            </a>

            <a href="#">
              <LinkedInIcon sx={{
                ...buttonStyles,
                padding: "0 0.5rem",
                fontSize: "2.5rem"
              }} />
            </a>

            <a href="#">

            </a>

            <a href="#">

            </a>

            <a href="#">

            </a> 
          </Box>
        </Box>
      </Box>
      <hr />
      <Box sx={{ textAlign: "center" }}>
        <b>Address</b> : This is the place to mention our address |
        <b> Email</b> : <a style={buttonStyles} href="customerservice@RV.com">customerservice@RV.com</a> |
        <b> Phone#</b> : 123 -45678910
      </Box>
      <hr /> */}