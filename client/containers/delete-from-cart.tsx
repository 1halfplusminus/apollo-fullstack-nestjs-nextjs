import { useReactiveVar } from "@apollo/client";
import { remove } from "lodash";
import React from "react";
import { cartsVar } from "../apollo/cache";
import { Button } from "../components/button";

interface DeleteFromProps {
  id: string;
}

export const DeleteFromCart = ({ id }: DeleteFromProps) => {
  const carts = useReactiveVar(cartsVar);
  return (
    <Button
      onClick={() => cartsVar(carts.filter((e) => e != id))}
      title="Delete from cart"
    />
  );
};
