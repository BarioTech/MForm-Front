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


export default function Home() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const [formData, setFormData] = useReducer(formReducer, {});
  const [isNameValid, setValidName] = useState(false)
  const [isCPFValid, setValidCPF] = useState(false)
  const [isEmailValid, setValidEmail] = useState(false)
  const [isPhoneValid, setValidPhone] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [inputList, setInputList] = useState([]);
  const [inputAlergiaList, setInputAlergiaList] = useState([]);
  const [inputCirurgiaList, setInputCirurgiaList] = useState([]);
  const [inputInternadoList, setInputInternadoList] = useState([]);
  const [inputMedicamentoList, setInputMedicamentoList] = useState([]);


  const addInput = () => {
    setInputList([...inputList, inputList.length]);
  };

  const addInputAlergia = () => {
    setInputAlergiaList([...inputAlergiaList, inputAlergiaList.length]);
  };

  const addInputCirurgia = () => {
    setInputCirurgiaList([...inputCirurgiaList, inputCirurgiaList.length]);
  };

  const addInputInternadoList = () => {
    setInputInternadoList([...inputInternadoList, inputInternadoList.length]);
  };

  const addInputMedicamentoList = () => {
    setInputMedicamentoList([...inputMedicamentoList, inputMedicamentoList.length]);
  };

  const [doencaDescricao, setDoencaDescricao] = useState([])
  const [alergiaDescricao, setAlergiaDescricao] = useState([])
  const [cirurgiaDescricao, setCirurgiaDescricao] = useState([])
  const [dataCirurgia, setDataCirurgia] = useState([])
  const [motivoInternado, setMotivoInternado] = useState([])
  const [inicioInternado, setInicioInternado] = useState([])
  const [fimInternado, setFimInternado] = useState([])
  const [nomeMedicamento, setNomeMedicamento] = useState([])
  const [frequenciaMed, setFrequenciaMed] = useState([])
  const [dosagemMed, setDosagemMed] = useState([])
  const [obsTratamento, setObsTratamento] = useState([])
  const [imc, setImc] = useState([])
  const [peso, setPeso] = useState([])
  const [altura, setAltura] = useState([])

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
    },
    {
      id: 'DADOSMACOM',
      title: "Dados de Saúde e Condição Física"
    }
  ];


  const handleChange = (event, value) => {
    if (event.target.name.split("-")[0] === "doencaDescricao" || event.target.name === "doencaDescricao") {
      doencaDescricao[event.target.id] = value
      setDoencaDescricao(doencaDescricao)
      setFormData({
        name: "doencaDescricao",
        value: doencaDescricao
      })
    }

    if (event.target.name.split("-")[0] === "alergiaDescricao" || event.target.name === "alergiaDescricao") {
      alergiaDescricao[event.target.id] = value
      setAlergiaDescricao(alergiaDescricao)
      setFormData({
        name: "alergiaDescricao",
        value: alergiaDescricao
      })
    }

    if (event.target.name.split("-")[0] === "cirurgiaDescricao" || event.target.name === "cirurgiaDescricao") {
      cirurgiaDescricao[event.target.id] = { cirurgiaDescricao: value }
      setCirurgiaDescricao(cirurgiaDescricao)
      setFormData({
        name: "cirurgiaDescricao",
        value: cirurgiaDescricao
      })

    }
    if (event.target.name.split("-")[0] === "dataCirurgia" || event.target.name === "dataCirurgia") {
      cirurgiaDescricao[event.target.id] = {
        ...cirurgiaDescricao[event.target.id],
        dataCirurgia: value,
      }
      setDataCirurgia(dataCirurgia)
      setFormData({
        name: "cirurgiaDescricao",
        value: cirurgiaDescricao
      })

    }

    if (event.target.name.split("-")[0] === "motivoInternado" || event.target.name === "motivoInternado") {
      motivoInternado[event.target.id] = { motivoInternado: value }
      setMotivoInternado(motivoInternado)
      setFormData({
        name: "motivoInternado",
        value: motivoInternado
      })
    }

    if (event.target.name.split("-")[0] === "inicioInternado" || event.target.name === "inicioInternado") {
      motivoInternado[event.target.id] = {
        ...motivoInternado[event.target.id],
        inicioInternado: value,
      }
      setInicioInternado(inicioInternado)
      setFormData({
        name: "motivoInternado",
        value: motivoInternado
      })
    }

    if (event.target.name.split("-")[0] === "fimInternado" || event.target.name === "fimInternado") {
      motivoInternado[event.target.id] = {
        ...motivoInternado[event.target.id],
        fimInternado: value,
      }
      setInicioInternado(fimInternado)
      setFormData({
        name: "motivoInternado",
        value: motivoInternado
      })

    }

    if (event.target.name.split("-")[0] === "nomeMedicamento" || event.target.name === "nomeMedicamento") {
      nomeMedicamento[event.target.id] = { nomeMedicamento: value }
      setNomeMedicamento(nomeMedicamento)
      setFormData({
        name: "nomeMedicamento",
        value: nomeMedicamento
      })
    }

    if (event.target.name.split("-")[0] === "frequenciaMed" || event.target.name === "frequenciaMed") {
      nomeMedicamento[event.target.id] = {
        ...nomeMedicamento[event.target.id],
        frequenciaMed: value,
      }
      setFrequenciaMed(frequenciaMed)
      setFormData({
        name: "nomeMedicamento",
        value: nomeMedicamento
      })

    }

    if (event.target.name.split("-")[0] === "dosagemMed" || event.target.name === "dosagemMed") {
      nomeMedicamento[event.target.id] = {
        ...nomeMedicamento[event.target.id],
        dosagemMed: value,
      }
      setDosagemMed(dosagemMed)
      setFormData({
        name: "nomeMedicamento",
        value: nomeMedicamento
      })

    }

    if (event.target.name.split("-")[0] === "peso" || event.target.name === "peso") {
      setPeso(event.target.value)
      let imcRes = peso/ (altura * altura)
      setImc(imcRes.toFixed(2))

      setFormData({
        name: "imc",
        value: (peso / (altura * altura))
      })
    }

    if (event.target.name.split("-")[0] === "altura" || event.target.name === "altura") {
      setAltura(event.target.value)
      let imcRes = peso/ (event.target.value * event.target.value)
      console.log("altura e peso", altura, peso)
      console.log("imc", imcRes, imc)
      setImc(imcRes.toFixed(2))
      setFormData({
        name: "imc",
        value: (peso / (altura * altura))
      })
    }

    if (event.target.name.split("-")[0] === "obsTratamento" || event.target.name === "obsTratamento") {
      nomeMedicamento[event.target.id] = {
        ...nomeMedicamento[event.target.id],
        obsTratamento: value,
      }
      setObsTratamento(obsTratamento)
      setFormData({
        name: "nomeMedicamento",
        value: nomeMedicamento
      })

    } else {
      setFormData({
        name: event.name || event.label || event.target.name,
        value: value,
      });
    }

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
    const newDoencaDescricao = [...(formData.doencaDescricao || [])];
    const newAlergiaDescricao = [...(formData.alergiaDescricao || [])];
    const newCirurgiaDescricao = [...(formData.cirurgiaDescricao || [{}])];
    const newMotivoInternado = [...(formData.motivoInternado || [{}])];
    const newNomeMedicamento = [...(formData.nomeMedicamento || [{}])];

    setFormData({
      ...formData,
      doencaDescricao: newDoencaDescricao,
      alergiaDescricao: newAlergiaDescricao,
      cirurgiaDescricao: newCirurgiaDescricao,
      motivoInternado: newMotivoInternado,
      nomeMedicamento: newNomeMedicamento
    });

  }, [])

  const callCadastro = async (e) => {
    e.preventDefault();
    setSubmit(true)
    console.log(formData)
    await api.post("/usuarios/cadastrarUsuario", {
      formData,
      idMacom: "asdSDSoa"
    }).then(rs => {
      console.log(rs.data)
      window.location.replace("/")
    }).catch(err => alert("Erro ao cadastrar usuário!"))

  };

  const [currentStep, setCurrentStep] = useState(0);

  function handleNextStep(e) {
    e.preventDefault();
    setCurrentStep((prevState) => prevState + 1);
  }

  const logout = () => {
    localStorage.removeItem('token',);
    localStorage.removeItem('isLogged');
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
    window.location.reload();
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
          {!localStorage.getItem("isLogged") ? (
            <Button href="/login" color="#3E3E3E" variant="outlined" className={classes.link}>
              Logar
            </Button>
          ) : (
            <>
              <Button onClick={logout} color="#3E3E3E" variant="outlined" className={classes.link}>
                Deslogar
              </Button>

              <Button href="/dashboard" color="#3E3E3E" variant="outlined" className={classes.link}>
                Painel de Controle
              </Button>
            </>
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
              {steps[currentStep].id === 'PERSONAL' && (
                <>
                  <CCol xs={12}>
                    <h5>Dados Pessoais</h5>
                  </CCol>

                  <CCol md={8}>
                    <CFormInput
                      value={formData.nome}
                      feedback="O Campo nome deve ser preenchido."
                      onChange={e => handleChange(e, validateNome(e.target.value))}
                      name="nome"
                      id="inputNome"
                      label="Nome Completo:"
                      invalid={!isNameValid && submit}
                      required />
                  </CCol>
                  <CCol md={4}>
                    <CFormInput
                      value={formData.dataNascimento}
                      onChange={e => handleChange(e, e.target.value)}
                      name="dataNascimento"
                      label="Data de Nascimento:"
                      type="date"
                      required />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      value={formatCPF(formData.cpf)}
                      onChange={e => handleChange(e, formatCPF(validateCPF(e.target.value)))}
                      feedback="Digite um CPF válido."
                      name="cpf"
                      type="text"
                      id="inputCpf"
                      label="CPF:"
                      placeholder="___.___.___-__"
                      invalid={!isCPFValid && submit}
                      required />
                  </CCol>
                  <CCol xs={2}>
                    <CFormInput
                      value={formData.ddd} onChange={e => handleChange(e, e.target.value)}
                      feedback="Digite um DDD válido."
                      name="ddd"
                      id="inputDDD"
                      label="DDD:"
                      placeholder="84"
                      invalid={!isPhoneValid && submit}
                      required />
                  </CCol>
                  <CCol xs={4}>
                    <CFormInput
                      value={formData.celular}
                      onChange={e => handleChange(e, validatePhone(e.target.value))}
                      feedback="Digite um celular válido."
                      name="celular" id="inputCelular"
                      label="Celular:"
                      placeholder="9999-9999"
                      invalid={!isPhoneValid && submit}
                      required />
                  </CCol>
                  <CCol md={3}>
                    <CFormInput
                      value={formData.rua}
                      onChange={e => handleChange(e, e.target.value)}
                      feedback="Digite uma rua válida."
                      name="rua"
                      id="inputRua"
                      label="Endereço:"
                      placeholder="Ex: Avenida Brasil"
                      required
                    />
                  </CCol>
                  <CCol md={3}>
                    <CFormInput
                      value={formData.bairro}
                      onChange={e => handleChange(e, e.target.value)}
                      feedback="Digite um bairro válido."
                      name="bairro"
                      id="inputBairro"
                      label="Bairro:"
                      placeholder="Ex: Centro"
                      required
                    />
                  </CCol>
                  <CCol md={3}>
                    <CFormInput
                      value={formData.numero}
                      onChange={e => handleChange(e, e.target.value)}
                      feedback="Digite um número válido."
                      name="numero"
                      id="inputNumero"
                      label="Número:"
                      placeholder="123"
                      required
                    />
                  </CCol>
                  <CCol md={3}>
                    <CFormInput
                      value={formData.cidade}
                      onChange={e => handleChange(e, e.target.value)}
                      feedback="Digite uma cidade válida."
                      name="cidade"
                      id="inputCidade"
                      label="Cidade:"
                      placeholder="Ex: São Paulo"
                      required
                    />
                  </CCol>
                </>
              )}

              {steps[currentStep].id === 'CONTATO' && (
                <>
                  <CCol xs={12}>
                    <h5>Contato de Emergência</h5>
                  </CCol>

                  <CCol md={12}>
                    <CFormInput
                      value={formData.nomeCdE}
                      feedback="O Campo nome deve ser preenchido."
                      onChange={e => handleChange(e, validateNome(e.target.value))}
                      name="nomeCdE"
                      id="inputNomeCdE"
                      label="Nome Completo:"
                      invalid={!isNameValid && submit}
                      required />
                  </CCol>
                  <CCol md={6}>
                    <CFormSelect
                      type="text"
                      onChange={e => handleChange(e, e.target.value)}
                      name="parentescoCdE"
                      id="inputParentesco"
                      label="Parentesco"
                      required
                    >
                      <option value="" selected={true}>Selecione uma opção</option>
                      <option value="pai">Pai</option>
                      <option value="mae">Mãe</option>
                      <option value="irmao">Irmão(a)</option>
                      <option value="avo">Filho(a)</option>
                      <option value="tio">Tio(a)</option>
                      <option value="primo">Primo(a)</option>
                      <option value="conjuge">Cônjuge</option>
                      <option value="amigo">Amigo(a)</option>
                      <option value="colega">Colega de Trabalho</option>
                      <option value="outro_familiar">Outro Familiar</option>
                    </CFormSelect>
                  </CCol>
                  <CCol xs={2}>
                    <CFormInput
                      value={formData.dddCdE}
                      onChange={e => handleChange(e, e.target.value)}
                      feedback="Digite um DDD válido."
                      name="dddCdE" id="inputDDDCdE"
                      label="DDD:"
                      placeholder="84"
                      invalid={!isPhoneValid && submit}
                      required />
                  </CCol>
                  <CCol xs={4}>
                    <CFormInput
                      value={formData.phoneCdE}
                      onChange={e => handleChange(e, validatePhone(e.target.value))}
                      feedback="Digite um celular válido."
                      name="celularCdE"
                      id="inputCelularCdE"
                      label="Celular:"
                      placeholder="9999-9999"
                      invalid={!isPhoneValid && submit}
                      required />
                  </CCol>

                </>
              )}
              {steps[currentStep].id === 'HISTORICO' && (
                <>

                  <CCol xs={12}>
                    <h5>Histórico Médico</h5>
                  </CCol>

                  <CRow>
                    <CCol md={6}>
                      <CFormSelect
                        type="text"
                        onChange={e => handleChange(e, e.target.value)}
                        name="doenca"
                        id="inputDoenca"
                        label="Possui doença?"
                        required
                      >
                        <option value={false} selected={true}>Selecione uma opção</option>
                        <option value={true}>Sim</option>
                        <option value={false}>Não</option>
                      </CFormSelect>
                    </CCol>
                    <CCol md={6}>
                      <CFormSelect
                        type="text"
                        onChange={e => handleChange(e, e.target.value)}
                        name="alergia"
                        id="inputAlergia"
                        label="Possui alergia?"
                        required
                      >
                        <option value={false} selected={true}>Selecione uma opção</option>
                        <option value={true}>Sim</option>
                        <option value={false}>Não</option>
                      </CFormSelect>
                    </CCol>
                    {formData.doenca === 'true' && (
                      <>
                        <div className={classes.inputButton}>
                          <CCol md={11}>
                            <CFormInput

                              onChange={e => handleChange(e, e.target.value)}
                              feedback="Digite o quadro clínico."
                              name="doencaDescricao"
                              value={new Set(formData.doencaDescricao)[0]}
                              type="text"
                              id="0"
                              label="Qual o quadro clínico?"
                              placeholder="Descreva a doença"
                              required
                            />

                          </CCol>
                          <CButton className={classes.plusButton} color="secondary" onClick={addInput}>
                            +
                          </CButton>
                        </div>

                        {inputList.map((_, index) => (
                          <div className={classes.inputButton}>

                            <CCol md={11} key={index}>
                              <CFormInput
                                onChange={e => handleChange(e, e.target.value)}
                                feedback={`Digite o quadro clínico adicional ${index + 1}.`}
                                name={`doencaDescricao-${index}`}
                                value={new Set(formData.doencaDescricao)[index + 1]}
                                type="text"
                                id={`${index + 1}`}
                                label={`Quadro clínico adicional ${index + 1}`}
                                placeholder="Descreva a doença"
                                required
                              />
                            </CCol>
                            <CButton color="secondary" className={classes.plusButton} onClick={addInput}>
                              +
                            </CButton>
                          </div>

                        ))}


                      </>
                    )}
                    {formData.alergia === 'true' && (
                      <>
                        <div className={classes.inputButton}>

                          <CCol md={12}>
                            <CFormInput
                              onChange={e => handleChange(e, e.target.value)}
                              feedback="Digite a descrição da alergia."
                              name="alergiaDescricao"
                              value={new Set(formData.alergiaDescricao)[0]}
                              type="text"
                              id="0"
                              label="Qual alergia?"
                              placeholder="Descreva a alergia"
                              required
                            />
                          </CCol>
                          <CButton color="secondary" className={classes.plusButton} onClick={addInputAlergia}>
                            +
                          </CButton>
                        </div>

                        {inputAlergiaList.map((_, index) => (
                          <div className={classes.inputButton}>

                            <CCol md={12}>
                              <CFormInput
                                onChange={e => handleChange(e, e.target.value)}
                                feedback="Digite a descrição da alergia."
                                name={`alergiaDescricao-${index}`}
                                value={new Set(formData.alergiaDescricao)[index + 1]}
                                type="text"
                                id={`${index + 1}`}
                                label="Qual alergia?"
                                placeholder="Descreva a alergia"
                                required
                              />
                            </CCol>
                            <CButton color="secondary" className={classes.plusButton} onClick={addInputAlergia}>
                              +
                            </CButton>
                          </div>

                        ))}

                      </>

                    )}
                  </CRow>


                  <CCol xs={12}>
                    <h5>Histórico Cirúrgico</h5>
                  </CCol>

                  <CRow>
                    <CCol md={4}>
                      <CFormSelect
                        type="text"
                        onChange={e => handleChange(e, e.target.value)}
                        name="cirurgia"
                        id="cirurgia"
                        label="Já fez alguma cirurgia?"
                        required
                      >
                        <option value={false} selected={true}>Selecione uma opção</option>
                        <option value={true}>Sim</option>
                        <option value={false}>Não</option>
                      </CFormSelect>
                    </CCol>
                    <CCol md={4}>
                      <CFormSelect
                        type="text"
                        onChange={e => handleChange(e, e.target.value)}
                        name="internado"
                        id="internado"
                        label="Já foi internado?"
                        required
                      >
                        <option value={false} selected={true}>Selecione uma opção</option>
                        <option value={true}>Sim</option>
                        <option value={false}>Não</option>
                      </CFormSelect>
                    </CCol>
                    <CCol md={4}>
                      <CFormSelect
                        type="text"
                        onChange={e => handleChange(e, e.target.value)}
                        name="tomaMedicamento"
                        id="tomaMedicamento"
                        label="Toma medicamento?"
                        required
                      >
                        <option value={false} selected={true}>Selecione uma opção</option>
                        <option value={true}>Sim</option>
                        <option value={false}>Não</option>
                      </CFormSelect>
                    </CCol>

                    {formData.cirurgia === 'true' && (
                      <>
                        <div className={classes.inputButton}>

                          <CCol md={8}>
                            <CFormInput
                              onChange={e => handleChange(e, e.target.value)}
                              feedback="Digite a descrição da cirurgia."
                              name="cirurgiaDescricao"
                              value={new Set(formData.cirurgiaDescricao)[0]}
                              type="text"
                              id="0"
                              label="Qual cirurgia?"
                              placeholder="Descreva a cirurgia"
                              required
                            />
                          </CCol>

                          <CCol md={4}>
                            <CFormInput
                              onChange={e => handleChange(e, e.target.value)}
                              feedback="Digite a data da cirurgia."
                              name="dataCirurgia"
                              value={new Set(formData.dataCirurgia)[0]}
                              type="date"
                              id="0"
                              label="Data da cirurgia"
                              required
                            />
                          </CCol>
                          <CButton color="secondary" className={classes.plusButton} onClick={addInputCirurgia}>
                            +
                          </CButton>
                        </div>

                        {inputCirurgiaList.map((_, index) => (
                          <div className={classes.inputButton}>
                            <CCol md={8}>
                              <CFormInput
                                onChange={e => handleChange(e, e.target.value)}
                                feedback="Digite a descrição da cirurgia."
                                name={`cirurgiaDescricao-${index}`}
                                value={new Set(formData.cirurgiaDescricao)[index + 1]}
                                type="text"
                                id={`${index + 1}`}
                                label="Qual cirurgia?"
                                placeholder="Descreva a cirurgia"
                                required
                              />
                            </CCol>

                            <CCol md={4}>
                              <CFormInput
                                onChange={e => handleChange(e, e.target.value)}
                                feedback="Digite a data da cirurgia."
                                name={`dataCirurgia-${index}`}
                                value={new Set(formData.dataCirurgia)[index + 1]}
                                type="date"
                                id={`${index + 1}`}
                                label="Data da cirurgia"
                                required
                              />
                            </CCol>
                            <CButton color="secondary" className={classes.plusButton} onClick={addInputCirurgia}>
                              +
                            </CButton>
                          </div>

                        ))}
                      </>
                    )}


                    {formData.internado === "true" && (
                      <>
                        <div className={classes.inputButton}>

                          <CRow>
                            <CCol md={6}>
                              <CFormInput
                                onChange={e => handleChange(e, e.target.value)}
                                feedback="Digite o motivo da internação."
                                name="motivoInternado"
                                value={new Set(formData.motivoInternado)[0]}
                                type="text"
                                id="0"
                                label="Motivo da internação"
                                placeholder="Descreva o motivo"
                                required
                              />
                            </CCol>
                            <CCol md={3}>
                              <CFormInput
                                onChange={e => handleChange(e, e.target.value)}
                                feedback="Digite a data de início da internação."
                                name="inicioInternado"
                                value={new Set(formData.inicioInternado)[0]}
                                type="date"
                                id="0"
                                label="Data de início"
                                required
                              />
                            </CCol>
                            <CCol md={3}>
                              <CFormInput
                                onChange={e => handleChange(e, e.target.value)}
                                feedback="Digite a data de fim da internação."
                                name="fimInternado"
                                value={new Set(formData.fimInternado)[0]}
                                type="date"
                                id="0"
                                label="Data de fim"
                                required
                              />
                            </CCol>
                          </CRow>
                          <CButton color="secondary" className={classes.plusButton} onClick={addInputInternadoList}>
                            +
                          </CButton>
                        </div>

                        {inputInternadoList.map((_, index) => (
                          <div className={classes.inputButton}>

                            <CRow>
                              <CCol md={6}>
                                <CFormInput
                                  onChange={e => handleChange(e, e.target.value)}
                                  feedback="Digite o motivo da internação."
                                  name="motivoInternado"
                                  value={new Set(formData.motivoInternado)[index + 1]}
                                  type="text"
                                  id={`${index + 1}`}
                                  label="Motivo da internação"
                                  placeholder="Descreva o motivo"
                                  required
                                />
                              </CCol>
                              <CCol md={3}>
                                <CFormInput
                                  onChange={e => handleChange(e, e.target.value)}
                                  feedback="Digite a data de início da internação."
                                  name="inicioInternado"
                                  value={new Set(formData.inicioInternado)[index + 1]}
                                  type="date"
                                  id={`${index + 1}`}
                                  label="Data de início"
                                  required
                                />
                              </CCol>
                              <CCol md={3}>
                                <CFormInput
                                  onChange={e => handleChange(e, e.target.value)}
                                  feedback="Digite a data de fim da internação."
                                  name="fimInternado"
                                  value={new Set(formData.fimInternado)[index + 1]}
                                  type="date"
                                  id={`${index + 1}`}
                                  label="Data de fim"
                                  required
                                />
                              </CCol>
                            </CRow>
                            <CButton color="secondary" className={classes.plusButton} onClick={addInputInternadoList}>
                              +
                            </CButton>
                          </div>

                        ))}
                      </>
                    )}

                    {formData.tomaMedicamento === "true" && (
                      <>
                        <CRow>
                          <CCol md={6}>
                            <CFormInput
                              onChange={e => handleChange(e, e.target.value)}
                              feedback="Digite o nome do medicamento."
                              name="nomeMedicamento"
                              value={new Set(formData.nomeMedicamento)[0]}
                              type="text"
                              id="0"
                              label="Nome do medicamento"
                              placeholder="Digite o nome"
                              required
                            />
                          </CCol>
                          <CCol md={3}>
                            <CFormInput
                              onChange={e => handleChange(e, e.target.value)}
                              feedback="Digite a frequência do medicamento."
                              name="frequenciaMed"
                              value={new Set(formData.frequenciaMed)[0]}
                              type="text"
                              id="0"
                              label="Frequência"
                              placeholder="Ex: 2x ao dia"
                              required
                            />
                          </CCol>
                          <CCol md={3}>
                            <CFormInput
                              onChange={e => handleChange(e, e.target.value)}
                              feedback="Digite a dosagem do medicamento."
                              name="dosagemMed"
                              value={new Set(formData.dosagemMed)[0]}
                              type="text"
                              id="0"
                              label="Dosagem"
                              placeholder="Ex: 500mg"
                              required
                            />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol md={11}>
                            <CFormInput
                              onChange={e => handleChange(e, e.target.value)}
                              feedback="Digite uma observação do tratamento, se necessário."
                              name="obsTratamento"
                              value={new Set(formData.obsTratamento)[0]}
                              type="text"
                              id="0"
                              label="Observação do Tratamento"
                              placeholder="Adicione observações extras"
                            />
                          </CCol>
                          <CCol md={1}>
                            <CButton color="secondary" className={classes.plusButton} onClick={addInputMedicamentoList}>
                              +
                            </CButton>
                          </CCol>
                        </CRow>
                        {inputMedicamentoList.map((_, index) => (
                          <div>

                            <CRow>
                              <CCol md={6}>
                                <CFormInput
                                  onChange={e => handleChange(e, e.target.value)}
                                  feedback="Digite o nome do medicamento."
                                  name="nomeMedicamento"
                                  value={new Set(formData.nomeMedicamento)[index + 1]}
                                  type="text"
                                  id={`${index + 1}`}
                                  label="Nome do medicamento"
                                  placeholder="Digite o nome"
                                  required
                                />
                              </CCol>
                              <CCol md={3}>
                                <CFormInput
                                  onChange={e => handleChange(e, e.target.value)}
                                  feedback="Digite a frequência do medicamento."
                                  name="frequenciaMed"
                                  value={new Set(formData.frequenciaMed)[index + 1]}
                                  type="text"
                                  id={`${index + 1}`}
                                  label="Frequência"
                                  placeholder="Ex: 2x ao dia"
                                  required
                                />
                              </CCol>
                              <CCol md={3}>
                                <CFormInput
                                  onChange={e => handleChange(e, e.target.value)}
                                  feedback="Digite a dosagem do medicamento."
                                  name="dosagemMed"
                                  value={new Set(formData.dosagemMed)[index + 1]}
                                  type="text"
                                  id={`${index + 1}`}
                                  label="Dosagem"
                                  placeholder="Ex: 500mg"
                                  required
                                />
                              </CCol>
                            </CRow>
                            <CRow>
                              <CCol md={11}>
                                <CFormInput
                                  onChange={e => handleChange(e, e.target.value)}
                                  feedback="Digite uma observação do tratamento, se necessário."
                                  name="obsTratamento"
                                  value={new Set(formData.obsTratamento)[index + 1]}
                                  type="text"
                                  id={`${index + 1}`}
                                  label="Observação do Tratamento"
                                  placeholder="Adicione observações extras"
                                />
                              </CCol>
                              <CCol md={1}>
                                <CButton color="secondary" className={classes.plusButton} onClick={addInputMedicamentoList}>
                                  +
                                </CButton>
                              </CCol>

                            </CRow>
                          </div>

                        ))}

                      </>
                    )}
                  </CRow>
                </>
              )}

              {steps[currentStep].id === 'DADOSSAUDE' && (
                <>


                  <CCol xs={12}>
                    <h5>Dados de Saúde e Condição Física</h5>
                  </CCol>

                  <CCol md={4}>
                    <CFormInput
                      onChange={e => handleChange(e, e.target.value)}
                      feedback="Digite o seu peso em kg."
                      name="peso"
                      value={formData.peso || ''}
                      type="text"
                      id="peso"
                      label="Peso (kg)"
                      placeholder="Ex: 70.5"
                      required
                    />
                  </CCol>

                  <CCol md={4}>
                    <CFormInput
                      onChange={e => handleChange(e, e.target.value)}
                      feedback="Digite a sua altura em metros."
                      name="altura"
                      value={formData.altura || ''}
                      type="text"
                      id="altura"
                      label="Altura (m)"
                      placeholder="Ex: 1.75"
                      required
                    />
                  </CCol>

                  <CCol md={4}>
                    <CFormInput
                      onChange={e => handleChange(e, e.target.value)}
                      feedback="Digite o IMC."
                      name="imc"
                      value={imc}
                      type="text"
                      id="imc"
                      label="Indice de Massa Corporal (IMC)"
                      placeholder="Ex: 22.5"
                      required
                    />
                  </CCol>

                  <CCol md={4}>
                    <CFormInput
                      onChange={e => handleChange(e, e.target.value)}
                      feedback="Digite a pressão arterial média."
                      name="pressaoArterial"
                      value={formData.pressaoArterial || ''}
                      type="text"
                      id="pressaoArterial"
                      label="Pressão Arterial Média (mmHg)"
                      placeholder="Ex: 120/80"
                      required
                    />
                  </CCol>

                  <CCol md={8}>
                    <CFormSelect
                      onChange={e => handleChange(e, e.target.value)}
                      name="condFisica"
                      id="condFisica"
                      label="Condição Física Geral"
                      required
                    >
                      {
                        // TODO opção padrao nao precisa de um value 
                      }
                      <option value="" selected={true}>Selecione a condição física</option>
                      <option value="sedentario">Sedentário</option>
                      <option value="ativo">Ativo</option>
                      <option value="praticante_esportes">Praticante de Esportes</option>
                      <option value="atleta">Atleta</option>
                    </CFormSelect>
                  </CCol>

                  <CCol xs={12}>
                    <h5>Plano de Saúde</h5>
                  </CCol>

                  <CRow>
                    <CCol md={12}>
                      <CFormSelect
                        type="text"

                        onChange={e => handleChange(e, e.target.value)}
                        name="planoSaude"
                        id="planoSaude"
                        label="Possui plano de saúde?"
                        required
                      >
                        <option value={false} selected={true}>Selecione uma opção</option>
                        <option value={true}>Sim</option>
                        <option value={false}>Não</option>
                      </CFormSelect>
                    </CCol>

                    {formData.planoSaude === "true" && (
                      <>
                        <CRow>
                          <CCol md={4}>
                            <CFormInput
                              onChange={e => handleChange(e, e.target.value)}
                              feedback="Digite o nome do plano de saúde."
                              name="nomePlano"
                              value={formData.nomePlano || ''}
                              type="text"
                              id="nomePlano"
                              label="Nome do Plano"
                              placeholder="Digite o nome do plano"
                              required
                            />
                          </CCol>
                          <CCol md={4}>
                            <CFormInput
                              onChange={e => handleChange(e, e.target.value)}
                              feedback="Digite o número do cartão do plano."
                              name="numeroCartao"
                              value={formData.numeroCartao || ''}
                              type="text"
                              id="numeroCartao"
                              label="Número do Cartão"
                              placeholder="Digite o número do cartão"
                              required
                            />
                          </CCol>
                          <CCol md={4}>
                            <CFormInput
                              onChange={e => handleChange(e, e.target.value)}
                              feedback="Digite o hospital de preferência."
                              name="hospital"
                              value={formData.hospital || ''}
                              type="text"
                              id="hospital"
                              label="Hospital de Preferência"
                              placeholder="Digite o hospital preferido"
                              required
                            />
                          </CCol>
                        </CRow>
                      </>
                    )}
                  </CRow>

                  <CCol xs={12}>
                    <h5>Informações Complementares de Saúde</h5>
                  </CCol>

                  <CCol md={8}>
                    <CFormInput
                      onChange={e => handleChange(e, e.target.value)}
                      feedback="Digite informações médicas adicionais, se necessário."
                      name="observacaoMed"
                      value={formData.observacaoMed || ''}
                      type="text"
                      id="observacaoMed"
                      label="Observação Médica"
                      placeholder="Adicione qualquer observação ou recomendação médica extra"
                    />
                  </CCol>

                  <CCol md={4}>
                    <CFormInput
                      onChange={e => handleChange(e, e.target.value)}
                      feedback="Selecione a data da última revisão médica."
                      name="ultimaRevisaoMed"
                      value={formData.ultimaRevisaoMed || ''}
                      type="date"
                      id="ultimaRevisaoMed"
                      label="Última Revisão Médica"
                      placeholder="Selecione a data"
                      required
                    />
                  </CCol>


                </>
              )}
              {steps[currentStep].id === 'DADOSMACOM' && (
                <>
                  <CCol xs={12}>
                    <h5>Dados de Login do Maçom</h5>
                  </CCol>

                  <CCol md={12}>
                    <CFormInput
                      onChange={e => handleChange(e, e.target.value)}
                      feedback="Digite seu ID Maçom."
                      name="idMacom"
                      value={formData.idMacom || ''}
                      type="text"
                      id="idMacom"
                      label="ID Maçom"
                      required
                    />
                  </CCol>
                  <CCol md={12}>
                    <CFormInput
                      onChange={e => handleChange(e, e.target.value)}
                      feedback="Digite seu E-mail."
                      name="email"
                      value={formData.email || ''}
                      type="text"
                      id="email"
                      label="Email"
               
                      required
                    />
                  </CCol>

                  <CCol md={12}>
                    <CFormInput
                      onChange={e => handleChange(e, e.target.value)}
                      feedback="Digite a sua senha."
                      name="senha"
                      value={formData.senha || ''}
                      type="password"
                      id="senha"
                      label="Senha"
                      required
                    />
                  </CCol>



                </>
              )}
              <CCol xs={12}>
                {currentStep < steps.length - 1 && (
                  <div className={classes.buttons}>
                    {currentStep !== 0 && (
                      <CButton onClick={e => handlePreviousStep(e)} className={classes.cadastrarButton} color="secondary" type="submit">Anterior</CButton>
                    )}
                    <CButton onClick={e => handleNextStep(e)} className={classes.cadastrarButton} color="secondary" type="submit">Próximo</CButton>
                  </div>
                )}

                {currentStep === steps.length - 1 && (
                  <div className={classes.buttons}>
                    <CButton onClick={e => handlePreviousStep(e)} className={classes.cadastrarButton} color="secondary" type="submit">Anterior</CButton>
                    <CButton onClick={e => callCadastro(e)} className={classes.cadastrarButton} color="secondary" type="submit">Cadastrar</CButton>
                  </div>
                )}
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
