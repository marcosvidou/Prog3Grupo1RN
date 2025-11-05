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
                        <Text style={styles.title}>{this.state.usuario.email}</Text>
                        <Text style={styles.title}>{this.state.usuario.userName}</Text>
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
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
    title: { fontSize: 22, marginBottom: 16 },
    btn: { padding: 10, backgroundColor: "#eee", borderRadius: 6 },
    btnText: { fontWeight: "600" },
});
