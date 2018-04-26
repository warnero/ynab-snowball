import React from 'react';
import { Sidebar, Segment, Menu, Image, Icon, Header } from 'semantic-ui-react';
import { NavLink } from "react-router-dom";

export default class SideNavigation extends React.Component {
    render() {
        const visible = true;
        return (
            <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical inverted>
                <Menu.Item as={NavLink} to='/' name='dashboard'>
                    <Icon name='calendar outline' />
                    Dashboard
                </Menu.Item>
                <Menu.Item as={NavLink} to='/accounts' name='accounts'>
                    <Icon name='bars' />
                    Accounts
                </Menu.Item>
                <Menu.Item name='payoff'>
                    <Icon name='chart bar' />
                    Payoff Plan
                </Menu.Item>
            </Sidebar>
        )
    }
}