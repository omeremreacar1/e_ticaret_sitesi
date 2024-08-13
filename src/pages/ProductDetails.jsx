import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addProductToBasket } from "../redux/slices/basketSlice";
import Alert from "@mui/material/Alert";

function ProductDetails() {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(1);
  const [alert, setAlert] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProductById = async () => {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProductData(response.data);

      if (productData.rating !== null) {
        setLoading(false);
      }
    };

    getProductById();
  }, []);

  const addProduct = () => {
    const product = {
      id,
      image: productData.image,
      title: productData.title,
      description: productData.description,
      rate: productData.rating.rate,
      price: productData.price,
      counter,
    };

    dispatch(addProductToBasket(product));
  };

  if (loading) {
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col md:flex-row items-center md:items-stretch md:space-x-10 container mx-auto justify-center mt-10">
      <div>
        <img
          src={productData.image}
          alt="image"
          className="w-[250px] h-[400px]"
        />
      </div>

      <div className="my-10 md:my-0">
        <div className="flex items-center md:items-stretch text-xs sm:text-base flex-col space-y-5 select-none">
          <p className="text-center md:text-left text-xl font-semibold">
            {productData.title}
          </p>
          <p className="w-[300px] md:w-[600px]">{productData.description}</p>
          <Stack spacing={1}>
            <Rating
              name="half-rating-read"
              defaultValue={productData.rating.rate}
              precision={0.5}
              readOnly
            />
          </Stack>
          <p>
            <span className="font-medium">Category:</span>{" "}
            {productData.category}
          </p>
          <p>
            <span className="font-medium">Price:</span>{" "}
            <span className="text-xl">{productData.price}₺</span>
          </p>
          <div className="flex justify-between w-[130px]">
            <IoAddCircleOutline
              className="size-10 cursor-pointer"
              onClick={() => {
                setCounter(counter + 1);
              }}
            />
            <div className="w-[40px] text-3xl flex items-center justify-center pb-3">
              {counter}
            </div>
            <IoIosRemoveCircleOutline
              className="size-10 cursor-pointer"
              onClick={() => {
                if (counter > 1) {
                  setCounter(counter - 1);
                }
              }}
            />
          </div>
          <div>
            <button
              className="py-1 px-2 bg-slate-500 rounded-lg text-white"
              onClick={() => {
                addProduct();
                setAlert(true);
                setTimeout(() => {
                  setAlert(false);
                }, 2000);
              }}
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>

      {alert ? (
        <Alert
          severity="success"
          className="absolute bottom-5 md:bottom-[-400px] w-[300px] md:w-[500px]"
        >
          Ürün Başarıyla Eklendi
        </Alert>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductDetails;
