import { AntDesign } from '@expo/vector-icons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { auth, db } from '../config/firebaseConfig';
import { ModalContent } from '../src/components/newModal/ModalContent';
import { ReminderCard } from '../src/components/ReminderCard';
import { TopBar } from '../src/components/TopBar';
import { TextH2, TextThin } from '../src/utils/styles/FontStyles';

export const Home = ({ navigation }: any) => {
  const [response, setResponse] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const getReminders = async () => {
    const q = query(
      collection(db, 'reminders'),
      where('createdBy', '==', auth.currentUser?.uid)
    );
    getDocs(q).then((data) => {
      setResponse(
        data.docs.map((item) => {
          return item.data();
        }) as any
      );
    });
  };

  useEffect(() => {
    getReminders();
    console.log(response);
  }, []);

  return (
    <SafeAreaView>
      <Image
        style={{
          position: 'absolute',
          top: response.length ? 500 : 150,
        }}
        source={require('../assets/images/Wave.png')}
      />
      <View
        style={{
          position: 'relative',
          marginHorizontal: 10,
        }}
      >
        <TopBar />
        {response.length ? (
          <View style={{ marginTop: 60 }}>
            <TextH2 color="black">Your reminders:</TextH2>
            {response.map((reminder, key) => {
              return (
                <ReminderCard
                  description="asdsd"
                  key={key}
                  creator={auth.currentUser.displayName}
                  title={reminder.title}
                />
              );
            })}
          </View>
        ) : (
          <View style={styles.Box}>
            <View>
              <View style={{ paddingBottom: 10 }}>
                <TextH2 color="white">You don't have any notes</TextH2>
              </View>
              <TextThin color="white">Create one today</TextThin>
            </View>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#F5F5F5',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
            >
              <AntDesign
                onPress={() => navigation.navigate('Messages')}
                name="plus"
                size={24}
                color="black"
              />
            </View>
          </View>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={{ fontSize: 20 }}>X</Text>
              </Pressable>
              <ModalContent />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageMargin: {
    marginLeft: 10,
  },
  Box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#1B1D29',
    width: '100%',
    padding: 20,
    marginVertical: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  marginTop: {
    marginTop: 40,
    marginHorizontal: 10,
  },
  modalView: {
    width: 340,
    height: 600,
    margin: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 2,
    //   height: 2,
    // },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
});
