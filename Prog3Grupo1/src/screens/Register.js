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
        check: "",
    };
    }
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if (user != null){
                this.props.navigation.navigate("StackNavegation");
            }
        })
    }

    onSubmit() {
        if (!this.state.email.includes('@')) {
            this.setState({ check: 'Ingrese un mail valido' });
            return;
        }
                if (this.state.password.length < 6) {
            this.setState({ check: 'La contraseña debe tener al menos 6 caracteres' });
            return;
        }
        if (this.state.userName === '') {
            this.setState({ check: 'Ingrese un nombre de usuario' });
            return;
        }
        this.register(this.state.email, this.state.userName, this.state.password);
    }

    register(email, userName, password){
        
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
            this.setState({ check: error.message });
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
        {this.state.check !== "" ?
        <Text >{this.state.check}</Text>
            : null}
        </View>
    );
    }
}
export default Register;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f2f2f2",
      padding: 20,
      justifyContent: "center",
    },
  
    title: {
      fontSize: 26,
      fontWeight: "700",
      marginBottom: 20,
      textAlign: "center",
      color: "#333",
    },
  
    field: {
      backgroundColor: "#ffffff",
      borderWidth: 2,             
      borderColor: "#bcd4f6",      
      borderRadius: 10,            
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      marginBottom: 14,
    },
  
    btnPrimary: {
      backgroundColor: "#2e86de",  
      paddingVertical: 14,
      borderRadius: 10,
      marginTop: 12,
      alignItems: "center",
     borderWidth: 2,
      borderColor: "#1b4f72",
    },
  
    btnText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },
  
    linkBtn: {
      marginTop: 18,
      alignItems: "center",
    },
  
    linkText: {
      color: "#2e86de",
      textDecorationLine: "underline",
      fontSize: 14,
    },
  });