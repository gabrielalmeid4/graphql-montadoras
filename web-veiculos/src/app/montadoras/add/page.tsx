"use client"; 

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_MONTADORA } from "@/graphql/mutations";
import client from "@/lib/apolloClient";
import { useRouter } from "next/navigation"; 

export default function AddMontadora() {
  const [nome, setNome] = useState("");
  const [pais, setPais] = useState("");
  const [anoFundacao, setAnoFundacao] = useState<number | "">("");

  const router = useRouter(); 

  const [createMontadora, { loading, error }] = useMutation(CREATE_MONTADORA, {
    client,
    onCompleted: () => {
      alert("Montadora criada com sucesso!");
      router.push("/montadoras"); 
    },
    onError: (err) => {
      console.error("Erro ao criar montadora:", err);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMontadora({
        variables: { nome, pais, ano_fundacao: Number(anoFundacao) },
      });
    } catch (err) {
      console.error("Erro ao criar montadora:", err);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Adicionar Montadora</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome da Montadora"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="p-2 border rounded text-gray-800"
            required
          />
          <input
            type="text"
            placeholder="País da Montadora"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            className="p-2 border rounded text-gray-800"
            required
          />
          <input
            type="number"
            placeholder="Ano de Fundação"
            value={anoFundacao}
            onChange={(e) => setAnoFundacao(e.target.valueAsNumber || "")}
            className="p-2 border rounded text-gray-800"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? "Criando..." : "Criar Montadora"}
          </button>
        </form>

        {error && <p className="text-red-500">Erro: {error.message}</p>}
      </main>
    </div>
  );
}