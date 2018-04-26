import React from 'react';
import {Formik} from 'formik';

export const semanticFormik = ({mapPropsToValues,...props}) => WrappedComponent => {
    let pristineValues;
    const keepPristineValues = (p) => {
        pristineValues = mapPropsToValues(p);
        return pristineValues;
    };

    class Bridge extends React.Component{
        handleBlur(event,data){
            this.setValue(data);
        }

        handleChange(event,data){
            this.setValue(data);
        }

        setValue(data){
            if(data.name){
                this.props.setFieldValue(data.name,data.value);
                this.props.setFieldTouched(data.name,!this.isPristineValue(data.name,data.value));
            }
        }

        isPristineValue (fieldName,value){
            if(pristineValues[fieldName] === undefined){
                return value === '' || value === null || value === undefined;
            }
            return pristineValues[fieldName] === value;
        }

        render(){
            const {handleChange,handleBlur,...props} = this.props;
            return <WrappedComponent
                handleChange={this.handleChange.bind(this)}
                handleBlur={this.handleBlur.bind(this)}
                {...props}
            />;
        }
    }
    return Formik({mapPropsToValues:keepPristineValues,...props})(Bridge);
};