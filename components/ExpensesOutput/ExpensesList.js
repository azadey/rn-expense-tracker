import { Text, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderItem(itemData) {
    return (
        <ExpenseItem {...itemData.item} />
    );
}

function ExpensesList({expenses}) {
    return <FlatList data={expenses} renderItem={renderItem} keyExtractor={(item) => item.id }  />
}

export default ExpensesList;