// styles.js
import { StyleSheet } from 'react-native';
import Constants from "expo-constants";

export default StyleSheet.create({
  formGroupRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // marginBottom: 16,
    marginBottom: 0,
  },
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
    flex: 1,
    marginRight: 8,
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
    marginTop: -590
  },
});
