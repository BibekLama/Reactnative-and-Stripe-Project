import React, {PureComponent} from 'react'
import {StyleSheet, View, Text, FlatList, RefreshControl,Modal,BackHandler,TextInput,Button} from 'react-native'
import {connect} from 'react-redux'

import Header from '../components/Header'

import {getAccounts,getReceiver} from '../actions/accountActions'
import AccountItem from '../components/AccountItem'
import { doTransfer } from '../actions/transferActions';


class AccountsScreen extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            user: {},
            modalVisible: false,
            amount: "0"
        }
        this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    componentWillMount(){
        // alert(JSON.stringify(this.props.users))
        this.setState({
            user: this.props.users[0]
        },() => {
            // alert(this.state.user.sk)
            this.props.dispatch(getAccounts())
        })   
    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    onBackButtonPressAndroid = () => {
        if(this.state.modalVisible){
            this.setModalVisible(false)
        }else{
            return false;
        }
    };

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }


    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id) => {
        // alert(id);
        this.props.dispatch(getReceiver(id))
        .then(()=>{
            this.setModalVisible(true)
        }) 
    };

    _renderItem = ({item}) => {
        if(item.id !== this.state.user.id){
            return (
                <AccountItem
                id={item.id}
                onPressItem={this._onPressItem}
                item={item}
                />
            )
        }
    };

    _emptyList = () => (
        <View style={styles.emptyItem}>
            <Text> No Accounts </Text>
        </View>
    );

    _onRefresh = () => {
        this.props.dispatch(getAccounts())
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

    handleTransfer = () => {
        if(this.state.amount !== ""){
            this.props.dispatch(doTransfer({amount:this.state.amount,receiverID:this.props.receiver.id}))
            .then(()=>{
                this.setModalVisible(false)
                if(this.props.error){
                    alert(JSON.stringify(this.props.error))
                }else{
                    alert(JSON.stringify(this.props.transfer))
                }
            })
        }
    }

    render(){
        const{accounts,inProgress,receiver,account}=this.props
        return(
            <View style={styles.container}>
                <Header headerTitle="Accounts" />
                <FlatList
                    data={accounts}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    ListEmptyComponent={this._emptyList}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={inProgress}
                            onRefresh={this._onRefresh}
                        />
                    }
                />

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false)
                }}>
                    <View style={styles.modalContainer}>
                        <View style={styles.transferFormHeader}>
                            <Text>From: {account.email}</Text>
                            <Text>To: {receiver.email}</Text>
                        </View>
                        <TextInput
                            placeholder="Amount in USD"
                            value= {this.state.amount}
                            onChangeText={(amount) => this.setState({amount})}
                            style={styles.input}
                        />
                        <Button title="TRANSFER NOW" style={{marginBottom:15}} onPress={this.handleTransfer}/>
                    </View>
                </Modal>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state,
        account: state.Account.account,
        accounts: state.Account.accounts,
        users: state.Account.users,
        inProgress: state.Account.inProgress,
        receiver: state.Account.receiver,
        error: state.Transfer.error,
        transfer: state.Transfer.transfer
    }
}

export default connect(mapStateToProps)(AccountsScreen)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      width:'100%',
    },
    emptyItem:{
        margin:10,
        width:'100%',
        justifyContent:'center'
    },
    modalContainer:{
        margin:15,
        flex:1
    },
    transferFormHeader:{
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        paddingBottom:15
    },
    input:{
        fontSize:16,
        marginBottom:20,
    },
})