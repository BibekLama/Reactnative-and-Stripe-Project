import React,{Component} from 'react'
import {StyleSheet, View, Text, TextInput,Picker, Button, ScrollView,ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'

//Components
import Header from '../components/Header'

import {checkUser,insertUser,createAccount} from '../actions/accountActions';

class RegisterScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: "",
            country: "US"
        }
    }

    componentWillMount(){
        this.checkAccount();
    }

    checkAccount = () => {
        this.props.dispatch(checkUser())
        .then(() => {
            // alert(this.props.users.length)
            if(this.props.users.length > 0){
                // alert("not null");
                this.props.navigation.navigate("Main")
            }
        })  
    }

    handleRegister = () => {
        if(this.state.email !== "" && this.state.country !== ""){
            // alert("clicked")
            this.props.dispatch(createAccount({type:'custom', country: this.state.country, email: this.state.email}))
            .then(() =>{
                
                const{ account } = this.props
                if(account.id !== undefined){
                    const data = {
                        id: account.id,
                        sk: account.keys.secret,
                        country: account.country,
                        balance: 0
                    }
                    this.props.dispatch(insertUser(data))
                    this.checkAccount()  
                }
            })          
        }
    }

   
    render(){
        const {inProgress, isError, users, error, account} = this.props
        // alert(JSON.stringify(this.props));
        return(
            <View style={styles.container}>
                <Header headerTitle="Register" />
                <ScrollView 
                    contentContainerStyle={styles.contentWrap}
                    style={{width:'100%'}}
                    keyboardDismissMode="on-drag"
                    >
                    <Text style={styles.contentTitle}>Register your stripe account here.</Text>
                    <TextInput
                        placeholder="Email"
                        value= {this.state.email}
                        onChangeText={(email) => this.setState({email})}
                        style={styles.input}
                    />

                    <Picker
                        selectedValue={this.state.country}
                        style={styles.selectInput}
                        onValueChange={(itemValue, itemIndex) => this.setState({country: itemValue})}>
                        <Picker.Item label="United State" value="US" />
                        <Picker.Item label="Nepal" value="NP" />
                    </Picker>

                    <Button title="REGISTER" style={{marginBottom:15}} onPress={this.handleRegister}/>

                    {inProgress && 
                        <ActivityIndicator size="small" color="#333" style={{marginTop:15}} />
                    }

                    {isError && 
                        <Text style={{marginTop:15}}>ERROR => {JSON.stringify(error)}</Text>
                    }

                    {users.length > 0 && 
                        <Text style={{marginTop:15}}>{JSON.stringify(users)}</Text>
                    }

                    {account.length > 0 && <Text style={{marginTop:15}}>{JSON.stringify(account)}</Text>}

                </ScrollView>    
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state,
        users: state.Account.users,
        error: state.Account.error,
        inProgress: state.Account.inProgress,
        isError: state.Account.isError,
        account: state.Account.account
    }
}


export default connect(mapStateToProps)(RegisterScreen)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexGrow:1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: '#FFFFFF',
    },
    contentWrap:{
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding:16,
        width:'100%',
    },
    contentTitle:{
        width:'100%',
        marginBottom:24
    },
    input:{
        width:'100%',
        fontSize:16,
        marginBottom:20,
    },
    selectInput:{
        width:'100%',
        height:50,
        marginBottom:20
    }
})