import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Swipeable from 'react-native-swipeable';
import ExpensesStyle from "./styles/ExpensesStyle";

const Expense = ({ expense, onPressExpense, selected, onSelectExpense, onDeleteExpense, onEditExpense }) => {
  const { id, description, value, expenseType, paymentType, date } = expense;

  const getExpenseItemStyle = () => {
    if (expenseType === 'despesa') {
      return [styles.expenseItem, selected && styles.selectedExpenseItem, styles.expenseItemDespesa];
    } else if (expenseType === 'receita') {
      return [styles.expenseItem, selected && styles.selectedExpenseItem, styles.expenseItemReceita];
    }
    return [styles.expenseItem, selected && styles.selectedExpenseItem];
  };

  const swipeButtons = [
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => onDeleteExpense && onDeleteExpense(expense)}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>,
    <TouchableOpacity
      style={styles.editButton}
      onPress={() => onSelectExpense && onSelectExpense(expense)}
    >
      <Text style={styles.editButtonText}>Edit</Text>
    </TouchableOpacity>
  ];

  return (
    <Swipeable rightButtons={swipeButtons} onSwipeableRightOpen={() => {}}>
      <TouchableOpacity
        onPress={() => onSelectExpense && onSelectExpense(expense)}
        style={getExpenseItemStyle()} 
      >
        <View style={styles.expenseItemLeft}>
          <Text style={styles.expenseItemDescription}>{description}</Text>
          <Text style={styles.expenseItemValue}>Valor: {value}</Text>
          <Text style={styles.expenseItemType}>Tipo: {expenseType}</Text>
          <Text style={styles.expenseItemType}>Transação: {paymentType}</Text>
          <Text style={styles.expenseItemDate}>Data: {date}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const Expenses = ({ expenses, onPressExpense, selectedExpense, onSelectExpense, onDeleteExpense, onEditExpense }) => {
  return (
    <View style={styles.sectionContainer}>
      {expenses.map((expense) => (
        <Expense
          key={expense.id}
          expense={expense}
          onPressExpense={onPressExpense}
          selected={expense === selectedExpense}
          onSelectExpense={onSelectExpense}
          onDeleteExpense={onDeleteExpense}
          onEditExpense={onEditExpense}
        />
      ))}
    </View>
  );
};

const styles = ExpensesStyle;

export default Expenses;
