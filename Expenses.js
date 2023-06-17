import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Expense = ({ expense, onPressExpense, selected, onSelectExpense }) => {
  const { id, description, value, expenseType, paymentType, date } = expense;

  return (
    <TouchableOpacity
      onPress={() => onSelectExpense && onSelectExpense(expense)}
      style={[styles.expenseItem, selected && styles.selectedExpenseItem]}
    >
      <View style={styles.expenseItemLeft}>
        <Text style={styles.expenseItemDescription}>{description}</Text>
        <Text style={styles.expenseItemValue}>Value: {value}</Text>
        <Text style={styles.expenseItemType}>Type: {expenseType}</Text>
        <Text style={styles.expenseItemType}>Transaction: {paymentType}</Text>
        <Text style={styles.expenseItemDate}>Date: {date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Expenses = ({ expenses, onPressExpense, selectedExpense, onSelectExpense }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>Expenses</Text>
      {expenses.map((expense) => (
        <Expense
          key={expense.id}
          expense={expense}
          onPressExpense={onPressExpense}
          selected={expense === selectedExpense}
          onSelectExpense={onSelectExpense}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8,
  },
  expenseItem: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
  },
  expenseItemLeft: {},
  expenseItemDescription: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  expenseItemValue: {},
  expenseItemType: {},
  expenseItemDate: {},
  selectedExpenseItem: {
    backgroundColor: "#f0f0f0",
  }
});

export default Expenses;
