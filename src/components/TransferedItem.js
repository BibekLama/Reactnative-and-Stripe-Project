import React, {PureComponent} from 'react'
import {StyleSheet, View, Text} from 'react-native'

export default class TransferedItem extends PureComponent{
    render(){
        return(
            <View style={styles.container}>
                <Text>Transefer Item</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        margin:5,
        padding:10,
        elevation:3
    }
})