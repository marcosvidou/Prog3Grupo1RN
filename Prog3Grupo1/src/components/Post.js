import { Component } from "react";
import { View, Text } from "react-native";
import { StyleSheet } from 'react-native';

export default class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentDidMount(){
        console.log(this.props)
    }
    render(){
        return(
            
        <View style={styles.postContainer}>
            <Text style={styles.texto}>{this.props.data.texto}</Text>
            <Text style={styles.owner}>Creado por: {this.props.data.owner}</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    postContainer: {
      backgroundColor: "#ffffff",
      padding: 16,
      borderRadius: 12,
      marginBottom: 14,
      borderWidth: 1,
      borderColor: "#dcdcdc",
    },
  
    texto: {
      fontSize: 16,
      color: "#222",
      marginBottom: 8,
    },
  
    owner: {
      fontSize: 13,
      color: "#666",
      fontStyle: "italic",
      marginTop: 4,
    },
  });