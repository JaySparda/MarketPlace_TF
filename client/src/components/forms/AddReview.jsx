import {
  TextField,
  Box,
  IconButton,
  Rating,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useState, useEffect } from "react";
import { addReview } from "../../api/review";
import Swal from "sweetalert2";

function AddReview({ productId, userId, fetchReview }) {
  const [review, setReview] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("admin") === "true";
    setIsAdmin(adminStatus);
  }, []);

  const handleChange = (e) =>
    setReview({ ...review, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await addReview(userId, productId, review);
    if (res.success) {
      Swal.fire({
        title: "Review added",
        icon: "success",
        text: res.data.msg,
      });
    } else {
      Swal.fire({ title: "Opps", icon: "error", text: res.message });
    }
    fetchReview();
  };

  return isAdmin || !userId ? null : (
    <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: "#2a2a2a" }}>
      <Typography variant="h6" gutterBottom color="white">
        Write a Review
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Rating
            name="rating"
            onChange={handleChange}
            precision={1}
            defaultValue={1}
            size="large"
            icon={<StarIcon fontSize="inherit" sx={{ color: "#ffb400" }} />}
            emptyIcon={
              <StarBorderIcon fontSize="inherit" sx={{ color: "#ffb400" }} />
            }
          />

          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Share your thoughts..."
              name="message"
              onChange={handleChange}
              required
              multiline
              rows={3}
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
            />

            <IconButton
              type="submit"
              sx={{
                alignSelf: "flex-end",
                backgroundColor: "#2778a7",
                borderRadius: "4px",
                color: "white",
                padding: "12px",
                "&:hover": {
                  backgroundColor: "#1a5a80",
                },
              }}
            >
              <SendIcon fontSize="medium" />
            </IconButton>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
}

export default AddReview;
