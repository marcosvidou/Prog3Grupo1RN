import React, { Component } from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: {},
            loadingUsuario: true,
            posteos: [],
            loadingPosteos: true
        }
    }
    componentDidMount() {
        console.log(auth.currentUser)
        db.collection("users").where("email", "==", auth.currentUser.email).onSnapshot(data => {
            data.forEach(doc => {
                this.setState({
                    usuario: doc.data(),
                    loadingUsuario: false
                })
            })
        })
        db.collection("posts").where("owner", "==", auth.currentUser.email).onSnapshot(docs => {
            let posts = [];
            console.log(docs)
            docs.forEach(doc =>
                posts.push({ id: doc.id, data: doc.data() })
            )
            console.log(posts)
            this.setState({ posteos: posts, loadingPosteos: false })
        })

    }
    logout() {
        auth.signOut()
            .then(() => this.props.navigation.navigate("Login"))
    }
    render() {
        return (
            
                    <View style={styles.container}>
                        {this.state.loadingPosteos ? <Text>Cargando... </Text> :  <>
                        <Text style={styles.title}>Profile</Text>
                        <Text style={styles.email}>{this.state.usuario.email}</Text>
                        <Text style={styles.username}>{this.state.usuario.userName}</Text>
                        <Pressable
                            style={styles.btn}
                            onPress={() => this.logout()}
                        >
                            <Text style={styles.btnText}>Desloguearse (ir a Login)</Text>
                        </Pressable>
                        <FlatList data = {this.state.posteos} keyExtractor={(item)=>item.id.toString()} renderItem={({item})=><Post data={item.data} origen="perfil"/>} origen="perfil"/>
                        </>}
                    </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
      paddingHorizontal: 24,
      paddingTop: 50,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: 8,
    },
    email: {
      fontSize: 16,
      color: '#555',
      textAlign: 'center',
      marginBottom: 4,
    },
    username: {
      fontSize: 18,
      color: '#111',
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 16,
    },
    btn: {
      backgroundColor: '#222',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignSelf: 'center',
      marginBottom: 24,
    },
    btnText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
    },
    postList: {
      paddingBottom: 100,
    }
  });