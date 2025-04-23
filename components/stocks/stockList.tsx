import React, { forwardRef, useImperativeHandle } from "react";
import { useQuery } from "@tanstack/react-query";
import { stocks } from "@prisma/client";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell,} from "@/components/ui/table";

export type StocksWithRelations = stocks & {
  stocks: stocks
};

export type StockListRef = {
  refresh: () => void;
};

const stockList = forwardRef<StockListRef>((_, ref) => {

  // Récupération du stock
  const { data: stocks, isLoading, error, refetch } = useQuery<StocksWithRelations[], Error>({
    queryKey: ["stocks"],
    queryFn: () => fetch("/api/stocks").then((res) => res.json()),
  });

  // Expose la méthode `refresh` au composant parent
  useImperativeHandle(ref, () => ({
    refresh: refetch,
  }));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Quantité</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stocks?.map((stocks) => (
          <TableRow key={stocks.id_stock}>
            <TableCell>{stocks.nom}</TableCell>
            <TableCell>{stocks.description}</TableCell>
            <TableCell>{stocks.quantite_disponible}</TableCell>
            <TableCell>{stocks.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

stockList.displayName = "stockList";

export default stockList;
