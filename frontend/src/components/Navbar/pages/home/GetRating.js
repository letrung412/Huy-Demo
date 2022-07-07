import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export default function GetRating(props) {
  return (
    <Stack style={{ marginLeft: 0 }}>
      <Rating
        name="half-rating-read"
        value={parseInt(props.value)}
        precision={1}
        readOnly
      />
    </Stack>
  );
}
