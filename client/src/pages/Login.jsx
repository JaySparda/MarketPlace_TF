import { useState } from "react";
import Swal from "sweetalert2";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { loginUser } from "../api/user";
import { useNavigate } from "react-router-dom";

function Login({ setToken, setUserId, setAdmin }) {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await loginUser(formData);
    if (res.success) {
      Swal.fire({ title: "Login Successfully", icon: "success" });
      setToken(res.data.token);
      setUserId(res.data.user._id);
      setAdmin(res.data.user.isAdmin);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("admin", res.data.user.isAdmin);
      navigate("/");
    } else {
      Swal.fire({ title: "Opps...", icon: "error", text: res.message });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper
        elevation={3}
        sx={{ p: 4, width: 400, backgroundColor: "#292929" }}
      >
        <Stack sx={{ backgroundColor: "#2478ae" }}>
          <Typography
            variant="h4"
            textAlign="center"
            mb={2}
            sx={{ color: "white" }}
          >
            Login
          </Typography>
        </Stack>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="username"
            label="Username"
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#555",
                },
                "&:hover fieldset": {
                  borderColor: "#777",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2778a7",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#aaa",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              backgroundColor: "#1e1e1e",
              borderRadius: "4px",
            }}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="password"
            label="Password"
            type="password"
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#555",
                },
                "&:hover fieldset": {
                  borderColor: "#777",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2778a7",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#aaa",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              backgroundColor: "#1e1e1e",
              borderRadius: "4px",
            }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#2d3e50" }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
