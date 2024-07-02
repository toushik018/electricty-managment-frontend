"use client";

import React from "react";
import {
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Container,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useGetStatsQuery } from "@/redux/api/userApi";

const AdminPage = () => {
  const { data, isLoading, error } = useGetStatsQuery("");
  const statsData = data?.data;

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

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Failed to load statistics
      </Typography>
    );
  }

  const cardData = [
    {
      title: "Total Consumers",
      value: statsData.totalConsumers,
      icon: <PeopleIcon />,
      background: "#f5f5f5",
      iconBackground: "#2196f3",
    },
    {
      title: "Total Admins",
      value: statsData.totalAdmins,
      icon: <AdminPanelSettingsIcon />,
      background: "#f5f5f5",
      iconBackground: "#4caf50",
    },
    {
      title: "Total Unpaid Bills",
      value: statsData.totalUnpaidBills,
      icon: <ReportProblemIcon />,
      background: "#f5f5f5",
      iconBackground: "#f44336",
    },
  ];

  return (
    <Container sx={{ padding: 3, marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 2,
                background: card.background,
                borderRadius: "15px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: card.iconBackground,
                  marginRight: 2,
                  width: 56,
                  height: 56,
                }}
              >
                {card.icon}
              </Avatar>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{card.title}</Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminPage;
