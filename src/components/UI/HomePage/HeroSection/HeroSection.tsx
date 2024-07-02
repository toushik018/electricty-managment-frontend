"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        backgroundImage: "url('/assets/Images/slider3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "bold",
            mb: 2,
            backgroundClip: "text",
            textFillColor: "transparent",
            backgroundImage: "linear-gradient(to bottom, #ffffff, #cccccc)",
          }}
        >
          Manage Your Electricity Bills Effortlessly!
        </Typography>
        <Typography
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: "rgba(76, 175, 80, 0.7)",
            color: "white",
          }}
        >
          Track Consumption, Pay Bills, and More
        </Typography>
      </motion.div>
    </Box>
  );
};

export default HeroSection;
