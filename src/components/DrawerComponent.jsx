import React from "react";
import Drawer from "@mui/material/Drawer";
import { useSelector, useDispatch } from "react-redux";
import { ImCross } from "react-icons/im";
import {
  calculateTotalAmount,
  deleteSelectedProduct,
  setDrawer,
} from "../redux/slices/basketSlice";

function DrawerComponent() {
  const { products, drawer, totalAmount } = useSelector(
    (store) => store.basket
  );
  const dispatch = useDispatch();

  return (
    <Drawer open={drawer} anchor="right" onBlur={() => dispatch(setDrawer())}>
      {products &&
        products.map((product) => (
          <div className="flex p-5 select-none" key={product.id}>
            <div>
              <img src={product.image} alt="image" className="w-[80px] mr-3" />
            </div>
            <div>
              <p className="w-[100px] md:w-[300px] text-xs md:text-base">
                {product.title}
              </p>
              <p>Adet: {product.counter}</p>
              <p>Fiyat: {product.price * product.counter}₺</p>
            </div>
            <div className="">
              <ImCross
                className="text-red-500 size-7 cursor-pointer"
                onClick={() => {
                  dispatch(deleteSelectedProduct(product));
                  dispatch(calculateTotalAmount());
                }}
              />
            </div>
          </div>
        ))}
      <div className="p-5">Toplam Tutar: {totalAmount}₺</div>
    </Drawer>
  );
}

export default DrawerComponent;
