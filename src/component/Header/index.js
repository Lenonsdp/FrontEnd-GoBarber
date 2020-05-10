import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logoPurple.svg';
import { Container, Content, Profile } from './styles';
import Notifications from '../Notifications';

function Header() {
    return (
        <Container>
            <Content>
                <nav>
                    <img src={logo} alt="Logo" />
                    <Link to="/dashboard">Dashboard</Link>
                </nav>
                <aside>
                    <Notifications />
                    <Profile>
                        <div>
                            <strong>Lenon Szynweslki</strong>
                            <Link to="/profile">Meu perfil</Link>
                        </div>
                        <img
                            src="https://api.adorable.io/avatars/50/abott@adorable.png"
                            alt="Lenon"
                        />
                    </Profile>
                </aside>
            </Content>
        </Container>
    );
}

export default Header;
