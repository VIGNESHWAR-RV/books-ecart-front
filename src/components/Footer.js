import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export function Footer() {

  const supports = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    margin: "0 1vw 0 0",
    width: "15vw",
  };

  const buttonStyles = {
    color: "#ff8800",
    transition: "all 0.3s ease-in-out",
    fontSize:"1vmax",
    ":hover": { background: "#ff8800", color: "white" }
  };

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Button sx={{
        width: "100%",
        height: "2rem"
      }}
        color="warning"
        onClick={() => scrollTop()}
      >
        Back to top
      </Button>
      <Box sx={{
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
            <a href="#">
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
      <hr />
      <Box sx={{ height: "10rem", background: "#ff8800" }}>
        this place is shoe security
      </Box>
    </Box>
  );
}
