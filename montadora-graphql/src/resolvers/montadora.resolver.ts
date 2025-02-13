import { AppDataSource } from "../../data-source";
import { Montadora } from "../entities/montadora.entity";

export const MontadoraResolver = {
  Query: {
    montadoras: async () => {
      const montadoraRepository = AppDataSource.getRepository(Montadora);
      return await montadoraRepository.find({ relations: ["veiculos"] });
    },

    montadora: async (_, { id }) => {
      const montadoraRepository = AppDataSource.getRepository(Montadora);
      const montadora = await montadoraRepository.findOne({
        where: { id },
        relations: ["veiculos"], 
      });
      if (!montadora) throw new Error("Montadora não encontrada");
      return montadora;
    },
  },

  Mutation: {
    criarMontadora: async (_: any, { nome, pais, ano_fundacao }: { nome: string; pais: string; ano_fundacao: number }) => {
      const montadoraRepository = AppDataSource.getRepository(Montadora);
      const montadora = montadoraRepository.create({ nome, pais, ano_fundacao });
      await montadoraRepository.save(montadora);
      return montadora;
    },

    atualizarMontadora: async (_: any, { id, nome, pais, ano_fundacao }: { id: number; nome: string; pais: string; ano_fundacao: number }) => {
      const montadoraRepository = AppDataSource.getRepository(Montadora);
      const montadora = await montadoraRepository.findOneBy({ id });
      if (!montadora) throw new Error("Montadora não encontrada");
      montadora.nome = nome;  
      montadora.pais = pais;
      montadora.ano_fundacao = ano_fundacao;
      await montadoraRepository.save(montadora);
      return montadora;
    },

    removerMontadora: async (_: any, { id }: { id: number }) => {
      const montadoraRepository = AppDataSource.getRepository(Montadora);
      const montadora = await montadoraRepository.findOneBy({ id });
      if (!montadora) throw new Error("Montadora não encontrada");
      await montadoraRepository.remove(montadora);
      return true;
    },
  },
};