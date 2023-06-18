import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  expenseItemDespesa: {
    backgroundColor: '#f5dadb', // Change to the desired color for expenses
  },
  expenseItemReceita: {
    backgroundColor: '#c6f7d6', // Change to the desired color for revenues
  },

    sectionContainer: {
      marginBottom: 16,
      marginHorizontal: 16,
    },
    sectionHeading: {
      fontSize: 18,
      marginBottom: 8,
    },
    expenseItem: {
      backgroundColor: '#fff',
      borderRadius: 4,
      padding: 6,
      marginVertical: 5,
      shadowOffset: { width: 20, height: 2 },
      shadowOpacity: 0.9,
      shadowRadius: 8,
      elevation: 10,
 
      marginBottom: 2,
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