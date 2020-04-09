import React, { useState } from "react";
import { Text, ScrollView } from "react-native";

export default function Media(props) {
    const [Media, setMedia] = useState("");

    return (
        <ScrollView style={{ margin: 15 }}>
            <Text>Media</Text>
        </ScrollView>
    );
}