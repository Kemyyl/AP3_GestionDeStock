import { PrismaClient,} from "@prisma/client";
import JSONbig from 'json-bigint';

const prisma = new PrismaClient();

enum type_mouvement {
  entree,
  sortie,
}

export interface SerializedMouvement {
  id_stock: number;
  id_mouvement: number;
  quantite: number;
  date_mouvement: string;
  type_mouvement: type_mouvement;
}

export async function GetAllMouvements(): Promise<SerializedMouvement[]> {
  try {
    const mouvements = await prisma.mouvements.findMany({
        include: {
            stocks: true,
        },
    });
    const serializedMouvement: SerializedMouvement[] = JSON.parse(JSONbig.stringify(mouvements));
    console.error("mouvements", serializedMouvement);
    return serializedMouvement;
  } catch (error) {
    throw new Error("Aucun mouvements récupérés");
  }
}
