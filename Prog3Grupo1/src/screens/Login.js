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
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f2f2f2",
      justifyContent: "center",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 24,
      color: "#333",
    },
    field: {
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      padding: 14,
      fontSize: 16,
      marginBottom: 18,
    },
    btnPrimary: {
      backgroundColor: "#f39c12",
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 8,
      borderWidth: 1,
      borderColor: "#e67e22",
    },
    btnText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    linkBtn: {
      marginTop: 12,
      alignItems: "center",
    },
    linkText: {
      color: "#3498db",
      textDecorationLine: "underline",
      fontSize: 14,
    },
  });