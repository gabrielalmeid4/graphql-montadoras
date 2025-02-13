import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Montadora } from "./montadora.entity";

@Entity()
export class Veiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelo: string;

  @Column()
  ano: number;

  @ManyToOne(() => Montadora, (montadora) => montadora.veiculos)
  montadora: Montadora;
}