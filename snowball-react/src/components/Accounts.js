import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Accounts extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.fetchAccounts();
    }

    showEditModal(accountToEdit){
        //this.props.mappedshowEditModal(accountToEdit);
    }

    hideEditModal(){
        //this.props.mappedhideEditModal();
    }

    hideDeleteModal(){
        //this.props.mappedhideDeleteModal();
    }

    showDeleteModal(accountToDelete){
        //this.props.mappedshowDeleteModal(accountToDelete);
    }

    render() {
        const accountState = this.props.mappedAccountState;
        const accounts = accountState.accounts;
        let accountList = accounts.map(function(acct) {
            return (
                <Table.Row key={acct._id}>
                    <Table.Cell><Link to={`/accounts/${acct._id}`}>{acct.name}</Link></Table.Cell>
                    <Table.Cell>{acct.includeInSnowball ? "Yes" : "No"}</Table.Cell>
                    <Table.Cell>{-1 * acct.startingBalance / 1000}</Table.Cell>
                    <Table.Cell>{acct.creditLimit}</Table.Cell>
                    <Table.Cell>{acct.percentageRate}</Table.Cell>
                </Table.Row>
            )
        });

        return(
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Include?</Table.HeaderCell>
                        <Table.HeaderCell>Balance</Table.HeaderCell>
                        <Table.HeaderCell>Credit Limit</Table.HeaderCell>
                        <Table.HeaderCell>Interest Rate</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { accountList }
                </Table.Body>
            </Table>
        )
    }
}