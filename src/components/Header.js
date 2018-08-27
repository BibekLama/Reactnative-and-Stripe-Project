import React from 'react'
import {Platform, NativeModules, StyleSheet, View,Text,StatusBar} from 'react-native'


const { StatusBarManager } = NativeModules
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? StatusBarManager.getHeight() : StatusBarManager.HEIGHT

const Header = (props) => {
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#f0f0f0"  barStyle="dark-content" translucent={true}/>
            <View style={styles.header}>
                <View style={styles.headerInner}>
                    <Text style={styles.headerTitle}>{props.headerTitle}</Text>
                </View>
            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: {
        width:'100%',
        paddingTop:STATUSBAR_HEIGHT,
    },
    header:{
        width:'100%',
        height:40,
        paddingLeft:16,
        paddingRight:16,
        borderBottomWidth:1,
        borderBottomColor: '#ddd'
    },
    headerInner:{
        flex:1,
        height:'100%',
        width:'100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    headerTitle:{
        fontSize:18,
        color:'#333'
    }

})