// src/app/consumers/monthly-bill/page.tsx
"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Button,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { toast } from "sonner";
import {
  useGetMonthlyBillQuery,
  usePayBillMutation,
} from "@/redux/api/userApi";
import PayBillModal from "./components/payBillModal";


const MonthlyBill = () => {
  const { data, isLoading, error } = useGetMonthlyBillQuery("");
  const [payBill] = usePayBillMutation();
  const [open, setOpen] = useState(false);

  const monthlyBill = data?.data;

  const handlePayBill = async (amount: number) => {
    try {
      await payBill({ amount }).unwrap();
      toast.success("Bill paid successfully!");
    } catch (error) {
      toast.error("Failed to pay bill");
    }
  };

  const handleOpen = () => {
    if (monthlyBill.unitsConsumed === 0 && monthlyBill.billAmount === 0) {
      toast.error("You haven't consumed any electricity yet.");
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

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
        Failed to load monthly bill
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Monthly Bill
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: "#e3f2fd",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h5" component="div" gutterBottom>
                Units Consumed
              </Typography>
              <Typography
                variant="h4"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ElectricBoltIcon sx={{ color: "#1565c0", marginRight: 1 }} />
                {monthlyBill.unitsConsumed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: "#e8f5e9",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h5" component="div" gutterBottom>
                Bill Amount
              </Typography>
              <Typography
                variant="h4"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <PaidIcon sx={{ color: "#2e7d32", marginRight: 1 }} /> BDT{" "}
                {monthlyBill.billAmount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: monthlyBill.isBillPaid ? "#e8f5e9" : "#ffebee",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h5" component="div" gutterBottom>
                Status
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {monthlyBill.isBillPaid ? (
                  <>
                    <PaidIcon sx={{ color: "#2e7d32", marginRight: 1 }} />
                    <Typography variant="h4">Paid</Typography>
                  </>
                ) : (
                  <>
                    <ReportProblemIcon
                      sx={{ color: "#d32f2f", marginRight: 1 }}
                    />
                    <Typography variant="h4">Not Paid</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ ml: 2 }}
                      onClick={handleOpen}
                    >
                      Pay Bill
                    </Button>
                  </>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <PayBillModal
        open={open}
        handleClose={handleClose}
        billAmount={monthlyBill.billAmount}
        onPay={handlePayBill}
      />
    </Box>
  );
};

export default MonthlyBill;
