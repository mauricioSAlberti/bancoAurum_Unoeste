import { Dropdown, ButtonGroup } from 'react-bootstrap';
import '../estilo.css';

export default function Menu() {
  return (
    <ButtonGroup className='d-flex justify-content-center'>
      <Dropdown>
        <Dropdown.Toggle variant='light'>AGÊNCIAS</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href='/cadastraragencia'>Cadastrar agência</Dropdown.Item>
          <Dropdown.Item href='/exibiragencias'>Exibir agências</Dropdown.Item>
          <Dropdown.Item href='/produtoagencia'>Cadastrar produto em agência</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant='light'>USUÁRIOS</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href='/cadastrarusuario'>Cadastrar usuário</Dropdown.Item>
          <Dropdown.Item href='/exibirusuarios'>Exibir usuários</Dropdown.Item>
          <Dropdown.Item href='/produtousuario'>Contratar produto para usuário</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant='light'>PRODUTOS</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href='/cadastrarproduto'>Cadastrar produto</Dropdown.Item>
          <Dropdown.Item href='/exibirprodutos'>Exibir produtos</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
    // </div>
  );
}
