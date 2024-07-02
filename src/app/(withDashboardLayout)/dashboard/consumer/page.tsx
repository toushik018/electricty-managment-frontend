"use client";

import React from "react";
import { Box, Typography, Grid, Card, Button, Container } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import BillIcon from "@mui/icons-material/ReceiptLong";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { useGetMyProfileQuery } from "@/redux/api/userApi";

const UserDashboard = () => {
  const { data, isLoading } = useGetMyProfileQuery("");
  const user = data?.data;
  const role = user?.role;

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          padding: 4,
          minHeight: "100vh",
        }}
      >
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Your Dashboard
          </Typography>
          <Typography variant="h6" component="p" color="textSecondary">
            Consumer Dashboard
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                padding: 3,
                textAlign: "center",
                boxShadow: 1,
                borderRadius: 2,
              }}
            >
              <ElectricBoltIcon sx={{ fontSize: 50, color: "#ff9800" }} />
              <Typography variant="h5" component="div" gutterBottom>
                My Consumption
              </Typography>
              <Button
                variant="contained"
                color="warning"
                sx={{ mt: 2 }}
                href="/consumer/consumption"
              >
                View Consumption
              </Button>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                padding: 3,
                textAlign: "center",
                boxShadow: 1,
                borderRadius: 2,
              }}
            >
              <BillIcon sx={{ fontSize: 50, color: "#3f51b5" }} />
              <Typography variant="h5" component="div" gutterBottom>
                Monthly Bill
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                href="/dashboard/consumer/view-bills"
              >
                View Monthly Bill
              </Button>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                padding: 3,
                textAlign: "center",
                boxShadow: 1,
                borderRadius: 2,
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 50, color: "#388e3c" }} />
              <Typography variant="h5" component="div" gutterBottom>
                Profile
              </Typography>
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                href="/dashboard/consumer/profile"
              >
                View Profile
              </Button>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                padding: 3,
                textAlign: "center",
                boxShadow: 1,
                borderRadius: 2,
              }}
            >
              <SettingsIcon sx={{ fontSize: 50, color: "#d32f2f" }} />
              <Typography variant="h5" component="div" gutterBottom>
                Settings
              </Typography>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                href="/consumer/settings"
              >
                Go to Settings
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UserDashboard;
