"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { toast } from "sonner";
import { useState } from "react";
import { storeUserInfo } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import FInput from "@/components/Forms/FInput";
import FForm from "@/components/Forms/FForms";
import { validationSchema } from "@/types/validationSchemas/validationSchemas";

const LoginPage = () => {
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);

  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);
      if (res?.data?.token) {
        setMessage({ text: res.message, type: "success" });
        toast.success(res.message);
        storeUserInfo({ accessToken: res.data.token });
      } else {
        setMessage({ text: res.message, type: "error" });
      }
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
      console.error(err.message);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 400,
            width: "100%",
            boxShadow: 3,
            borderRadius: 2,
            p: 4,
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight={600} color="#1976d2">
                Electricity Management
              </Typography>
              <Typography variant="h6">Admin Login</Typography>
            </Box>
          </Stack>

          {message && (
            <Box>
              <Typography
                sx={{
                  backgroundColor: message.type === "error" ? "red" : "green",
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  padding: "10px 0",
                  borderRadius: "5px",
                  color: "white",
                  marginTop: "10px",
                }}
              >
                {message.text}
              </Typography>
            </Box>
          )}

          <Box mt={3}>
            <FForm
              onSubmit={handleLogin}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                username: "",
                password: "",
              }}
            >
              <Grid container spacing={2} my={1}>
                <Grid item xs={12}>
                  <FInput
                    name="username"
                    label="Username"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{ mt: 2, mb: 2 }}
              >
                Login
              </Button>
              <Typography component="p" fontWeight={300} mt={2}>
                Are you a consumer?{" "}
                <Link href="/consumer-login">Login as consumer</Link>
              </Typography>
            </FForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
