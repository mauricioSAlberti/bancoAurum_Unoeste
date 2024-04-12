import { Button, Col, Form, Row } from 'react-bootstrap';
import Pagina from '../templates/Pagina';
import { LinkContainer } from 'react-router-bootstrap';
import { useEffect, useState } from 'react';
import { hostname, port } from '../dados/dados';
// SUBSTITUTO DE listaAgencias QUANDO NÃO HÁ BACKEND
import mockAgencias from '../dados/mockAgencias';

const urlUsuario = `http://${hostname}:${port}/usuario`;
const urlAgencia = `http://${hostname}:${port}/agencia`;

export default function TelaCadastrarUsuario(props) {
  const [validado, setValidado] = useState(false);
  const [usuario, setUsuario] = useState({
    cod_cli: '',
    nome: '',
    cpf: '',
    rg: '',
    dataNasc: '',
    endereco: '',
    cidade: '',
    uf: '',
    telefone: '',
    tipo: '',
    email: '',
    senha: '',
    agencia: 0,
    produtos: [],
  });

  const [listaAgencias, setListaAgencias] = useState([]);
  useEffect(() => {
    fetch(urlAgencia)
      .then((resp) => resp.json())
      .then((data) => {
        setListaAgencias(data);
      })
      .catch((erro) => console.error('Erro ao buscar agências', erro));
  }, []);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    console.log('teste: ', valor);
    setUsuario({ ...usuario, [id]: valor });
  }

  function manipulaSubmissao(e) {
    const form = e.currentTarget;
    if (form.checkValidity()) {
      // dados válidos → proceder com o cadastro
      fetch(urlUsuario, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
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
        <h2>Cadastro de novo usuário</h2>
        <br />
        <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
          <Row className='mb-3'>
            {/* NOME */}
            <Col xs={5}>
              <Form.Group controlId='nome' style={{ width: '380px' }}>
                <Form.Label>Nome:</Form.Label>
                <Form.Control required type='text' id='nome' value={usuario.nome} onChange={manipularMudanca} />
                <Form.Control.Feedback type='invalid'>Informe o nome do usuário!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* CPF */}
            <Col xs={3}>
              <Form.Group controlId='cpf' style={{ width: '140px' }}>
                <Form.Label>CPF:</Form.Label>
                <Form.Control required type='text' id='cpf' value={usuario.cpf} onChange={manipularMudanca} />
                <Form.Control.Feedback type='invalid'>Informe o CPF do usuário!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* RG */}
            <Col xs={3}>
              <Form.Group controlId='rg' style={{ width: '140px' }}>
                <Form.Label>RG:</Form.Label>
                <Form.Control required type='text' id='rg' value={usuario.rg} onChange={manipularMudanca} />
                <Form.Control.Feedback type='invalid'>Informe o RG do usuário!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* DATA DE NASCIMENTO */}
            <Col xs={3}>
              <Form.Group controlId='dataNasc' style={{ width: '160px' }}>
                <Form.Label>Data de nascimento:</Form.Label>
                <Form.Control required type='date' id='dataNasc' value={usuario.dataNasc} onChange={manipularMudanca} />
                <Form.Control.Feedback type='invalid'>Informe a data de nascimento do usuário!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* ENDEREÇO */}
          <Form.Group className='mb-3' controlId='endereco' style={{ width: '340px' }}>
            <Form.Label>Endereço:</Form.Label>
            <Form.Control required type='text' id='endereco' value={usuario.endereco} onChange={manipularMudanca} />
            <Form.Control.Feedback type='invalid'>Informe o endereço do usuário!</Form.Control.Feedback>
          </Form.Group>

          {/* CIDADE */}
          <Row>
            <Col className='mb-3'>
              <Form.Group className='mb-3' controlId='cidade' style={{ width: '340px' }}>
                <Form.Label>Cidade:</Form.Label>
                <Form.Control required type='text' id='cidade' value={usuario.cidade} onChange={manipularMudanca} />
                <Form.Control.Feedback type='invalid'>Informe a cidade onde o usuário reside!</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* UF */}
            <Col>
              <Form.Group className='mb-3' controlId='uf'>
                <Form.Label style={{ width: '50px' }}>UF:</Form.Label>
                <br />
                <select className='mb-3' id='uf' onChange={manipularMudanca} value={usuario.uf}>
                  <option></option>
                  <option value='AC'>AC</option>
                  <option value='AL'>AL</option>
                  <option value='AP'>AP</option>
                  <option value='AM'>AM</option>
                  <option value='BA'>BA</option>
                  <option value='CE'>CE</option>
                  <option value='ES'>ES</option>
                  <option value='GO'>GO</option>
                  <option value='MA'>MA</option>
                  <option value='MT'>MT</option>
                  <option value='MS'>MS</option>
                  <option value='MG'>MG</option>
                  <option value='PA'>PA</option>
                  <option value='PB'>PB</option>
                  <option value='PR'>PR</option>
                  <option value='PE'>PE</option>
                  <option value='PI'>PI</option>
                  <option value='RJ'>RJ</option>
                  <option value='RN'>RN</option>
                  <option value='RS'>RS</option>
                  <option value='RO'>RO</option>
                  <option value='RR'>RR</option>
                  <option value='SC'>SC</option>
                  <option value='SP'>SP</option>
                  <option value='SE'>SE</option>
                  <option value='TO'>TO</option>
                  <option value='DF'>DF</option>
                </select>
                <Form.Control.Feedback type='invalid'>Informe o estado da agência!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          {/* EMAIL */}
          <Form.Group className='mb-3' controlId='email' style={{ width: '240px' }}>
            <Form.Label>Email:</Form.Label>
            <Form.Control required type='email' id='email' value={usuario.email} onChange={manipularMudanca} />
            <Form.Control.Feedback type='invalid'>Informe o email do cliente !</Form.Control.Feedback>
          </Form.Group>

          {/* TELEFONE */}
          <Form.Group className='mb-3' controlId='telefone' style={{ width: '240px' }}>
            <Form.Label>Telefone:</Form.Label>
            <Form.Control required type='number' id='telefone' value={usuario.telefone} onChange={manipularMudanca} />
            <Form.Control.Feedback type='invalid'>Informe o telefone do cliente !</Form.Control.Feedback>
          </Form.Group>

          <Row style={{ width: '350px' }}>
            {/* SENHA */}
            <Col>
              <Form.Group className='mb-3' controlId='senha' style={{ width: '120px' }}>
                <Form.Label>Senha:</Form.Label>
                <Form.Control required type='password' id='senha' value={usuario.senha} onChange={manipularMudanca} />
                <Form.Control.Feedback type='invalid'>Informe a senha do usuário!</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* AGÊNCIA */}
            <Col>
              <Form.Group className='mb-3' style={{ width: '120px' }}>
                <Form.Label>Agência:</Form.Label>
                <select onChange={manipularMudanca} value={usuario.cod_ag} id='cod_ag'>
                  {mockAgencias.map((agencia) => (
                    <option key={agencia.cod_ag} value={agencia.cod_ag}>
                      Código: {agencia.cod_ag} | Cidade: {agencia.cidade} | UF: {agencia.uf}
                    </option>
                  ))}
                </select>
                <Form.Control.Feedback type='invalid'>Informe a agência do usuário!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* </Row> */}

            {/* PRODUTOS */}
            {/* <Row> */}
            <Form.Group className='mb-3' controlId='produtos' style={{ width: '130px' }}>
              <Form.Label>Produtos:</Form.Label>
              <Form.Control type='number' id='produtos' value={usuario.produtos} onChange={manipularMudanca} />
            </Form.Group>
          </Row>

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
