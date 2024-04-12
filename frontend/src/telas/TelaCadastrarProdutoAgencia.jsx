import { Button, Col, Form, Row } from 'react-bootstrap';
import Pagina from '../templates/Pagina';
import { LinkContainer } from 'react-router-bootstrap';
import { useEffect, useState } from 'react';
import { hostname, port } from '../dados/dados';
import mockAgencias from '../dados/mockAgencias';

const urlAgencia = `http://${hostname}:${port}/agencia`;
const urlProduto = `http://${hostname}:${port}/produto`;

// ANTIGO CADASTRAR USUÁRIO
export default function TelaCadastrarProdAg(props) {
  const [validado, setValidado] = useState(false);
  const [agencia, setAgencia] = useState({
    cod_ag: '',
    endereco: '',
    cidade: '',
    uf: '',
    telefone: '',
  });

  const [produto, setProduto] = useState({
    cod_prod: '',
    descricao: '',
  });

  const [listaProdutos, setListaProdutos] = useState([]);
  useEffect(() => {
    fetch(urlProduto)
      .then((resp) => resp.json())
      .then((data) => {
        setListaProdutos(data);
      })
      .catch((erro) => console.error('Erro ao buscar produtos:', erro));
  }, []);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    console.log('teste: ', valor);
    setAgencia({ ...agencia, [id]: valor });
    setProduto({ ...produto, [id]: valor });
  }

  function manipulaSubmissao(e) {
    const form = e.currentTarget;
    if (form.checkValidity()) {
      // dados válidos → proceder com o cadastro
      fetch(urlAgencia, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agencia),
      })
        .then((resp) => resp.json())
        .then((data) => {
          // Adicionar o usuário à lista de usuários após cadastrá-lo no backend
          let novosUsuarios = [...props.listaUsuarios, data];
          props.setUsuario(novosUsuarios);
          setValidado(false);
          props.exibirTabela(true);
        })
        .catch((error) => console.error('Erro ao cadastrar usuário:', error));
    } else {
      setValidado(true);
    }
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
      <Pagina>
        <h2>Cadastro de produto em agência</h2>
        <br />
        <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
          {/* AGÊNCIA */}
          <Col>
            <Form.Group className='mb-3' style={{ width: '120px' }}>
              <Form.Label>Agência:</Form.Label>
              <br />
              <select onChange={manipularMudanca} value={agencia.cod_ag} id='cod_ag'>
                {mockAgencias.map((agencia) => (
                  <option key={agencia.cod_ag} value={agencia.cod_ag}>
                    Código: {agencia.cod_ag} | Cidade: {agencia.cidade} | UF: {agencia.uf}
                  </option>
                ))}
              </select>
            </Form.Group>
          </Col>
          <Row className='mb-3'>
            {/* AGÊNCIA */}
            <Col>
              <Form.Group controlId='nome' style={{ width: '100px' }}>
                <Form.Label>Produto:</Form.Label>
                <Form.Control required type='text' id='nome' value={agencia.nome} onChange={manipularMudanca} />
                <Form.Control.Feedback type='invalid'>Informe o nome do usuário!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* </Row> */}

          <br />
          <Row>
            {/* BOTÃO DE CADASTRAR */}
            <Col xs='auto'>
              <Button variant='dark' type='submit'>
                Cadastrar usuário
              </Button>
            </Col>

            {/* BOTÃO DE CANCELAR */}
            <Col xs='auto'>
              <LinkContainer to='/'>
                <Button variant='secondary'>Cancelar</Button>
              </LinkContainer>
            </Col>
          </Row>
          <br />
        </Form>
      </Pagina>
    </>
  );
}
