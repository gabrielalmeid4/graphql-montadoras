"use client"; 

import { use } from "react"; 
import { useQuery, useMutation } from "@apollo/client";
import { GET_VEICULOS_BY_MONTADORA } from "@/graphql/queries";
import { DELETE_VEICULO } from "@/graphql/mutations";
import client from "@/lib/apolloClient";
import { Montadora } from "../../page";
import Link from "next/link";

interface Veiculo {
  id: number;
  modelo: string;
  montadora: Montadora;
}

interface VeiculosPageProps {
  params: Promise<{ id: number }>; 
}

const VeiculosPage = ({ params }: VeiculosPageProps) => {
  const { id } = use(params);

  const { data, loading, error, refetch } = useQuery(GET_VEICULOS_BY_MONTADORA, {
    client,
    variables: { montadoraId: id },
  });

  const [removerVeiculo] = useMutation(DELETE_VEICULO, {
    client,
    onCompleted: () => {
      alert("Veículo removido com sucesso!");
      refetch(); 
    },
    onError: (err) => {
      console.error("Erro ao remover veículo:", err);
    },
  });

  const handleRemoverVeiculo = async (veiculoId: number) => {
    if (confirm("Tem certeza que deseja remover este veículo?")) {
      await removerVeiculo({ variables: { id: veiculoId } });
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar veículos: {error.message}</p>;

  const veiculos: Veiculo[] = data?.veiculosByMontadora || [];
  const montadora = veiculos[0]?.montadora;

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Veículos da Montadora {montadora?.nome}
        </h1>

        <Link
          href={`/montadoras/${id}/veiculos/add`}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Adicionar Veículo
        </Link>

        <ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {veiculos.map((veiculo) => (
              <li
                key={veiculo.id}
                className="border rounded-lg p-4 shadow-md bg-gray-700 text-white"
              >
                <h2 className="text-xl font-bold mb-2">
                  {veiculo.modelo} <span className="text-gray-300">#{veiculo.id}</span>
                </h2>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleRemoverVeiculo(veiculo.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                  >
                    Remover
                  </button>
                  <Link
                    href={`/montadoras/${id}/veiculos/${veiculo.id}/edit`}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
                  >
                    Editar
                  </Link>
                </div>
              </li>
            ))}
          </div>
        </ul>
      </main>
    </div>
  );
};

export default VeiculosPage;