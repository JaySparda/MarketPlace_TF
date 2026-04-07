import { Box, Grid, Typography } from "@mui/material";
import ProductItem from "../components/ProductItem";
import ProductSearch from "../components/forms/ProductSearch";

function Home({
  token,
  fetchData,
  products,
  setSearchInput,
  searchInput,
  userId,
}) {
  return (
    <>
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#1a1a1a",
        }}
      >
        <ProductSearch
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
        <Grid container spacing={2} justifyContent="center">
          {products.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              fetchData={fetchData}
              userId={userId}
            />
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Home;
