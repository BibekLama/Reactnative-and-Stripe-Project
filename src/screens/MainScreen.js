import React,{Component} from 'react'
import {StyleSheet,BackHandler, View, Text, Button,RefreshControl,FlatList} from 'react-native'
import {connect} from 'react-redux'

//Components
import Header from '../components/Header'
import TransferedItem from '../components/TransferedItem'

import {getAccount} from '../actions/accountActions'
import {getTransfers} from '../actions/transferActions'

class MainScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            user: {},
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
            this.props.dispatch(getAccount({id:this.state.user.id,sk:this.state.user.sk}))
            this.props.dispatch(getTransfers(this.state.user.sk))
        })   
    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        );
    }

    onBackButtonPressAndroid = () => {
        // this.props.navigation.goBack(null);
        // return false;
        BackHandler.exitApp();
    };

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id) => {
      this.setState((state) => {
        const selected = new Map(state.selected);
        selected.set(id, !selected.get(id)); // toggle
        return {selected};
      });
    };

    _renderItem = ({item}) => (
        <TransferedItem
          id={item.id}
          onPressItem={this._onPressItem}
          selected={!!this.state.selected.get(item.id)}
          item={item}
        />
    );

    _emptyList = () => (
        <View style={styles.emptyItem}>
            <Text> No Transfer</Text>
        </View>
    );

    _onRefresh = () => {
        this.props.dispatch(getTransfers(this.state.user.sk))
    }

    handleTransferButton = () => {
        this.props.navigation.navigate('Accounts')
    }

    render(){
        const {user} = this.state
        const {account,trProgress,transfers} = this.props
        return(
            <View style={styles.container}>
                <Header headerTitle="Main" />
                <View style={styles.contentWrap}>
                    <View style={styles.contentRow}>
                        <Text style={styles.rowHeader}>Email: </Text>
                        <Text style={styles.rowHeader}>{account.email}</Text>
                    </View>
                    <View style={styles.contentRow}>
                        <Button 
                            title="Edit Account" 
                            onPress={()=>console.log("clicked edit account button")}
                            style={styles.button}
                        />
                    </View>
                    <View style={styles.contentRow}>
                        <Button 
                            title="Transfer" 
                            onPress={this.handleTransferButton}
                            style={styles.button}
                        />
                    </View>
                    <View style={styles.contentRow}>
                        <Text style={styles.rowHeader}>Transfers</Text>
                    </View>
                    <FlatList
                        data={transfers}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        ListEmptyComponent={this._emptyList}
                        refreshControl={
                            <RefreshControl
                              refreshing={trProgress}
                              onRefresh={this._onRefresh}
                            />
                        }
                    />
                </View>    
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state,
        account: state.Account.account,
        users: state.Account.users,
        trProgress: state.Transfer.inProgress,
        transfers: state.Transfer.transfers
    }
}


export default connect(mapStateToProps)(MainScreen)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: '#FFFFFF',
      width:'100%'
    },
    contentWrap:{
        flex:1,
        padding:16,
        width:'100%',
    },
    contentRow:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-start',
        marginBottom:16
    },
    button:{
        marginBottom:15,
    },
    emptyItem:{
        flex:1,
        justifyContent:'center'
    }
})