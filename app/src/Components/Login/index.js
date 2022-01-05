import {React, useState} from 'react';
import * as S from './styles'
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage} from 'formik'
import * as yup from 'yup';
import Logo from '../../Assets/Logo.png'
import api from '../../api/api'
import swal from 'sweetalert2'



export default function Login() {
    const [uc_login, setUsername] = useState('');
    const [uc_password, setPassword] = useState('');    
    const history = useHistory();

    async function handleSubmit() {
        const response = await api.post('/usuarios/login', {
            uc_login,
            uc_password
        });
        if(response.status === 200){
            localStorage.setItem('token', response.data.token);
            history.push('/home/dashboard');
        }else if (response.status === 401){
           swal.fire({
                title: 'Erro',
                text: 'Usuário ou senha inválidos',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    const validationLogin = yup.object().shape({
        uc_login: yup
        .string()
        .required("Campo obrigatório."),
        uc_password: yup
        .string()
        .min(8, "A Senha deve ter no mínimo 8 caractéres")
        .required("Campo obrigatório."),

    })

    
    return (
        <S.Container>
            <Formik
                    initialValues={{}}
                    onSubmit={handleSubmit}
                    validationSchema={validationLogin}>
                <Form>
                    <S.Login>
                        <img src={Logo} alt="Logo do Sistema Lucky"/>
                        <Field 
                            name="username"
                            className="input-field"
                            placeholder="Usuário"
                            onChange={e => setUsername(e.target.value)}
                            value={uc_login}
                            />
                            
                        <ErrorMessage
                            component="span"
                            name="username"
                            className="span-error"/>
                        <Field 
                            name="password"
                            type="password"
                            className="input-field"
                            placeholder="Senha"
                            value={uc_password}
                            onChange={e => setPassword(e.target.value)}/>
                        <ErrorMessage
                            component="span"
                            name="password"
                            className="span-error"/>  
                        <S.ContainerButtons>
                        <button className="btn-login" type="submit" onClick={handleSubmit}>
                            Entrar
                        </button>
                        <button className="btn-create-account" type="submit">
                            Criar Conta
                        </button>
                        </S.ContainerButtons>
                        <a href='/'>Esqueci minha senha.</a>
                        
                    </S.Login>
                </Form>
            </Formik>
        </S.Container>
    )
}