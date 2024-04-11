import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import Pagina from '../templates/Pagina';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';
import { hostname, port } from '../dados/dados';
// import listaClientes from '../dados/mockClientes';
import mockUsuarios from '../dados/mockUsuarios';

const urlUsuario = `http://${hostname}:${port}/usuario`;

export default function TelaExibirUsuarios(props) {
  const [usuarios, setUsuarios] = useState([]);

  return (
    <Pagina>
      <Container>
        <br />
        <Table striped bordered hover variant='dark'>
          <thead>
            <tr>
              <th style={{ width: '3%' }}>Código</th>
              <th style={{ width: '15%' }}>Nome</th>
              <th style={{ width: '10%' }}>CPF</th>
              <th style={{ width: '10%' }}>RG</th>
              <th style={{ width: '5%' }}>Data de nascimento</th>
              <th style={{ width: '15%' }}>Endereço</th>
              <th style={{ width: '10%' }}>Cidade</th>
              <th style={{ width: '2%' }}>UF</th>
              <th style={{ width: '5%' }}>Telefone</th>
              <th style={{ width: '5%' }}>Tipo</th>
              <th style={{ width: '10%' }}>Email</th>
              <th style={{ width: '3%' }}>Agência</th>
              <th style={{ width: '5%' }}>Produtos</th>
              <th style={{ width: '2%' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {/* ? →  método map só será chamado se listaClientes for um atributo válido */}
            {/* {listaClientes?.map((cliente) => { */}
            {mockUsuarios?.map((usuario) => {
              return (
                //   necessário identificar cada linha da tabela usando "key"
                // key → ajuda o React na rendereização dos componentes no DOM virtual
                <tr key={usuario.cpf}>
                  <td>{usuario.cod_cli}</td>
                  <td>{usuario.nome}</td>
                  <td>{usuario.cpf}</td>
                  <td>{usuario.rg}</td>
                  <td>{usuario.dataNasc}</td>
                  <td>{usuario.endereco}</td>
                  <td>{usuario.cidade}</td>
                  <td>{usuario.uf}</td>
                  <td>{usuario.telefone}</td>
                  <td>{usuario.tipo}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.cod_ag}</td>
                  <td>{usuario.produtos}</td>
                  <td>
                    <cell style={{ paddingRight: '10px' }}>
                      <Button
                        variant='primary'
                        style={{ marginRight: '5px' }}
                        onClick={() => {
                          props.alterar(usuario);
                        }}
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil-square' viewBox='0 0 16 16'>
                          <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                          <path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z' />
                        </svg>
                      </Button>
                    </cell>
                    <cell>
                      <Button variant='outline-danger'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          class='bi bi-trash3'
                          viewBox='0 0 16 16'
                          onClick={() => {
                            props.excluir(usuario);
                          }}
                        >
                          <path d='M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5' />
                        </svg>
                      </Button>
                    </cell>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <LinkContainer to='/'>
        <Button variant='dark'>Voltar</Button>
      </LinkContainer>
    </Pagina>
  );
}
