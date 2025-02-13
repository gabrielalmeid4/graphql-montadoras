"use client"; 

import { useState, use } from "react"; 
import { useMutation } from "@apollo/client";
import { CREATE_VEICULO } from "@/graphql/mutations";
import client from "@/lib/apolloClient";
import { useRouter } from "next/navigation"; 

export default function AddVeiculo({ params }: { params: Promise<{ id: number }> }) {
  const { id: montadoraId } = use(params); 
  const router = useRouter(); 

  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState<number | "">("");

  const [createVeiculo, { loading, error }] = useMutation(CREATE_VEICULO, {
    client,
    onCompleted: () => {
      alert("Veículo criado com sucesso!");
      router.push(`/montadoras/`); 
    },
    onError: (err) => {
      console.error("Erro ao criar veículo:", err);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createVeiculo({
        variables: { modelo, ano: Number(ano), montadoraId },
      });
    } catch (err) {
      console.error("Erro ao criar veículo:", err);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Adicionar Veículo</h1>

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
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? "Criando..." : "Criar Veículo"}
          </button>
        </form>

        {error && <p className="text-red-500">Erro: {error.message}</p>}
      </main>
    </div>
  );
}