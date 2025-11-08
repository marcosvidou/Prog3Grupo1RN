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
            <Button title="Publicar" onPress={() => this.CrearPosteo()} />
            <Text style={styles.mensaje}>{this.state.mensaje}</Text>
        </View>
        );
    }
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 20,
          backgroundColor: '#fff0f5', 
          justifyContent: 'center',
        },
        titulo: {
          fontSize: 26,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 25,
          color: '#b30059', 
        },
        input: {
          borderColor: '#ff66a3', 
          borderWidth: 2,
          borderRadius: 10,
          padding: 10,
          marginBottom: 20,
          height: 100,
          fontSize: 16,
          backgroundColor: '#ffffff',
          textAlignVertical: 'top',
          color: '#000',
        },
        mensaje: {
          marginTop: 10,
          textAlign: 'center',
          color: '#009933', 
          fontWeight: 'bold',
          fontSize: 16,
        },
        boton: {
          backgroundColor: '#ff3399', 
          padding: 12,
          borderRadius: 10,
          alignItems: 'center',
        },
        textoBoton: {
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold',
        }
      });