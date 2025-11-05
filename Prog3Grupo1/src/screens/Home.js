import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import DynamicForm from '../components/DynamicForm';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
    return (
    <ScrollView style={styles.container}>
        <View style={styles.content}>
            <Text style={styles.title}>Pantalla Home</Text>
            <DynamicForm />
        </View>
    </ScrollView>
    );}
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#f5f6f8',
    },
    content: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0b1620',
    },
});