import React, { useState, useEffect, Alert } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import Expenses from "./Expenses";
import MyModal from './component/MyModal';
import { initDatabase, addExpense, deleteExpense, getExpenses } from "./config/Database";

const db = SQLite.openDatabase("db.db");

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [date, setDate] = useState("");

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('Hello World!');
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleSelectExpense = (expense) => {
    setSelectedExpense(expense);
  };


  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    initDatabase();
    updateExpenses();
  }, []);

  useEffect(() => {
    if (selectedExpense) {
      setDescription(selectedExpense.description);
      setValue(selectedExpense.value.toString());
      setExpenseType(selectedExpense.expenseType);
      setPaymentType(selectedExpense.paymentType);
      setDate(selectedExpense.date);
    } else {
      setDescription("");
      setValue("");
      setExpenseType("");
      setPaymentType("");
      setDate("");
    }
  }, [selectedExpense]);

  const updateExpenses = async () => {
    try {
      const expenses = await getExpenses();
      setExpenses(expenses);
    } catch (error) {
      console.error("Failed to retrieve expenses:", error);
    }
  };

  const handleModal = (visible, text) => {
    setModalVisible(visible); 
    setModalText(text);
  }


  const handleAddExpense = async () => {
    if (
      description.trim() === "" ||
      value.trim() === "" ||
      expenseType.trim() === "" ||
      paymentType.trim() === "" ||
      date.trim() === ""
    ) {
      setModalText("Por favor, preencha todos os campos");
      setModalVisible(true);
      return;
    }

    try {
      setSelectedExpense(null); 
      await addExpense(description, value, expenseType, paymentType, date);
      setModalVisible(true);
      handleModal(true,"Despesa adicionada com sucesso" )
      updateExpenses();
      setDescription("");
      setValue("");
      setExpenseType("");
      setPaymentType("");
      setDate("");
    } catch (error) {
      console.error("Failed to add expense:", error);
      alert("Erro", "Falha ao adicionar a despesa");
    }
  };
  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      alert("Sucesso", "Despesa excluída com sucesso");
      updateExpenses();
    } catch (error) {
      console.error("Failed to delete expense:", error);
      alert("Erro", "Falha ao excluir a despesa");
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Despesas</Text>
      <ScrollView style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            placeholder="Descrição da despesa"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Valor</Text>
          <TextInput
            style={styles.input}
            placeholder="Valor da despesa"
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tipo de Despesa</Text>
          <TextInput
            style={styles.input}
            placeholder="Tipo de despesa"
            value={expenseType}
            onChangeText={setExpenseType}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tipo de Transação</Text>
          <TextInput
            style={styles.input}
            placeholder="Tipo de transação"
            value={paymentType}
            onChangeText={setPaymentType}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Data da Despesa</Text>
          <TextInput
            style={styles.input}
            placeholder="Data da despesa"
            value={date}
            onChangeText={setDate}
          />
        </View>
        <MyModal visible={isModalVisible} onClose={handleCloseModal} modalText={modalText} />
        <Button
          title="Press me"
          onPress={handleAddExpense}
        />
      </ScrollView>
      <ScrollView style={styles.listArea}>
        {/* <Expenses expenses={expenses} onPressExpense={handleDeleteExpense} /> */}
        <Expenses  expenses={expenses}
          onPressExpense={handleDeleteExpense}
          selectedExpense={selectedExpense}
          onSelectExpense={setSelectedExpense} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  formContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
  addButton: {
    backgroundColor: "#1c9963",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignSelf: "center",
    marginBottom: 16,
  },
  addButtonLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

// export default App;


