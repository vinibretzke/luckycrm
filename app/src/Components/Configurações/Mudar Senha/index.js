import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as S from './styles'
import Navbar from '../../../Utils/Sidebar'
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import swal from "sweetalert2";
import api from '../../../api/api'





export default function MudarSenha() {

    const [uc_nome, setUc_nome] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [uc_cod, setUc_cod] = useState('');
    const history = useHistory();

    async function handleSubmit() {
        api.patch('/usuarios/alterar-usuario', {
            uc_nome: uc_nome,
            uc_password: newPassword,
            uc_cod: localStorage.getItem('user_id')
        }).then(response => {
            swal.fire({
                title: 'Sucesso',
                text: 'Senha alterada com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK'
            })
            console.log(uc_cod)
            history.push('/home/dashboard');
        }).catch(error => {
            swal.fire({
                title: 'Oops...',
                text: 'Login ou senha incorretos!',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        });

    }



    const validationLogin = yup.object().shape({
        oldPassword: yup
            .string()
            .required("Campo obrigatório."),
        newPassword: yup
            .string()
            .min(8, "A Senha deve ter no mínimo 8 caractéres")
            .required("Campo obrigatório."),
        confirmPassword: yup
            .string()
            .oneOf([newPassword], "As senhas não conferem")
            .required("Campo obrigatório."),
    })


    return (
        <S.Container>
            <Navbar />
            <S.SenhaContainer>
                <Formik
                    initialValues={{}}
                    onSubmit={handleSubmit}
                    validationSchema={validationLogin}>
                    <Form>

                        <Field
                            name="senhaAtual"
                            className="input-field"
                            placeholder="Senha Atual"
                        />

                        <ErrorMessage
                            component="span"
                            name="senhaAtual"
                            className="span-error" />
                        <Field
                            name="novaSenha"
                            type="text"
                            className="input-field"
                            placeholder="Nova Senha" />
                        <ErrorMessage
                            component="span"
                            name="password"
                            className="span-error" />
                        <Field
                            name="confirmarSenha"
                            type="text"
                            className="input-field"
                            placeholder="Confirme a nova senha" />
                        <ErrorMessage
                            component="span"
                            name="password"
                            className="span-error" />
                        <button className="btn-login" type="submit" onClick={handleSubmit} >
                            Entrar
                        </button>
                    </Form>
                </Formik>
            </S.SenhaContainer>
        </S.Container>
    )
}
