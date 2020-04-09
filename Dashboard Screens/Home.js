import React, { useState } from "react";
import { Text, ScrollView } from "react-native";

export default function Home(props) {
    const [Home, setHome] = useState("");

    return (
        <ScrollView style={{ margin: 15 }}>
            <Text>Home</Text>
        </ScrollView>
    );
}