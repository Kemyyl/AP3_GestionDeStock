import { PrismaClient,} from "@prisma/client";
import JSONbig from "json-bigint";
  
const prisma = new PrismaClient();
  

export interface SerializedUtilisateurs {
    id_utilisateur: number;
    nom: string;
    prenom: string;
    email: string;
    mot_de_passe: string;
    id_role: number;
}

export async function GetAllUtilisateurs(): Promise<SerializedUtilisateurs[]> {
    try {
        const utilisateurs = await prisma.utilisateurs.findMany({
            include: {
                roles: true,
            },
        });
        const SerializedUtilisateurs: SerializedUtilisateurs[] = JSON.parse(
            JSONbig.stringify(utilisateurs)
        );
        return SerializedUtilisateurs;
    } catch (error) {
        console.error(error);
        throw new Error("Aucun utilisateurs récupérés");
    }
}

export async function CreateUtilisateurs(data: {
    prenom: any;
    password: any;
    nom: string;
    email: string;
  }): Promise<SerializedUtilisateurs> {
    try {
      const utilisateurs = await prisma.utilisateurs.create({
        data: {
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          mot_de_passe: data.password,
          id_role: 2,
        },
      });
      const serializedUtilisateurs: SerializedUtilisateurs = JSON.parse(
        JSONbig.stringify(utilisateurs)
      );
      return serializedUtilisateurs;
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      throw new Error("Echec de la création de l'utilisateur");
    }
  }