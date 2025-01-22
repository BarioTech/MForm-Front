import api from "../../hooks/api";

import React, { useState, useEffect } from "react";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { cilCloudDownload } from '@coreui/icons';
import { useNavigate } from "react-router-dom";
import { useStyles } from './styles';
import CIcon from '@coreui/icons-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';

export default function Dashboard() {
    const navigate = useNavigate();
    const classes = useStyles();
    const [alunos, setAlunos] = useState(false);
    const [alunosBkp, setAlunosBkp] = useState(false);

    const pullAlunos = async () => {
        await api.get("/usuarios/listarUsuarios")
            .then(rs => {
                setAlunos(rs.data);
                setAlunosBkp(rs.data);
            })
            .catch(() => console.log("Erro ao puxar alunos!"));
    };

    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('auth');
        navigate("/");
    };

    const downloadRelatorio = async () => {
        try {
            const response = await api.post(
                "/usuarios/obterRelatorio",
                { alunos },
                {
                    responseType: "blob", 
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "relatorio.xlsx"); // Nome do arquivo
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Erro ao baixar o relatório:", error);
        }
    };

    useEffect(() => {
        pullAlunos();
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Button href="/" color="primary" variant="outlined" className={classes.link}>
                        Home
                    </Button>
                    <Button onClick={() => logOut()} color="primary" variant="outlined" className={classes.link}>
                        Log Out
                    </Button>
                </Toolbar>
            </AppBar>
            <Container component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" fontFamily="Courier New" className={classes.titleGD} gutterBottom>
                    MForm
                </Typography>
            </Container>
            <div className={classes.tabelaContainer}>
            <Container  component="main">
                <MDBTable>
                    <MDBTableHead className={classes.tabela}>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Nome</th>
                            <th scope='col'>CPF</th>
                            <th scope='col'>Telefone</th>
                            <th scope='col'>Data de Nascimento</th>
                            <th scope='col'>Altura</th>
                            <th scope='col'>Pressão</th>
                            <th scope='col'>Internação</th>
                            <th scope='col'>Doença</th>
                            <th scope='col'>Alergias</th>
                            <th scope='col'></th>
                            <th scope='col'></th>
                            <th scope='col'>
                                <Button onClick={downloadRelatorio}>
                                    <CIcon className={classes.icone} icon={cilCloudDownload} title="Download file" />
                                </Button>
                            </th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {alunos ? alunos.map((aluno, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{aluno.nome}</td>
                                <td>{aluno.cpf}</td>
                                <td>{aluno.telefone}</td>
                                <td>{moment(aluno.dataNasc).format('DD/MM/YYYY')}</td>
                                <td>{aluno.altura}</td>
                                <td>{aluno.pressaoArterial}</td>
                                <td>{aluno.internacao.map(internacao => (
                                    <>
                                        <li>{internacao.motivoInternado}</li>
                                        De: {moment(internacao.inicioInternado).format('DD/MM/YYYY')}<br />
                                        Até: {moment(internacao.fimInternado).format('DD/MM/YYYY')}<br />
                                        <b>________________</b>
                                    </>
                                ))}</td>
                                <td>{aluno.doenca.map(doenca => <li>{doenca}</li>)}</td>
                                <td>{aluno.alergia.map(alergia => <li>{alergia}</li>)}</td>
                                <td><button onClick={() => navigate(`/editar-usuario`, { state: { aluno } })} className="btn btn-primary">Editar</button></td>
                                <td><button onClick={() => console.log("Deletar Usuario", aluno)} className="btn btn-danger">Excluir</button></td>
                                <td></td>
                            </tr>
                        )) : ''}
                    </MDBTableBody>
                </MDBTable>
            </Container>
                </div>
        </React.Fragment>
    );
}
