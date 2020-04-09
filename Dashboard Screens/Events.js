import React, { useState } from "react";
import { Text, ScrollView } from "react-native";

export default function Events(props) {
    const [Events, setEvents] = useState("");

    return (
        <ScrollView style={{ margin: 15 }}>
            <Text>Events</Text>
        </ScrollView>
    );
}