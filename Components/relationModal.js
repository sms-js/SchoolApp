import React, { Component } from "react";
import { Text, TextInput, Button } from "react-native";
import Modal from 'react-native-modalbox';

export default class relationModal extends Component {
    constructor() {
        super();
        this.state = {
            relation: ''
        }
    }
    showModel = () => {
        this.refs.relationModal.open();
    }
    setRelation = (relation) => {
        this.props.setRelation(relation);
    }
    render() {

        return (
            <Modal
                ref={"relationModal"}
                position='center'
                backdrop={true}
            //onClosed={() => { }}

            >
                <Text>Enter your relation to student</Text>
                <TextInput placeholder="Relation"
                    onChangeText={(value) => { this.setState({ relation: value }) }}
                    value={this.state.relation}
                />
                <Button title="Add Relation" onPress={() => { this.setRelation(this.state.relation); }} />
            </Modal>
        );
    }
}