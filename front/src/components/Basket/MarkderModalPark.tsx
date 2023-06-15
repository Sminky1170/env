import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../features/configureStore";
import { addThisItem, setIsClicked } from "../../features/BasketParkReducer";
import { usePutParkIntoBasketMutation } from "../../services/parksApi";
import KaKaoParkRoadView from "../Editor/KaKaoParkRoadView";

const MarkModalPark = ({ refetch, basketData }: any) => {
  const dispatch = useDispatch();
  const { isClicked, basketItem }: { isClicked: boolean; basketItem: any } =
    useSelector(({ basketPark }: RootState) => ({
      // @ts-ignore
      isClicked: basketPark.isClicked,
      // @ts-ignore
      basketItem: basketPark.item,
    }));

  const [addMyRestaurant, { data, isSuccess, isError, isLoading }] =
    usePutParkIntoBasketMutation();

  const handleClose = () => {
    dispatch(setIsClicked(false));
  };

  const handlePark = async () => {
    const success = await addMyRestaurant(basketItem._id).unwrap();
    if (success) {
      dispatch(
        addThisItem({
          data: basketItem,
        })
      );
      dispatch(setIsClicked(false));
      refetch();
    }
  };

  return (
    <Dialog
      open={isClicked}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      sx={{ "& .MuiDialogTitle-root": { textAlign: "center" } }}
    >
      <DialogTitle>{basketItem?.name}</DialogTitle>
      <DialogContent>
        <KaKaoParkRoadView spotData={basketItem} />
        <Typography variant="subtitle1">주소: {basketItem?.address}</Typography>
        <Typography variant="subtitle1">전화번호: {basketItem?.tel}</Typography>
        <Typography variant="subtitle1">지역: {basketItem?.region}</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={handlePark} color="primary" variant="contained">
          {basketData &&
          basketData?.park?.some((item: any) => item._id === basketItem._id)
            ? "삭제"
            : "찜하기"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MarkModalPark;
