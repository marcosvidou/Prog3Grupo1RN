import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

export default class CrearPosteo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            texto: '',
            mensaje: '',
        };
    }

    CrearPosteo() {
        const user = auth.currentUser;
        if (!user) {
        this.setState({ mensaje: 'Recuerde Loguearse para postear!' });
        return;
        }
        if (this.state.texto === '') {
        this.setState({ mensaje: 'Esta publicacion NO puede estar vacia!' });
        return;
        }
        db.collection('posts').add({
            texto: this.state.texto,
            owner: user.email,
            createdAt: Date.now(),
            likes: [],
        })
        .then(() => {
            this.setState({
            texto: '',
            mensaje: 'Su posteo se creo de manera exitosa.',
            });
            this.props.navigation.navigate('Home');
        })
        .catch(() => {
            this.setState({ mensaje: 'Ocurrió un error al crear el posteo.' });
        });
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Nuevo Post</Text>
            <TextInput
            style={styles.input}
            placeholder="Introduzca su posteo.."
            value={this.state.texto}
            onChangeText={(text) => this.setState({ texto: text })}
            />
            <Button title="Publicar" onPress={() => this.crearPost()} />
            <Text style={styles.mensaje}>{this.state.mensaje}</Text>
        </View>
        );
    }
    }

    const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 20,
     justifyContent: 'center',
     backgroundColor: '#f2f2f2',
   },
   titulo: {
     fontSize: 20,
     textAlign: 'center',
     marginBottom: 20,
   },
   input: {
     borderColor: 'gray',
     borderWidth: 1,
     borderRadius: 10,
     padding: 10,
     marginBottom: 15,
     height: 100,
     backgroundColor: '#fff',
     textAlignVertical: 'top',
   },
   mensaje: {
     marginTop: 15,
     textAlign: 'center',
     color: '#333',
   },
    });