import { AppDataSource } from "../../data-source";
import { Veiculo } from "../entities/veiculo.entity";
import { Montadora } from "../entities/montadora.entity";

export const VeiculoResolver = {
  Query: {
    veiculos: async () => {
      const veiculoRepository = AppDataSource.getRepository(Veiculo);
      return await veiculoRepository.find({ relations: ["montadora"] });
    },

    veiculosByMontadora: async (_: any, { montadoraId }: { montadoraId: number }) => {
      const veiculoRepository = AppDataSource.getRepository(Veiculo);
      const veiculos = await veiculoRepository.find({
        where: { montadora: { id: montadoraId } }, 
        relations: ["montadora"], 
      });
      return veiculos;
    },
      veiculo: async (_, { id }) => {
        const veiculoRepository = AppDataSource.getRepository(Veiculo);
        const veiculo = await veiculoRepository.findOne({
          where: { id },
          relations: ["montadora"], 
        });
        if (!veiculo) throw new Error("Veículo não encontrado");
        return veiculo;
      },
 
  },
  Mutation: {
    criarVeiculo: async (_: any, { modelo, ano, montadoraId }: { modelo: string; ano: number; montadoraId: number }) => {
      const veiculoRepository = AppDataSource.getRepository(Veiculo);
      const montadoraRepository = AppDataSource.getRepository(Montadora);

      const montadora = await montadoraRepository.findOneBy({ id: montadoraId });
      if (!montadora) throw new Error("Montadora não encontrada");

      const veiculo = veiculoRepository.create({ modelo, ano, montadora });
      await veiculoRepository.save(veiculo);
      return veiculo;
    },

    atualizarVeiculo: async (_: any, { id, modelo, ano }: { id: number; modelo: string; ano: number }) => {
      const veiculoRepository = AppDataSource.getRepository(Veiculo);
      const veiculo = await veiculoRepository.findOneBy({ id });
      if (!veiculo) throw new Error("Veículo não encontrado");
      veiculo.modelo = modelo;
      veiculo.ano = ano;
      await veiculoRepository.save(veiculo);
      return veiculo;
    },

    removerVeiculo: async (_: any, { id }: { id: number }) => {
      const veiculoRepository = AppDataSource.getRepository(Veiculo);
      const veiculo = await veiculoRepository.findOneBy({ id });
      if (!veiculo) throw new Error("Veículo não encontrado");
      await veiculoRepository.remove(veiculo);
      return true;
    },
  },
};