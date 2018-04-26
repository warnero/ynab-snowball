import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SideNavigation from './containers/SideNavigation';
import Accounts from './containers/Accounts';
import Account from './containers/Account';
import {Header, Segment, Sidebar} from "semantic-ui-react";
export default (
    <BrowserRouter>
        <div>
            <Sidebar.Pushable as={Segment}>
                <SideNavigation/>
                <Sidebar.Pusher>
                    <Segment basic>
                        <Switch>
                            <Route exact path="/" component={Accounts} />
                            <Route exact path="/accounts" component={Accounts} />
                            <Route exact path="/accounts/:id" component={Account} />
                        </Switch>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    </BrowserRouter>
)