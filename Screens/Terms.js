import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, Button, TouchableOpacity } from "react-native";
import { fetchTerms } from "../api/fetchTerms";

export default function Terms(props) {
  const [terms, set_terms] = useState("");
  fetchTerms()
    .then(res => { set_terms(res) })
    .catch(error => { });
  //set_terms(fetchTerms());
  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>{terms}</Text>
    </ScrollView>
  );
}
