"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useCreateConsumerMutation } from "@/redux/api/userApi"; // Import the mutation hook

const CreateConsumer = () => {
  const [createConsumer, { isLoading }] = useCreateConsumerMutation();
  const { handleSubmit, control, reset } = useForm();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    try {
      await createConsumer(data).unwrap();
      toast.success("Consumer created successfully!");
      reset(); // Reset the form after successful creation
      setError(null); // Clear any previous errors
    } catch (err: any) {
      setError(err?.message || "Failed to create consumer. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Consumer
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
          )}
        />
        <Controller
          name="contactNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Contact Number"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Consumer"}
        </Button>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </form>
    </Box>
  );
};

export default CreateConsumer;
