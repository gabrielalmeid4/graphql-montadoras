import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Veiculo } from "./veiculo.entity";

@Entity()
export class Montadora {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  pais: string;

  @Column()
  ano_fundacao: number;

  @OneToMany(() => Veiculo, (veiculo) => veiculo.montadora)
  veiculos: Veiculo[];
}