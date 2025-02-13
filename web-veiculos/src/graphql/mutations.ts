import { gql } from "@apollo/client";

export const CREATE_MONTADORA = gql`
  mutation CreateMontadora($nome: String!, $pais: String!, $ano_fundacao: Int!) {
    criarMontadora(nome: $nome, pais: $pais, ano_fundacao: $ano_fundacao) {
      id
      nome
      pais
      ano_fundacao  
    }
  }
`;

export const REMOVER_MONTADORA = gql`
  mutation RemoverMontadora($id: ID!) {
    removerMontadora(id: $id)
  }
`;

export const UPDATE_MONTADORA = gql`
  mutation UpdateMontadora($id: ID!, $nome: String!, $pais: String!, $ano_fundacao: Int!) {
    atualizarMontadora(id: $id, nome: $nome, pais: $pais, ano_fundacao: $ano_fundacao) {
      id
      nome
      pais
      ano_fundacao
    }
  }
`;


export const CREATE_VEICULO = gql`
  mutation CreateVeiculo($modelo: String!, $ano: Int!, $montadoraId: ID!) {
    criarVeiculo(modelo: $modelo, ano: $ano, montadoraId: $montadoraId) {
      id
      modelo
      ano
      montadora {
        id
        nome
      }
    }
  }
`;


export const UPDATE_VEICULO = gql`
  mutation UpdateVeiculo($id: ID!, $modelo: String!, $ano: Int!) {
    atualizarVeiculo(id: $id, modelo: $modelo, ano: $ano) {
      id
      modelo
      ano
    }
  }
`;

export const DELETE_VEICULO = gql`
  mutation DeleteVeiculo($id: ID!) {
    removerVeiculo(id: $id)
  }
`;



