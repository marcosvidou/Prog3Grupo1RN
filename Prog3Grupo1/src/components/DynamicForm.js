import React, { Component } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

class DynamicForm extends Component {
    constructor(props) {
    super(props);
    this.state = { comment: "" };
    }
    onSubmit = () => {
    console.log("COMMENT SUBMIT =>", { comment: this.state.comment });
    };
    render() {
    const { comment } = this.state;
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Nuevo comentario</Text>
        <TextInput
            style={[styles.field, styles.multiline]}
            placeholder="Escribí tu comentario…"
            value={comment}
            multiline
            numberOfLines={4}
            onChangeText={(text) => this.setState({ comment: text })}
        />

        <Pressable style={styles.btnPrimary} onPress={this.onSubmit}>
            <Text style={styles.btnText}>Enviar</Text>
        </Pressable>
        </View>
    );
    }
}
export default DynamicForm;

const styles = StyleSheet.create({
    container: { padding: 16 },
    title: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
    field: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 6,
    padding: 10, marginBottom: 10,
    },
    multiline: { minHeight: 90, textAlignVertical: "top" },
    btnPrimary: {
    backgroundColor: "#27ae60", padding: 12, borderRadius: 6,
    alignItems: "center",
    },
    btnText: { color: "white", fontWeight: "600" },
    preview: {
    marginTop: 16, padding: 12, backgroundColor: "#f4f6f7", borderRadius: 6,
    },
    previewTitle: { fontWeight: "700", marginBottom: 6 },
});