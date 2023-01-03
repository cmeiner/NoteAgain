import React from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { auth } from '../config/firebaseConfig';
import { FormButton } from '../src/components/small/FormButton';
import { TopBar } from '../src/components/TopBar';
import { TextH1, TextH2 } from '../src/utils/styles/FontStyles';

export const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          position: 'absolute',
          top: 500,
        }}
        source={require('../assets/images/Wave.png')}
      />
      <View style={{marginHorizontal: 10}}>
        <TopBar settings={true} />
      </View>
      <View style={{marginTop: 40, marginHorizontal: 10, height: '50%', alignItems: "center", justifyContent: "center"}}>
        <Image style={{width: 180, height: 180, borderRadius: 10}} source={require('../assets/images/placeholder-profile.jpg')} />
        <View style={{height: 20}} />
        <TextH2 color='black'>{auth.currentUser.displayName}</TextH2>
        <FormButton width='240px' title='Share' onPress={() => console.log('Sawww dude')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
