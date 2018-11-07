import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends React.Component {
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password })
    }

    renderError() {
        if(this.props.error) {
            return (
                <View style={{ backgroundColor: 'white'}}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
    }
    renderButton() {
        if(this.props.loading) {
            return <Spinner />;       
        }else {
            return (
                <Button onPress={this.onButtonPress.bind(this)}>
                    Login
                </Button>
            );
        }
     
    }

    render () {
        return (
            <Card>
                <CardSection>
                    <Input
                    label="Email"
                    placeholder="email@gmail.com"
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input 
                    secureTextEntry
                    label="Password"
                    placeholder="password"
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                    />
                </CardSection>
                
                {this.renderError()}

                <CardSection>
                    {this.renderButton()}
                </CardSection>

                

            </Card>
        );
    }
}

const mapStateToProps = ({ auth }) => {
   const { email, password, error, loading } = auth;

   return { email, password, error, loading };
};

export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser})(LoginForm);

const styles = {
    errorTextStyle : {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
}