import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import Logo from '../../assets/logo.svg';

const schema = Yup.object().shape({
    name: Yup.string().required('Insira a senha'),
    email: Yup.string()
        .email('Insira um e-mail valido')
        .required('O e-mail é obrigatório'),
    password: Yup.string().required('Insira a senha')
});

export default function SignUp() {

    function handleSubmit(data) {
        console.tron.log(data);
    }

    return (
        <>
            <img src={Logo} alt="Logo" />
            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="name" placeholder="Nome compĺeto" />
                <Input name="email" type="email" placeholder="Seu e-mail" />
                <Input name="password" type="password" placeholder="Sua senha secreta" />

                <button type="submit">Acessar</button>
                <Link to="/">Já tenho Login</Link>
            </Form>
        </>
    );
}
