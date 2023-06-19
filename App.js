import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import * as SQLite from "expo-sqlite";
import Expenses from "./Expenses";
import MyModal from './component/MyModal';
import { initDatabase, addExpense, deleteExpense, getExpenses } from "./config/Database";
import TotalCard from './component/TotalCard';
import AppStyle from "./styles/AppStyle";
import { RadioButton } from 'react-native-paper';

const db = SQLite.openDatabase("db.db");
export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  // const [expenseType, setExpenseType] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [date, setDate] = useState("");

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('Hello World!');
  const [selectedExpense, setSelectedExpense] = useState(null);

  const [totalDespesas, setTotalDespesas] = useState(0);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [expenseType, setExpenseType] = useState('despesa');
  const [selectedExpenseType, setSelectedExpenseType] = useState('despesa');



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
      setSelectedExpenseType(selectedExpense.expenseType); // Updated this line
      setExpenseType(selectedExpense.expenseType);
      setPaymentType(selectedExpense.paymentType);
      setDate(selectedExpense.date);
    } else {
      setDescription("");
      setValue("");
      setSelectedExpenseType('despesa'); 
      setExpenseType("");
      setPaymentType("");
      setDate("");
    }
  }, [selectedExpense]);

  const updateExpenses = async () => {
    try {
      const expenses = await getExpenses();
      setExpenses(expenses);
      // Calcular o total das despesas
      const totalDespesas = expenses.reduce((acc, expense) => {
        if (expense.expenseType === 'despesa') {
          return acc + parseFloat(expense.value);
        }
        return acc;
      }, 0);
      setTotalDespesas(totalDespesas);

      // Calcular o total das receitas
      const totalReceitas = expenses.reduce((acc, expense) => {
        if (expense.expenseType === 'receita') {
          return acc + parseFloat(expense.value);
        }
        return acc;
      }, 0);
      setTotalReceitas(totalReceitas);
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
      handleModal(true, "Despesa adicionada com sucesso")
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
  
  const handleDeleteExpense = async (expense) => {
    try {
      await deleteExpense(expense.id);
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
          {/* <Text style={styles.label}>Descrição</Text> */}
          <TextInput
            style={styles.input}
            placeholder="Descrição da despesa"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={styles.formGroupRow}>
          <View style={styles.formGroup}>
            {/* <Text style={styles.label}>Valor</Text> */}
            <TextInput
              style={styles.input}
              placeholder="Valor da despesa"
              keyboardType="numeric"
              value={value}
              onChangeText={setValue}
            />
          </View>
          <View style={styles.formGroup}>
            <View style={styles.fieldset}>
              <View style={styles.radioButtonGroup}>
                <View style={styles.radioButtonContainer}>
                  <RadioButton.Item
                    label="Despesa"
                    value="despesa"
                    status={selectedExpenseType === 'despesa' ? 'checked' : 'unchecked'}
                    onPress={() => setSelectedExpenseType('despesa')}
                    style={styles.radioButton}
                  />
                </View>
                <View style={styles.radioButtonContainer}>
                  <RadioButton.Item
                    label="Receita"
                    value="receita"
                    status={expenseType === 'receita' ? 'checked' : 'unchecked'}
                    onPress={() => setExpenseType('receita')}
                    style={styles.radioButton}
                  />
                </View>
              </View>
            </View>
          </View>

        </View>
        <View style={styles.formGroupRow}>
          <View style={styles.formGroup}>
            <TextInput
              style={styles.input}
              placeholder="Tipo de transação"
              value={paymentType}
              onChangeText={setPaymentType}
            />
          </View>
          <View style={styles.formGroup}>
            {/* <Text style={styles.label}>Data da Despesa</Text> */}
            <TextInput
              style={styles.input}
              placeholder="Data da despesa"
              value={date}
              onChangeText={setDate}
            />
          </View>
        </View>

        <MyModal visible={isModalVisible} onClose={handleCloseModal} modalText={modalText} />

        <Button
          title="Salvar"
          onPress={handleAddExpense}
        />

        <View style={styles.formGroupRow}>
          <View style={styles.formGroup}>
            <TotalCard title="Total Despesas" total={totalDespesas} />
          </View>
          <View style={styles.formGroup}>
            <TotalCard title="Total Receitas" total={totalReceitas} />
          </View>
        </View>

      </ScrollView>
      <ScrollView style={styles.listArea}>
        <Expenses expenses={expenses}
          onPressExpense={handleDeleteExpense}
          selectedExpense={selectedExpense}
          onSelectExpense={setSelectedExpense} />
      </ScrollView>
    </View>
  );
}

const styles = AppStyle
