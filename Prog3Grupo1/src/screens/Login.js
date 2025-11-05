import React, { Component } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { auth } from "../firebase/config";

class Login extends Component {
    constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: "",
    };
    }
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if (user != null){
                this.props.navegation.navigate("StackNavegation");
            }
        })
    }
    onSubmit(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log("LOGIN OK");
            this.props.navigation.navigate("StackNavegation");
        })
        .catch((error) => {
            console.log("ERROR LOGIN:", error.message);
        });
};

    render() {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Ingresar</Text>
        <TextInput
            style={styles.field}
            keyboardType="email-address"
            placeholder="email"
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
            style={styles.field}
            placeholder="password"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(text) => this.setState({ password: text })}
        />
        <Pressable style={styles.btnPrimary} onPress={()=>this.onSubmit(this.state.email, this.state.password)}>
            <Text style={styles.btnText}>Login</Text>
        </Pressable>
        <Pressable style={styles.linkBtn} onPress={() => this.props.navigation.navigate("Register")}>
            <Text style={styles.linkText}>¿No tenés cuenta? Ir a Registrarse</Text>
        </Pressable>
        </View>
    );
    }
}

export default Login;

const styles = StyleSheet.create({
    container: { padding: 16 },
    title: { fontSize: 24, fontWeight: "600", marginBottom: 12 },
    field: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 6,
    padding: 10, marginBottom: 10,
    },
    btnPrimary: {
    backgroundColor: "#f39c12", padding: 12, borderRadius: 6, marginTop: 6,
    alignItems: "center",
    },
    btnText: { color: "white", fontWeight: "600" },
    preview: {
    marginTop: 16, padding: 12, backgroundColor: "#f4f6f7", borderRadius: 6,
    },
    previewTitle: { fontWeight: "700", marginBottom: 6 },linkText: { color: "#2e86de", textDecorationLine: "underline",},
});
