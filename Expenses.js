import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ExpensesStyle from "./styles/ExpensesStyle";

const Expense = ({ expense, onPressExpense, selected, onSelectExpense }) => {
  const { id, description, value, expenseType, paymentType, date } = expense;

  return (
    <TouchableOpacity
      onPress={() => onSelectExpense && onSelectExpense(expense)}
      style={[styles.expenseItem, selected && styles.selectedExpenseItem]}
    >
      <View style={styles.expenseItemLeft}>
        <Text style={styles.expenseItemDescription}>{description}</Text>
        <Text style={styles.expenseItemValue}>Valor: {value}</Text>
        <Text style={styles.expenseItemType}>Tipo: {expenseType}</Text>
        <Text style={styles.expenseItemType}>Transação: {paymentType}</Text>
        <Text style={styles.expenseItemDate}>Data: {date}</Text>
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

const styles = ExpensesStyle

export default Expenses;
