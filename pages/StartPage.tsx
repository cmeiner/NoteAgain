import { useAssets } from 'expo-asset';
import { View, StyleSheet, Image } from 'react-native';
import { Logo, ProfilePic } from '../components/SvgLibary';
import { TextH2, TextP, TextThin } from '../src/utils/styles/FontStyles';
import { AntDesign } from '@expo/vector-icons';

const StartPage = () => {
  // const [assets, error] = useAssets([require('./assets/images/Wave.png')]);
  // console.log(assets);
  return (
    <View>
      {/* // * Start Page Navbar */}
      <View style={styles.flexRow}>
        <View style={styles.flexRow}>
          <ProfilePic />
          <View style={styles.imageMargin}>
            <TextP color="black">Welcome back</TextP>
            <TextH2 color="black">Meiner, Christian</TextH2>
          </View>
        </View>
        <Logo />
      </View>
      {/* // * Start Page Navbar */}
      {/* // TODO Check if they have reminders or todo, if not show this, else show the reminders. */}
      <View style={{ position: 'relative', height: '70%', marginTop: 60 }}>
        <Image
          style={{
            position: 'absolute',
            height: '100%',
            width: '120%',
            left: -20,
          }}
          source={require('../assets/images/Wave.png')}
        />
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
            <AntDesign name="plus" size={24} color="black" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default StartPage;

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
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 170,
  },
});
