import React, { forwardRef, useImperativeHandle, } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell,} from "@/components/ui/table";
import { commandes, stocks, utilisateurs } from "@prisma/client";
import { SerializedMouvement } from "@/services/mouvementService";

export type MouvementWithRelations = SerializedMouvement & {
  commandes: commandes;
  utilisateurs: utilisateurs;
  stocks: stocks;
};

export type MouvementListRef = {
  refresh: () => void;
};

const MouvementList = forwardRef<MouvementListRef>((_, ref) => {
  
  const {
    data: mouvements,
    isLoading,
    error,
    refetch,
  } = useQuery<MouvementWithRelations[], Error>({
    queryKey: ["mouvement"],
    queryFn: () => fetch("/api/mouvements").then((res) => res.json()),
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
          <TableHead>Stock liée</TableHead>
          <TableHead>Type de mouvement</TableHead>
          <TableHead>Quantité du mouvement</TableHead>
          <TableHead>Date du mouvement</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mouvements &&
          mouvements?.length > 0 &&
          mouvements.map((mouvement) => (
            <TableRow key={mouvement.id_mouvement}>
              <TableCell>{mouvement.stocks.nom}</TableCell>
              <TableCell>{mouvement.type_mouvement} </TableCell>
              <TableHead>{mouvement.quantite}</TableHead>
              <TableCell>{new Date(mouvement.date_mouvement).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        {(!mouvements || mouvements?.length === 0) && (
          <TableRow>
            <TableCell>Erreur</TableCell>
            <TableCell>Absence de mouvement</TableCell>
            <TableCell>0</TableCell>
            <TableCell>N/A</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
});

MouvementList.displayName = "MouvementList";

export default MouvementList;
