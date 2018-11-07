import _ from 'lodash';
import React, { Component } from 'react';
import { Modal } from 'react-native';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
    state = { showConfirm: false};

    componentWillMount() {
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value });
        })
    }

    onButtonPress() {
        const { name, phone, shift } = this.props;

        this.props.employeeSave({ name, phone, shift: shift || 'Monday', uid: this.props.employee.uid });
    }

    onTextPress() {
        const { phone, shift } = this.props;

        Communications.text(phone, `Your upcoming shift is on ${shift}`);
    }

    onAccept() {
        const { uid } =  this.props.employee; 
        this.props.employeeDelete({ uid });
        this.setState({showConfirm: false});
    }

    onDecline() {
        this.setState({showConfirm: false});
    }

    render() {
        return (
            <Card>
                <EmployeeForm {...this.props} />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
                    <Button onPress={this.onTextPress.bind(this)}>
                        Text Schedule
                    </Button>
                </CardSection>
                <CardSection>
                    <Button 
                    onPress={() => {this.setState({showConfirm: true})}}
                    color ={'#ff0000'}
                    >
                        Fire Employee
                    </Button>
                </CardSection>
                
                <Confirm 
                visible={this.state.showConfirm} 
                onAccept={this.onAccept.bind(this)}
                onDecline={this.onDecline.bind(this)}>
                    Are you sure you want to delete this employee?
                </Confirm>
            </Card>
        );
    }
}

const styles = {
    pickerTextStyle: {
        fontSize: 20,
        paddingLeft: 20,
    }
}


const mapStateToProps = state => {
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift };
}

export default connect(mapStateToProps, { employeeUpdate, employeeSave, employeeDelete })(EmployeeEdit);