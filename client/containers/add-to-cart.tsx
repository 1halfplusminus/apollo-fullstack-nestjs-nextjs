import { useReactiveVar } from "@apollo/client";
import React from "react";
import { cartsVar } from "../apollo/cache";
import { Button } from "../components/button";

interface AddToCartProps {
  id: string;
}

export const AddToCart = ({ id }: AddToCartProps) => {
  const carts = useReactiveVar(cartsVar);
  return (
    <Button
      onClick={() => cartsVar([...new Set([...carts, id])])}
      title="Add to cart"
    />
  );
};
