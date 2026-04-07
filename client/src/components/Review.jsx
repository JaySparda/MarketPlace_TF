import {
  Typography,
  Box,
  Rating,
  Stack,
  IconButton,
  CircularProgress,
  Fade,
} from "@mui/material";
import { fetchProductReview } from "../api/review";
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddReview from "./forms/AddReview";
import { deleteReview } from "../api/review";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

function Reviews({ product }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const fetchReview = async () => {
    try {
      const data = await fetchProductReview(product._id);
      setReviews(data.reviews || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { success, data } = await deleteReview(id);
        console.log("API Response:", success, data);

        if (success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your review has been deleted.",
            icon: "success",
          });
          fetchReview();
        }
      }
    });
  };

  if (loading)
    return (
      <Fade in={loading} timeout={500}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            gap: "1rem",
          }}
        >
          <CircularProgress size={60} thickness={4} sx={{ color: "#2d3e50" }} />
          <Typography variant="h2" sx={{ color: "white" }}>
            Loading Reviews...
          </Typography>
        </div>
      </Fade>
    );
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom color="white">
        Reviews:
      </Typography>
      <AddReview
        productId={product._id}
        userId={userId}
        fetchReview={fetchReview}
      />
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Box key={review._id} mb={3}>
            {" "}
            {/* Use review._id as key */}
            <Box display="flex" alignItems="center" mb={1}>
              <Rating
                value={review.rating}
                readOnly
                emptyIcon={<StarBorderIcon sx={{ color: "#ffb400" }} />}
                icon={<StarIcon sx={{ color: "#ffb400" }} />}
              />
            </Box>
            <Stack display="flex" justifyContent="space-between">
              <Typography variant="body1" color="white">
                {review.message}
              </Typography>
              <Typography variant="body1" color="white">
                Date: {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
            </Stack>
            {review.user === userId ? (
              <IconButton
                sx={{ color: "red" }}
                onClick={() => handleDelete(review._id)}
              >
                <DeleteIcon />
              </IconButton>
            ) : null}
          </Box>
        ))
      ) : (
        <Typography variant="h4" color="white">
          No review yet
        </Typography>
      )}
    </Box>
  );
}

export default Reviews;
