import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { FlatList } from 'react-native-web';

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentarios: [],
      posteo: null,
      id: this.props.route.params.id,
      comentario: "",
    };
  }
  componentDidMount() {
    db.collection('posts').doc(this.state.id).onSnapshot(doc => {
      if (doc.exists) {
        console.log(doc.data());
        this.setState({ posteo: doc.data() });
      }
    })
  }

  onSubmit() {

    db.collection('posts').doc(this.state.id).update({
      comentarios: firebase.firestore.FieldValue.arrayUnion({
        owner: auth.currentUser.email,
        text: this.state.comentario,
      })
    })
      .then(() => {
        this.setState({ comentario: '' });
        console.log('Comentario agregado');
      })
      .catch(e => console.log(e));
  }

  render() {
    if (this.state.posteo) {
      console.log(this.state.posteo);
      return (
        <View style={styles.container}>
          <View style={[styles.card, {border: '2px solid gray'}]}>
            <Text style={styles.author}>{this.state.posteo.owner}</Text>
            <Text style={styles.text}>{this.state.posteo.texto}</Text>
          </View>
          <Text>Comentarios:</Text>
          <FlatList
          data={this.state.posteo.comentarios}
          keyExtractor={(c, index) => index.toString()}
          contentContainerStyle={styles.container}
          renderItem={({ item: c }) => {
          return (
        <View style={[styles.card, {margin: 5}]}>
          <Text style={styles.author}>{c.owner}</Text>
        <Text style={styles.text}>{c.text}</Text>
        </View>
      )
    }}
/>

          <TextInput
            style={styles.field}
            placeholder="Escribe un comentario..."
            multiline={true}
            numberOfLines={2}
            onChangeText={text => this.setState({ comentario: text })}
            value={this.state.comentario}
          />
          <Pressable onPress={() => this.onSubmit()} style={styles.button}>
            <Text style={styles.buttonText}>Comentar</Text>
          </Pressable>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F2F4F7",
      padding: 20,
    },
  
    card: {
      backgroundColor: "#ffffff",
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#E0E6EF",
      marginBottom: 12,
  
    
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  
    author: {
      fontWeight: "600",
      fontSize: 16,
      color: "#2E3A59",
      marginBottom: 6,
    },
  
    text: {
      fontSize: 15,
      color: "#394B61",
      lineHeight: 20,
    },
  
    field: {
      borderWidth: 1,
      borderColor: "#D6DEEB",
      backgroundColor: "#ffffff",
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 15,
      fontSize: 15,
      marginTop: 8,
      marginBottom: 12,
  
      
      shadowColor: "#000",
      shadowOpacity: 0.07,
      shadowRadius: 3,
      elevation: 2,
    },
  
    button: {
      backgroundColor: "#3777F0",
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
  
     
      cursor: "pointer",
    },
  
    buttonText: {
      color: "#ffffff",
      fontWeight: "700",
      fontSize: 16,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
  });

export default AddComment;