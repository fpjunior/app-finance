import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

export const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, value REAL, expenseType TEXT, paymentType TEXT, date TEXT);"
    );
  });
};

export const addExpense = (description, value, expenseType, paymentType, date) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO expenses (description, value, expenseType, paymentType, date) VALUES (?, ?, ?, ?, ?)",
        [description, parseFloat(value), expenseType, paymentType, date],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve();
          } else {
            reject(new Error("Failed to add expense."));
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const deleteExpense = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM expenses WHERE id = ?",
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve();
          } else {
            reject(new Error("Failed to delete expense."));
          }
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const getExpenses = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM expenses;", [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
};
