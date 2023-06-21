import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Swipeable } from 'react-native-gesture-handler';
import ExpensesStyle from "./styles/ExpensesStyle";

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MyModal from "./component/MyModal";

const Expense = ({ expense, onPressExpense, selected, onSelectExpense, onDeleteExpense, onEditExpense, onConfirmDelete }) => {
  const { id, description, value, expenseType, paymentType, date } = expense;
  const [showActions, setShowActions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const getExpenseItemStyle = () => {
    if (expenseType === 'despesa') {
      return [styles.expenseItem, selected && styles.selectedExpenseItem, styles.expenseItemDespesa];
    } else if (expenseType === 'receita') {
      return [styles.expenseItem, selected && styles.selectedExpenseItem, styles.expenseItemReceita];
    }
    return [styles.expenseItem, selected && styles.selectedExpenseItem];
  };

  const handleDelete = () => {
    setShowModal(false);
    onDeleteExpense(expense);
  };

  const swipeButtons = [
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => {
        setShowModal(true);
        setShowActions(false);
      }}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>,
    <TouchableOpacity
      style={styles.editButton}
      onPress={() => {
        onSelectExpense && onSelectExpense(expense);
        setShowActions(false);
      }}
    >
      <Text style={styles.editButtonText}>Edit</Text>
    </TouchableOpacity>
  ];

  const handleSwipeRightOpen = () => {
    setShowActions(true);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Swipeable renderRightActions={() => (
      <View style={styles.rightActionsContainer}>
        {swipeButtons.map((button, index) => (
          <Animated.View key={index} style={styles.rightAction}>
            {button}
          </Animated.View>
        ))}
      </View>
    )} onSwipeableRightOpen={handleSwipeRightOpen} onSwipeableRightWillOpen={() => setShowActions(true)} onSwipeableRightClose={() => setShowActions(false)}>
      <TouchableOpacity
        onPress={() => {
          onSelectExpense && onSelectExpense(expense);
          setShowActions(false);
        }}
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
    <View>
      <MyModal
        visible={showModal}
        modalText={'Tem certeza que deseja excluir?'}
        onClose={() => setShowModal(false)}
        onDelete={handleDelete}
      />
    </View>
     </GestureHandlerRootView>
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
