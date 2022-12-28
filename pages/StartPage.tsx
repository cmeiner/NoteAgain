import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { auth, db } from '../config/firebaseConfig';
import { ReminderCard } from '../src/components/ReminderCard';
import { TopBar } from '../src/components/TopBar';
import { TextH2 } from '../src/utils/styles/FontStyles';

export const StartPage = ({ navigation }: any) => {
  const [response, setResponse] = useState([]);
  const test = async () => {
    const q = query(
      collection(db, 'reminders'),
      where('createdBy', '==', auth.currentUser.uid)
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
    test();
    console.log(response);
  }, []);

  return (
    <SafeAreaView>
      {/* // TODO Check if they have reminders or todo, if not show this, else show the reminders. */}
      <Image
        style={{
          position: 'absolute',
          top: 150,
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
        <View style={{ marginTop: 60 }}>
          <TextH2 color="black">Your reminders:</TextH2>
          {response.map((test, key) => {
            return (
              <ReminderCard
                description="asdsd"
                key={key}
                creator={auth.currentUser.displayName}
                title={test.title}
              />
            );
          })}
        </View>

        {/* <View style={styles.Box}>
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
        </View> */}
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
});
