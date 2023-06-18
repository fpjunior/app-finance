import React, {useState, useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import MyModalStyle from '../styles/MyModalStyle';

const MyModal = ({ visible, onClose, modalText }) => {
  const [modalVisible, setModalVisible] = useState(false);
  
    // Atualiza o estado do modal quando a prop "visible" é alterada
    useEffect(() => {
      setModalVisible(visible);
    }, [visible]);
  
    const closeModal = () => {
      setModalVisible(false);
      onClose();
    };

   return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal foi fechado');
          closeModal();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalText}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}>
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = MyModalStyle

export default MyModal;