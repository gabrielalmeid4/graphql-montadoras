"use client"; 

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MONTADORAS } from "@/graphql/queries";
import { REMOVER_MONTADORA, UPDATE_MONTADORA } from "@/graphql/mutations";
import client from "@/lib/apolloClient";
import Image from "next/image";
import Link from "next/link";

export interface Montadora {
  id: number;
  nome: string;
  pais: string;
  ano_fundacao: number;
  veiculos: {
    id: number;
    modelo: string;
  }[];
}

export default function Montadora() {
  const { data, loading, error, refetch } = useQuery(GET_MONTADORAS, { client });

  const [removerMontadora] = useMutation(REMOVER_MONTADORA, {
    client,
    onCompleted: () => {
      alert("Montadora removida com sucesso!");
      refetch(); 
    },
    onError: (err) => {
      console.error("Erro ao remover montadora:", err);
    },
  });

  const [atualizarMontadora] = useMutation(UPDATE_MONTADORA, {
    client,
    onCompleted: () => {
      alert("Montadora atualizada com sucesso!");
      refetch(); 
    },
    onError: (err) => {
      console.error("Erro ao atualizar montadora:", err);
    },
  });

  const handleRemoverMontadora = async (id: number) => {
    if (confirm("Tem certeza que deseja remover esta montadora?")) {
      await removerMontadora({ variables: { id } });
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar montadoras: {error.message}</p>;

  const montadoras: Montadora[] = data?.montadoras || [];

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <h1>Lista de Montadoras</h1>

        <Link href="/montadoras/add" className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Nova Montadora
        </Link>

        <ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {montadoras.map((montadora) => (
              <li key={montadora.id} className="border rounded-lg p-4 shadow-md">
                <h2 className="text-xl font-bold mb-2">
                  {montadora.nome} <span className="text-gray-300">#{montadora.id}</span>
                </h2>
                <p className="text-gray-200">País: {montadora.pais}</p>
                <p className="text-gray-200">Ano de Fundação: {montadora.ano_fundacao}</p>
                {montadora.veiculos.length > 0 ? (
                  <Link href={`/montadoras/${montadora.id}/veiculos`} className="text-blue-500 hover:text-blue-700 mt-4 inline-block">
                    Ver Veículos
                  </Link>
                ) : (
                  <span className="text-gray-400 mt-4 inline-block">Sem veículos cadastrados</span>
                )}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleRemoverMontadora(montadora.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                  >
                    Remover
                  </button>
                  <Link
                    href={`/montadoras/${montadora.id}/edit`}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
                  >
                    Editar 
                  </Link>
                  <Link
                    href={`/montadoras/${montadora.id}/veiculos/add`}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
                  >
                    Adicionar Veículo
                  </Link>
                </div>
              </li>
            ))}
          </div>
        </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>Montadoras</p>
      </footer>
    </div>
  );
}