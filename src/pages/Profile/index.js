import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { Container } from './styles';
import { signOut } from '../store/modules/auth/actions';
import { updateProfileRequest } from '../store/modules/user/actions';
import Avatar from './AvatarInput/index';
import { signIn } from '../store/modules/auth/sagas';

export default function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);


    function handleSubmit(data) {
        dispatch(updateProfileRequest(data));
    }

    function handleSignOut() {
        dispatch(signOut());
    }
    return (
        <Container>
            <Form initialData={profile} onSubmit={handleSubmit}>
                <Avatar name="avatar_id" />
                <Input name="name" placeholder="Nome completo" />
                <Input name="email" type="email" placeholder="Seu endereço de e-mail" />
                <hr />

                <Input name="oldPassword" type="password" placeholder="Sua senha atual" />
                <Input name="password" type="password" placeholder="Sua nova senha" />
                <Input name="confirmPassword" type="password" placeholder="Confirmação de senha" />
                <button type="submit">Atualizar perfil</button>
            </Form>
            <button type="button" onClick={handleSignOut}>Sair do Gobarber</button>
        </Container>
    );
}
