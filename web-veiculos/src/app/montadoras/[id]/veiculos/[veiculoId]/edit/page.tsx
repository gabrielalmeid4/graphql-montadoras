"use client"; 

import { useState, useEffect, use } from "react"; 
import { useMutation, useQuery } from "@apollo/client";
import { GET_VEICULO_BY_ID } from "@/graphql/queries";
import { UPDATE_VEICULO } from "@/graphql/mutations";
import client from "@/lib/apolloClient";
import { useRouter } from "next/navigation";

export default function EditarVeiculo({ params }: { params: Promise<{ id: string; veiculoId: string }> }) {
  
  const { id: montadoraId, veiculoId } = use(params); 

  const router = useRouter(); 

  
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState<number | "">("");

  
  const { data, loading, error } = useQuery(GET_VEICULO_BY_ID, {
    client,
    variables: { id: String(veiculoId) }, 
  });

  
  useEffect(() => {
    if (data?.veiculo) {
      setModelo(data.veiculo.modelo);
      setAno(data.veiculo.ano);
    }
  }, [data]);

  
  const [atualizarVeiculo] = useMutation(UPDATE_VEICULO, {
    client,
    onCompleted: () => {
      alert("Veículo atualizado com sucesso!");
      router.push(`/montadoras/${montadoraId}/veiculos`); 
    },
    onError: (err) => {
      console.error("Erro ao atualizar veículo:", err);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    if (!modelo || !ano) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await atualizarVeiculo({
        variables: {
          id: veiculoId,
          modelo,
          ano: Number(ano),
        },
      });
    } catch (err) {
      console.error("Erro ao atualizar veículo:", err);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar veículo: {error.message}</p>;

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Editar Veículo</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Modelo do Veículo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            className="p-2 border rounded text-gray-800"
            required
          />
          <input
            type="number"
            placeholder="Ano do Veículo"
            value={ano}
            onChange={(e) => setAno(e.target.valueAsNumber || "")}
            className="p-2 border rounded text-gray-800"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Atualizar Veículo
          </button>
        </form>
      </main>
    </div>
  );
}