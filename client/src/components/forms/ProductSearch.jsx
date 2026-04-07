import { TextField } from "@mui/material";

function ProductSearch({ setSearchInput, searchInput }) {
  return (
    <TextField
      type="text"
      placeholder="Search Product &#x1F50E;&#xFE0E;"
      onChange={(e) => setSearchInput(e.target.value)}
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

        my: 3,
      }}
    />
  );
}

export default ProductSearch;
