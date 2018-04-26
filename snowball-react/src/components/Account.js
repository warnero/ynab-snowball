import React from 'react';
import { Formik, withFormik, Form, Field } from 'formik';
import Yup from 'yup';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

const AccountForm = props => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleDayChange,
        setFieldValue,
        setFieldTouched,
        isSubmitting
    } = props;

    return (
        <Form className={'ui form' + (errors ? ' error' : '')}>
            {touched.name && errors.name && <div className="ui error message">{errors.name}</div>}
            <div className={'field' + (errors.name ? ' error' : '')}>
                <label className="label">Account Name</label>
                <Field type="text" name="name" placeholder="Account Name" />
            </div>
            <div className={'ui checkbox'  + (values.includeInSnowball ? ' checked' : '')}>

                <Field checked={values.includeInSnowball} type="checkbox" name="includeInSnowball"/>
                <label>Include in Snowball</label>
            </div>
            <div className={'field' + (errors.type ? ' error' : '')}>
                <label className="label">Account Type</label>
                <Field type="text" name="type" placeholder="Account Type" />
            </div>
            <div className={'field' + (errors.expiration ? ' error' : '')}>
                <label className="label">Expiration Date</label>
                <DayPickerInput
                    onDayChange={(day) => setFieldValue('expiration', day)}
                    name="expiration"
                    value={`${formatDate(values.expiration)}`}
                    formatDate={formatDate}
                    parseDate={parseDate}
                    placeholder={`${formatDate(new Date())}`}
                />
            </div>
            <div className={'field' + (errors.percentageRate ? ' error' : '')}>
                <label className="label">Percentage Rate</label>
                <Field type="text" name="percentageRate" placeholder="10.99" />
            </div>
            <div className={'field' + (errors.website ? ' error' : '')}>
                <label className="label">Website</label>
                <Field type="text" name="website" placeholder="www.mycreditcard.com" />
            </div>
            <div className={'field' + (errors.lastFour ? ' error' : '')}>
                <label className="label">Last Four Digits of Account</label>
                <Field type="text" name="lastFour" placeholder="4444" />
            </div>
            <div className={'field' + (errors.creditLimit ? ' error' : '')}>
                <label className="label">Credit Limit</label>
                <Field type="text" name="creditLimit" placeholder="1500" />
            </div>
            <div className={'field' + (errors.availableCredit ? ' error' : '')}>
                <label className="label">Available Credit</label>
                <Field type="text" name="availableCredit" placeholder="200" />
            </div>
            <div className={'ui dropdown field' + (errors.paymentDueDate ? ' error' : '')}>
                <label className="label">Day of Payment</label>

                <Field type="text" name="paymentDueDate" placeholder="1/1/2018" />
            </div>
            <div className={'field' + (errors.nextPaymentDueDate ? ' error' : '')}>
                <label className="label">Next Payment Date</label>
                <Field type="text" name="nextPaymentDueDate" placeholder="1/1/2018" />
            </div>
            <div className={'field' + (errors.startingBalance ? ' error' : '')}>
                <label className="label">Starting Balance</label>
                <Field type="text" name="startingBalance" placeholder="100.00" />
            </div>
            <div className={'field' + (errors.startingBalanceDate ? ' error' : '')}>
                <label className="label">Starting Balance Date</label>
                <DayPickerInput
                    onDayChange={(day) => setFieldValue('startingBalanceDate', day)}
                    name="startingBalanceDate"
                    value={`${formatDate(values.startingBalanceDate)}`}
                    formatDate={formatDate}
                    parseDate={parseDate}
                    placeholder={`${formatDate(new Date())}`}
                />
            </div>
            <div className={'field' + (errors.lastSynced ? ' error' : '')}>
                <label className="label">Account Last Synced</label>
                <Field type="text" name="lastSynced" placeholder="1/1/2018" disabled={'true'} />
            </div>
            <button className="ui button" disabled={isSubmitting}>Submit</button>

            <DisplayFormikState {...props} />
        </Form>
    )
};

const DisplayFormikState = props =>
    <div style={{ margin: '1rem 0', background: '#f6f8fa', padding: '.5rem' }}>
        <strong>Injected Formik props (the form's state)</strong>
        <div>
            <code>status:</code> {JSON.stringify(props.status, null, 2)}
        </div>
        <div>
            <code>errors:</code> {JSON.stringify(props.errors, null, 2)}
        </div>
        <div>
            <code>values:</code> {JSON.stringify(props.values, null, 2)}
        </div>
        <div>
            <code>isSubmitting:</code> {JSON.stringify(props.isSubmitting, null, 2)}
        </div>
    </div>;

const EnhancedAccountForm = withFormik({
    mapPropsToValues({mappedAccountState}) {
        return mappedAccountState.account
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required!')
    }),
    handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
        setTimeout(() => {
            console.log('submitted form values ', JSON.stringify(values));
            props.mappedUpdateAccount(values);
            setSubmitting(false)
        }, 2000)
    }
})(AccountForm);

export default class Account extends React.Component {
    componentDidMount(){
        this.props.mappedfetchAccountById(this.props.match.params.id);
    }

    handleDayChange = day => {
        console.log('new day is', day);
    }

    render(){
        const accountState = this.props.mappedAccountState;
        const acct = accountState.account;
        return(
            <div className="accountDetail">
                <h2>Edit Account</h2>
                {acct === null && accountState.isFetching &&
                <div>
                    <p>Loading account....</p>
                </div>
                }
                {acct !== null &&
                <EnhancedAccountForm handleDayChange={this.handleDayChange} {...this.props}/>
                }
            </div>
        );
    }
}