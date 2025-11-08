import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import firebase from "firebase"
import { auth, db } from '../firebase/config';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loader : true
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (!user) {
                this.props.navigation.navigate('Login')
            } else {
                db.collection('posts')
                .orderBy('createdAt', 'desc')
                .onSnapshot(
                    docs =>{
                    let posts = [];
                    docs.forEach(doc => {
                        posts.push({
                            id: doc.id,
                            data: doc.data()
                        });
                    });
                    this.setState({ posts, loader : false });
                });
            }
        });
    }
    likePost(id) {
        db.collection('posts')
        .doc(id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        });
    }
    unlikePost(id) {
        db.collection('posts')
        .doc(id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Home</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <View style={styles.post}>
                            {this.state.loading ? <Text>Cargando... </Text> :  <>
                            <Text style={styles.user}>Usuario: {item.data.owner}</Text>
                            <Text style={styles.text}>{item.data.texto}</Text>
                            <Text>Likes: {item.data.likes.length}</Text>
                            {item.data.likes.includes(auth.currentUser.email)? (
                                <Pressable onPress={()=> this.unlikePost(item.id)}>
                                    <Text style={styles.unlike}> 💔 unlike</Text>
                                </Pressable>
                            ): (
                                <Pressable onPress={()=> this.likePost(item.id)}>
                                    <Text style={styles.like}> ❤️ like</Text>
                                </Pressable>
                            )}
                            <Pressable
                                onPress={() =>
                                    this.props.navigation.navigate('CrearPosteo', { id: item.id })
                                }>
                                <Text style={styles.comment}>Comentar</Text>
                            </Pressable>
                            </>}
                        </View>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fef6f9',
        padding: 20,
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#d6336c',
        textAlign: 'center',
        paddingBottom: 10,
    },
    post: {
        backgroundColor: '#fff',
        borderColor: '#d6336c',
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    user: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333'
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        color: '#444'
    },
    like: {
        color: '#28a745',
        marginTop: 5,
        fontWeight: 'bold',
    },
    unlike: {
        color: '#dc3545',
        marginTop: 5,
        fontWeight: 'bold',
    },
    comment: {
        color: '#007bff',
        marginTop: 10,
        fontWeight: '600',
    }
});