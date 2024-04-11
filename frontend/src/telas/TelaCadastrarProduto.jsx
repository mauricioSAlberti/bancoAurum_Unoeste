import { Button, Col, Form, Row } from 'react-bootstrap';
import Pagina from '../templates/Pagina';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';
import { hostname, port } from '../dados/dados';

const urlProduto = `http://${hostname}:${port}/produto`;

export default function TelaCadastrarProduto(props) {
  const [validado, setValidado] = useState(false);
  const [produto, setProduto] = useState({
    cod_prod: '',
    descricao: '',
  });

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setProduto({ ...produto, [id]: valor });
  }

  function manipulaSubmissao(e) {
    const form = e.currentTarget;
    if (form.checkValidity()) {
      // dados válidos → proceder com o cadastro
      fetch(urlProduto, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produto),
      })
        .then((resp) => resp.json())
        .then((data) => {
          // Adicionar o produto à lista de produtos após cadastrá-lo no backend
          let novosProdutos = [...props.listaProdutos, data];
          props.setProduto(novosProdutos);
          setValidado(false);
          props.exibirTabela(true);
        })
        .catch((error) => console.error('Erro ao cadastrar produto:', error));
    } else {
      setValidado(true);
    }
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
      <Pagina>
        <h2>Cadastro de novo produto</h2>
        <br />
        <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
          <Row>
            {/* DESCRIÇÃO */}
            <Col xs={4}>
              <Form.Group controlId='descricao'>
                <Form.Label>Descrição do produto:</Form.Label>
                <Form.Control required type='text' id='descricao' value={produto.descricao} onChange={manipularMudanca} />
                <Form.Control.Feedback type='invalid'>Informe a descrição do produto!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            {/* BOTÃO DE CADASTRAR */}
            <Col xs='auto'>
              <Button variant='dark' type='submit'>
                Cadastrar produto
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
