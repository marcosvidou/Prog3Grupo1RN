import { Component } from "react";
import { View, Text } from "react-native";

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
            <View>
                <View>
        <Text>{this.props.data.texto}</Text>
        <Text>Creado por: {this.props.data.owner}</Text>
        </View>
            </View>
        )
    }
}