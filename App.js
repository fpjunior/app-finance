import React, { useState, useEffect, Alert } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import Expenses from "./Expenses";

const db = SQLite.openDatabase("db.db");

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, value REAL, expenseType TEXT, paymentType TEXT, date TEXT);"
      );
    }, null, updateExpenses);
  }, []);

  const updateExpenses = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM expenses;", [], (_, { rows }) => {
        setExpenses(rows._array);
      });
    });
  };

  const addExpense = () => {
    if (
      description.trim() === "" ||
      value.trim() === "" ||
      expenseType.trim() === "" ||
      paymentType.trim() === "" ||
      date.trim() === ""
    ) {
      alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO expenses (description, value, expenseType, paymentType, date) VALUES (?, ?, ?, ?, ?)",
        [description, parseFloat(value), expenseType, paymentType, date],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            alert("Sucesso", "Despesa adicionada com sucesso");
            updateExpenses();
            setDescription("");
            setValue("");
            setExpenseType("");
            setPaymentType("");
            setDate("");
          } else {
            alert("Erro", "Falha ao adicionar a despesa");
          }
        }
      );
    });
  };

  const deleteExpense = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM expenses WHERE id = ?",
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            alert("Sucesso", "Despesa excluída com sucesso");
            updateExpenses();
          } else {
            alert("Erro", "Falha ao excluir a despesa");
          }
        }
      );
    });
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
        <TouchableOpacity style={styles.addButton} onPress={addExpense}>
          <Text style={styles.addButtonLabel}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
      <ScrollView style={styles.listArea}>
        <Expenses expenses={expenses} onPressExpense={deleteExpense} />
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


