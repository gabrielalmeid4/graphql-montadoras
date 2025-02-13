import { gql } from "@apollo/client";

export const GET_MONTADORAS = gql`
  query GetMontadoras {
    montadoras {
      id
      nome
      pais
      ano_fundacao
      veiculos {
        id
        modelo
      }
    }
  }
`;

export const GET_MONTADORA_BY_ID = gql`
  query GetMontadoraById($id: ID!) {
    montadora(id: $id) {
      id
      nome
      pais
      ano_fundacao
    }
  }
`;



export const GET_VEICULOS_BY_MONTADORA = gql`
  query GetVeiculosByMontadora($montadoraId: ID!) {
    veiculosByMontadora(montadoraId: $montadoraId) {
      id
      modelo
      montadora {
        id
        nome
      }
    }
  }
`;

export const GET_VEICULO_BY_ID = gql`
  query GetVeiculoById($id: ID!) {
    veiculo(id: $id) {
      id
      modelo
      ano
    }
  }
`;