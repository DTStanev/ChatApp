import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Register from './components/Account/Register';
import ChatRoom from './components/Chat/ChatRoom';
import Login from './components/Account/Login';
import Profile from './components/Account/Profile';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/fetch-data' component={FetchData} />
                    <Route path='/register' component={Register} />
                    <Route path='/chat-room' exact component={ChatRoom} />
                    <Route path='/login' exact component={Login} />
                    <Route path='/profile' exact component={Profile} />
                </Switch>
            </Layout>
        );
    }
}
