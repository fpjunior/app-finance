import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TotalCardStyle from '../styles/TotalCardStyle'

const TotalCard = ({ title, total }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.totalExpenses}>R$ {total.toFixed(2)}</Text>
    </View>
  );
};

const styles = TotalCardStyle

export default TotalCard;
