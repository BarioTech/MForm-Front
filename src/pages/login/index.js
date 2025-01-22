import React, { useReducer, useState, useEffect } from "react";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { CForm } from '@coreui/react';
import { CFormInput } from '@coreui/react';
import { CCol } from '@coreui/react';
import { CRow } from '@coreui/react';
import { CFormSelect } from '@coreui/react';
import { CButton } from '@coreui/react';
import { useNavigate, useLocation } from "react-router-dom";
import { useStyles } from './styles';
import Box from '@material-ui/core/Box';
import { formatCPF, normalizePhoneNumber } from '../../helpers/format';
import api from "../../hooks/api";
import 'bootstrap/dist/css/bootstrap.min.css';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const styles = {
  container: {
    width: '60%',
    maxHeight: '200px',
    maxWidth: '800px',
    margin: '0 auto', // Centraliza a div horizontalmente
  },
  image: {
    width: '100%', // Faz a imagem ocupar toda a largura da div
    height: 'auto', // Mantém a proporção da imagem
    borderRadius: '8px', // Estilo opcional para bordas arredondadas
    // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Estilo opcional para sombra
  },
};


export default function Login() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const [formData, setFormData] = useReducer(formReducer, {});
  const [isNameValid, setValidName] = useState(false)
  const [isCPFValid, setValidCPF] = useState(false)
  const [isEmailValid, setValidEmail] = useState(false)
  const [isPhoneValid, setValidPhone] = useState(false)
  const [submit, setSubmit] = useState(false)

  const steps = [
    {
      id: 'PERSONAL',
      title: "Dados pessoais"
    },
    {
      id: 'CONTATO',
      title: "Contato de Emergência"
    },
    {
      id: 'HISTORICO',
      title: "Históricos"
    },
    {
      id: 'DADOSSAUDE',
      title: "Dados de Saúde e Condição Física"
    }
  ];

  const handleChange = (event, value) => {
    setFormData({
      name: event.name || event.label || event.target.name,
      value: value,
    });
  };

  const validateNome = (value) => {
    if (value.length > 0) setValidName(true)
    if (value.length === 0) setValidName(false)

    return value
  }

  const validateCPF = (value) => {
    if (value.length > 0) setValidCPF(true)
    if (value.length === 0) setValidCPF(false)

    return value
  }

  const validateEmail = (value) => {
    if (value.length > 0) setValidEmail(true)
    if (value.length === 0) setValidEmail(false)

    return value
  }

  const validatePhone = (value) => {
    if (value.length > 0) setValidPhone(true)
    if (value.length === 0) setValidPhone(false)

    return value
  }
  useEffect(() => {
  }, [])

  const login = async (e) => {
    e.preventDefault();
    setSubmit(true)
    await api.post("/auth/login", {
      email: formData.email,
      password: formData.password,
    }).then(rs => {
      const auth = rs.data.auth;
      const user = rs.data.user;
      const token = rs.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('isLogged', true);
      localStorage.setItem('user', JSON.stringify(user || {}));
      localStorage.setItem('auth', auth);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      window.location.replace("/")
    }).catch(err => alert("Erro ao logar!"))

  };

  const [currentStep, setCurrentStep] = useState(0);

  function handleNextStep(e) {
    e.preventDefault();
    setCurrentStep((prevState) => prevState + 1);
  }

  function handlePreviousStep(e) {
    e.preventDefault();
    setCurrentStep((prevState) => prevState - 1);
  }

  return (
    // div

    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>

        <Toolbar className={classes.toolbar}>
          {!localStorage.getItem("isLogged") && (
          <Button href="/login" color="#3E3E3E" variant="outlined" className={classes.link}>
            Login
          </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" fontFamily="Courier New" className={classes.titleGD} gutterBottom>
          <div style={styles.container}>
            <img
              src="loja.png"
              alt="Imagem da loja"
              style={styles.image}
            />
          </div>
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <div className={classes.heroContent}>
          <div className={classes.centralDiv}>
            <CForm className="row g-3">
              <CCol md={12}>
                <CFormInput
                  value={formData.email}
                  feedback="O Campo email deve ser preenchido."
                  onChange={e => handleChange(e, e.target.value)}
                  placeholder="E-mail..."
                  name="email"
                  id="inputEmail"
                  label="E-mail:"
                  required />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  value={formData.password}
                  feedback="O Campo senha deve ser preenchido."
                  onChange={e => handleChange(e, e.target.value)}
                  name="password"
                  id="inputPassword"
                  type="password"
                  placeholder="Senha..."
                  label="Senha:"
                  required />
              </CCol>


              <CCol xs={12}>
                I<CButton onClick={e => login(e)} className={classes.cadastrarButton} color="secondary" type="submit">Log In</CButton>
              </CCol>
            </CForm>
          </div>
        </div>
      </Container>
      <Container maxWidth="md" component="footer" className={classes.footer}>
      </Container>
    </React.Fragment>
  );
}
