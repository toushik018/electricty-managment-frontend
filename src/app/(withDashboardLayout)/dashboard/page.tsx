"use client";

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Container,
  CircularProgress,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { useGetMyProfileQuery } from "@/redux/api/userApi";

const DashboardHome = () => {
  const { data, isLoading } = useGetMyProfileQuery("");
  const user = data?.data;
  const role = user?.role;

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
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
            {user?.role === "admin" ? "Admin" : "Consumer"} Dashboard
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: "white",
                textAlign: "center",
              }}
            >
              <CardContent>
                <Avatar
                  sx={{
                    bgcolor: "#1565c0",
                    color: "white",
                    width: 60,
                    height: 60,
                    margin: "0 auto 16px",
                  }}
                >
                  <DashboardIcon fontSize="large" />
                </Avatar>
                <Typography variant="h5" component="div" gutterBottom>
                  Dashboard
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                  View your dashboard and get insights.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  href="/dashboard"
                >
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: "white",
                textAlign: "center",
              }}
            >
              <CardContent>
                <Avatar
                  sx={{
                    bgcolor: "#388e3c",
                    color: "white",
                    width: 60,
                    height: 60,
                    margin: "0 auto 16px",
                  }}
                >
                  <AccountCircleIcon fontSize="large" />
                </Avatar>
                <Typography variant="h5" component="div" gutterBottom>
                  Profile
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                  Manage your profile and account settings.
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 3 }}
                  href={`/dashboard/${role}/profile`}
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: "white",
                textAlign: "center",
              }}
            >
              <CardContent>
                <Avatar
                  sx={{
                    bgcolor: "#d32f2f",
                    color: "white",
                    width: 60,
                    height: 60,
                    margin: "0 auto 16px",
                  }}
                >
                  <SettingsIcon fontSize="large" />
                </Avatar>
                <Typography variant="h5" component="div" gutterBottom>
                  Settings
                </Typography>
                <Typography variant="body2" component="p" color="textSecondary">
                  Customize your experience.
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 3 }}
                  href="/settings"
                >
                  Go to Settings
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DashboardHome;
