import React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

function Product({ product }) {
  const { id, title, price, image, rating } = product;

  const navigate = useNavigate();

  return (
    <div className="bg-white w-[200px] h-[450px] p-4 rounded-lg shadow-xl">
      <div>
        <img src={image} alt="image" className="w-[200px] h-[200px]" />
      </div>

      <div className="text-center h-[180px] flex flex-col justify-center items-center">
        <p className="text-sm">{title}</p>
        <p className="font-semibold	">{price}₺</p>
        <Stack spacing={1}>
          <Rating
            name="half-rating-read"
            defaultValue={rating.rate}
            precision={0.5}
            readOnly
          />
        </Stack>
      </div>

      <div className="flex justify-center">
        <button
          className="px-2 py-1 bg-slate-600 rounded-lg text-white hover:bg-slate-500 duration-500"
          onClick={() => {
            navigate(`/product-details/${id}`);
          }}
        >
          Detayını Gör
        </button>
      </div>
    </div>
  );
}

export default Product;
