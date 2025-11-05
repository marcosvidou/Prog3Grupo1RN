import React, { Component } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";

class Register extends Component {
    constructor(props) {
    super(props);
    this.state = {
        email: "",
        userName: "",
        password: "",
    };
    }
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if (user != null){
                this.props.navigation.navigate("StackNavegation");
            }
        })
    }
    onSubmit(email, userName, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            return db.collection('users').add({
                email: email,
                userName: userName,
                createdAt: Date.now()
            });
        })
        .then(() => {
            this.props.navigation.navigate("Login");
        })
        .catch((error) => {
            console.log("ERROR REGISTRO o GUARDADO:", error.message);
        });
    };

    render() {

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>
        <TextInput
            style={styles.field}
            keyboardType="email-address"
            placeholder="email"
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
            style={styles.field}
            placeholder="username"
            value={this.state.userName}
            onChangeText={(text) => this.setState({ userName: text })}
        />
        <TextInput
            style={styles.field}
            placeholder="password"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(text) => this.setState({ password: text })}
        />
        <Pressable style={styles.btnPrimary} onPress={()=> this.onSubmit(this.state.email, this.state.userName, this.state.password)}>
            <Text style={styles.btnText}>Registrate</Text>
        </Pressable>

        <Pressable style={styles.linkBtn} onPress={() => this.props.navigation.navigate("Login")}>
            <Text style={styles.linkText}>¿Ya tenés cuenta? Ir a Login</Text>
        </Pressable>
        </View>
    );
    }
}
export default Register;

const styles = StyleSheet.create({
    container: { padding: 16 },
    title: { fontSize: 24, fontWeight: "600", marginBottom: 12 },
    field: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 6,
    padding: 10, marginBottom: 10,
    },
    btnPrimary: {
    backgroundColor: "#2e86de", padding: 12, borderRadius: 6, marginTop: 6,
    alignItems: "center",
    },
    btnText: { color: "white", fontWeight: "600" },
    preview: {
    marginTop: 16, padding: 12, backgroundColor: "#f4f6f7", borderRadius: 6,
    },
    previewTitle: { fontWeight: "700", marginBottom: 6 },
    linkBtn: { marginTop: 12, alignItems: "center", },
    linkText: { color: "#2e86de", textDecorationLine: "underline",},

});
