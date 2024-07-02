import React from "react";
import { Container, Box, Typography, Grid, Avatar, Card, CardContent } from "@mui/material";
import Image from "next/image";

const AboutUs = () => {
  return (
    <Container sx={{ my: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h6" component="p" color="textSecondary">
          Powering Your World Efficiently
        </Typography>
      </Box>
      <Grid container spacing={4} mb={6}>
        <Grid item xs={12} md={4}>
          <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Image alt="Our Mission" src="/assets/Images/electricity_mission.jpg" width={500} height={300} />
            <CardContent>
              <Typography gutterBottom variant="h5">
                Our Mission
              </Typography>
              <Typography variant="body2" color="textSecondary">
                To provide a seamless experience in managing your electricity consumption and payments, making energy management easy and accessible for everyone.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Image alt="Our Vision" src="/assets/Images/electricity_vision.jpg" width={500} height={300} />
            <CardContent>
              <Typography gutterBottom variant="h5">
                Our Vision
              </Typography>
              <Typography variant="body2" color="textSecondary">
                We envision a future where energy management is automated and optimized, leveraging cutting-edge technology for efficient power usage.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Image alt="Our Values" src="/assets/Images/electricity_values.jpg" width={500} height={300} />
            <CardContent>
              <Typography gutterBottom variant="h5">
                Our Values
              </Typography>
              <Typography variant="body2" color="textSecondary">
                We value sustainability, transparency, and innovation, fostering a community that is conscious about energy usage and empowered to make informed decisions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
