import { Col, Image } from 'react-bootstrap';
import Pagina from '../templates/Pagina';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../templates/Menu';

export default function TelaInicial(props) {
  return (
    <>
      <Pagina />
      <Menu />
      <Col style={{ padding: '40px' }}>
        <Image className='rounded mx-auto d-block' src='https://cdn-icons-png.flaticon.com/256/3898/3898067.png' width={300} />
      </Col>
    </>
  );
}
