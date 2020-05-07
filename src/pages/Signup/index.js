import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { signUpRequest } from '../store/modules/auth/actions';
import Logo from '../../assets/logo.svg';

const schema = Yup.object().shape({
    name: Yup.string().required('Insira a senha'),
    email: Yup.string()
        .email('Insira um e-mail valido')
        .required('O e-mail é obrigatório'),
    password: Yup.string().required('Insira a senha'),
});

export default function SignUp() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);

    function handleSubmit({ name, email, password }) {
        dispatch(signUpRequest(name, email, password));
    }

    return (
        <>
            <img src={Logo} alt="Logo" />
            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="name" placeholder="Nome compĺeto" />
                <Input name="email" type="email" placeholder="Seu e-mail" />
                <Input name="password" type="password" placeholder="Sua senha secreta" />

                <button type="submit">{ loading ? "Carregando..." : "Cadastrar"}</button>
                <Link to="/">Já tenho Login</Link>
            </Form>
        </>
    );
}
