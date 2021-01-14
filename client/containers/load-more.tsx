import React from "react";
import { Button } from "../components/button";

interface LoadMoreProps {
  onClick: () => void;
}
export const LoadMore = ({ onClick }: LoadMoreProps) => {
  return <Button title="Load More" onClick={onClick} />;
};
