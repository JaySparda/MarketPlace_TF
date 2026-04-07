import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { createUser } from "../api/user";
import Swal from "sweetalert2";

function Register() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      Swal.fire({
        title: "Oops...",
        text: "Passwords do not match!",
        icon: "warning",
      });
      return;
    }
    let res = await createUser(formData);
    if (res.success) {
      Swal.fire({ title: "Goob job", icon: "success", text: res.data.msg });
    } else {
      Swal.fire({ title: "Opps...", icon: "Error", text: res.message });
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
        sx={{ p: 4, width: 350, backgroundColor: "#292929" }}
      >
        <Stack sx={{ backgroundColor: "#2478ae" }}>
          <Typography
            variant="h4"
            textAlign="center"
            mb={2}
            sx={{ color: "white" }}
          >
            Register
          </Typography>
        </Stack>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
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
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
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
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
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
            name="password2"
            label="Confirm Password"
            type="password"
            value={formData.password2}
            onChange={handleChange}
            margin="normal"
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
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Register;
