import CEPForm from './components/CEPForm'
import LoginForm from './components/LoginForm'
import Location from './components/Location'

export default function App() {
  return (
    <div style={{fontFamily:'system-ui, Arial', maxWidth: 720, margin: '32px auto', padding: 16}}>
      <h1>IaraGames • Área React</h1>
      <p style={{marginTop: -8, color: '#555'}}>Demo com 3 APIs: ViaCEP, Login (mock) e Geolocalização</p>

      <section style={{marginTop: 28}}>
        <h2>1) Consulta de CEP (ViaCEP)</h2>
        <CEPForm />
      </section>

      <section style={{marginTop: 28}}>
        <h2>2) Autenticação simples (API mockada)</h2>
        <p style={{color:'#555', marginTop: -8}}>
          Use <code>eve.holt@reqres.in</code> e senha <code>cityslicka</code> (ReqRes).
        </p>
        <LoginForm />
      </section>

      <section style={{marginTop: 28}}>
        <h2>3) Geolocalização (abrir no mapa)</h2>
        <Location />
      </section>

      <footer style={{marginTop: 40, fontSize: 13, color:'#777'}}>
        © {new Date().getFullYear()} IaraGames — Trabalho React/API/Deploy
      </footer>
    </div>
  )
}
