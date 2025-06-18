-- CreateEnum
CREATE TYPE "statut_commande" AS ENUM ('en_attente', 'validee', 'invalidee');

-- CreateEnum
CREATE TYPE "stock_type" AS ENUM ('medicament', 'materiel');

-- CreateEnum
CREATE TYPE "type_mouvement_enum" AS ENUM ('entree', 'sortie');

-- CreateTable
CREATE TABLE "commandes" (
    "id_commande" BIGSERIAL NOT NULL,
    "id_utilisateur" BIGINT NOT NULL,
    "date_commande" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statut" "statut_commande" NOT NULL DEFAULT 'en_attente',
    "id_stock" BIGINT NOT NULL,
    "quantite" BIGINT NOT NULL,

    CONSTRAINT "commandes_pkey" PRIMARY KEY ("id_commande")
);

-- CreateTable
CREATE TABLE "mouvements" (
    "id_mouvement" BIGSERIAL NOT NULL,
    "id_stock" BIGINT NOT NULL,
    "type_mouvement" "type_mouvement_enum" NOT NULL,
    "quantite" BIGINT NOT NULL,
    "date_mouvement" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_commande" BIGINT NOT NULL,

    CONSTRAINT "mouvements_pkey" PRIMARY KEY ("id_mouvement")
);

-- CreateTable
CREATE TABLE "roles" (
    "id_role" BIGSERIAL NOT NULL,
    "nom_role" VARCHAR(50) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id_role")
);

-- CreateTable
CREATE TABLE "stocks" (
    "id_stock" BIGSERIAL NOT NULL,
    "nom" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "quantite_disponible" BIGINT NOT NULL,
    "type" "stock_type" NOT NULL,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("id_stock")
);

-- CreateTable
CREATE TABLE "utilisateurs" (
    "id_utilisateur" BIGSERIAL NOT NULL,
    "nom" VARCHAR(255) NOT NULL,
    "prenom" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "mot_de_passe" VARCHAR(255) NOT NULL,
    "id_role" BIGINT NOT NULL,

    CONSTRAINT "utilisateurs_pkey" PRIMARY KEY ("id_utilisateur")
);

-- CreateIndex
CREATE UNIQUE INDEX "utilisateurs_email_key" ON "utilisateurs"("email");

-- AddForeignKey
ALTER TABLE "commandes" ADD CONSTRAINT "commandes_id_stock_fkey" FOREIGN KEY ("id_stock") REFERENCES "stocks"("id_stock") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commandes" ADD CONSTRAINT "commandes_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "utilisateurs"("id_utilisateur") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mouvements" ADD CONSTRAINT "mouvements_id_commande_fkey" FOREIGN KEY ("id_commande") REFERENCES "commandes"("id_commande") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mouvements" ADD CONSTRAINT "mouvements_id_stock_fkey" FOREIGN KEY ("id_stock") REFERENCES "stocks"("id_stock") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "utilisateurs" ADD CONSTRAINT "utilisateurs_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id_role") ON DELETE SET NULL ON UPDATE CASCADE;
