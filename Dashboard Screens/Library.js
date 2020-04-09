import React, { useState } from "react";
import { Text, ScrollView } from "react-native";

export default function Library(props) {
    const [Library, setLibrary] = useState("");

    return (
        <ScrollView style={{ margin: 15 }}>
            <Text>Library</Text>
        </ScrollView>
    );
}