import React, {PureComponent} from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'

export default class AccountItem extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        const{item,onPressItem} = this.props
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.itemContainer} onPress={() => onPressItem(item.id)}>
                    <Text>{item.email}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        margin:10,
        padding:10,
    },
    itemContainer:{
        width:'100%',
        padding:15,
        backgroundColor:'#eee',
        elevation:1,
    }
})