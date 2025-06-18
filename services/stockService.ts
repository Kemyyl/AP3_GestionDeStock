import { $Enums, PrismaClient, } from "@prisma/client";
import JSONbig from 'json-bigint';

const prisma = new PrismaClient();

enum type {
  medicament,
  materiel
}


export interface SerializedStocks {
  id_stock: number;
  nom: string;
  description: string;
  quantite_disponible: number;
  stock_alerte: number;
  type: type;
}

export async function GetAllStocks(): Promise<SerializedStocks[]> {
  try {
    const stocks = await prisma.stocks.findMany();
    const serializedStocks: SerializedStocks[] = JSON.parse(JSONbig.stringify(stocks));
    console.error("stocks", serializedStocks);
    return serializedStocks;
  } catch (error) {
    throw new Error("Aucun stocks récupérés");
  }
}

export async function CreateStocks(data: {
  nom: string;
  description: string;
  type: $Enums.stock_type;
}): Promise<SerializedStocks | null> {
  try {
    const stock = await prisma.stocks.create({
      data: {
        nom: data.nom,
        description: data.description,
        quantite_disponible: parseInt("0", 10),
        stock_alerte: 5,
        type: data.type,
      },
    });
    const serializedStocks: SerializedStocks = JSON.parse(
      JSONbig.stringify(stock)
    );
    return serializedStocks;
  } catch (error) {
    console.error("Erreur lors de la création de la commande:", error);
    throw new Error("Echec de la création de la commande");
  }
}