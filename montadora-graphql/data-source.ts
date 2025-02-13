import "reflect-metadata";
import { DataSource } from "typeorm";
import { Montadora } from "./src/entities/montadora.entity";
import { Veiculo } from "./src/entities/veiculo.entity";
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  synchronize: false,
  logging: true,
  entities: [Montadora, Veiculo], // pode ser como abaixo
  migrations: ["src/persistence/typeorm/migrations/**/*.ts"],
  ssl: { rejectUnauthorized: false }
});

AppDataSource.initialize()
  .then(() => {
    console.log("Datasource is UP!!!");
  })
  .catch((err) => {
    console.log("Erro ao inicilizar o DS!", err);
  });
