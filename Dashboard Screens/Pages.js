import React, { useState } from "react";
import { Text, ScrollView } from "react-native";

export default function Pages(props) {
    const [Pages, setPages] = useState("");

    return (
        <ScrollView style={{ margin: 15 }}>
            <Text>Pages</Text>
        </ScrollView>
    );
}