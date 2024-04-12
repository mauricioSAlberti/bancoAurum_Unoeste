// comentário pra testar commit
import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TelaLogin from './telas/TelaLogin.jsx';
import TelaInicial from './telas/TelaInicial';
import Tela404 from './telas/Tela404.jsx';
import TelaCadastrarAgencia from './telas/TelaCadastrarAgencia';
import TelaCadastrarUsuario from './telas/TelaCadastrarUsuario';
import TelaCadastrarProduto from './telas/TelaCadastrarProduto';
import TelaCadastrarProdAg from './telas/TelaCadastrarProdutoAgencia.jsx';

export const ContextoUsuario = createContext('');

function App() {
  const [usuario, setUsuario] = useState({
    nome: 'adminaurum',
    senha: 'admin',
    logado: true,
  });

  if (!usuario.logado) {
    return (
      <ContextoUsuario.Provider value={[usuario, setUsuario]}>
        <TelaLogin />;
      </ContextoUsuario.Provider>
    );
  } else {
    return (
      <div className='App'>
        <ContextoUsuario.Provider value={[usuario, setUsuario]}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<TelaInicial />} />
              <Route path='/cadastraragencia' element={<TelaCadastrarAgencia />} />
              <Route path='/cadastrarusuario' element={<TelaCadastrarUsuario />} />
              <Route path='/cadastrarproduto' element={<TelaCadastrarProduto />} />
              <Route path='/produtoagencia' element={<TelaCadastrarProdAg />} />

              <Route path='*' element={<Tela404 />} />
            </Routes>
          </BrowserRouter>
        </ContextoUsuario.Provider>
      </div>
    );
  }
}

export default App;
