import React, {useState} from 'react';
import { View, 
        Text,
        Image,
        StyleSheet,
        TouchableOpacity,
        Dimensions,
        FlatList,
        StatusBar } from 'react-native';
import AppLogoHeader from '../../components/AppLogoHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Data } from '../../utils/ExchangeData';



const ExchangeScreen = ({navigation}) => {

  const [selectedId, setSelectedId] = useState(null);

  const Icon = ({name, color, size, style, redirection}) => {
    return (
    <TouchableOpacity style={style} onPress={() => navigation.navigate(redirection)}>
        <Ionicons 
            name={name}
            color={color}
            size={size}
        />
    </TouchableOpacity>
    )
  }

  /// flatlist render item
  const renderItem = ({ item, onPress, backgroundColorr, textColor }) => {
    const backgroundColor = item.id === selectedId ? "#ED7F10" : "#303030";
    const color = item.id === selectedId ? 'white' : '#efefef';

    return (
      <TouchableOpacity onPress={onPress} style={[styles.renderItem, backgroundColorr]} >
        <Image source={item.image} style={styles.itemImage} />
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const FloatedIcon = ({ name, redirection }) => {
    return(
    <TouchableOpacity 
    onPress={() => navigation.navigate(redirection)}
        style={styles.floatedIcon}>
        <Ionicons  
            name={name}
            size={30}
            color='#fff'
        />
    </TouchableOpacity>
    )
  }


  return (

    <>
      <StatusBar backgroundColor='#000' barStyle='light-content' />

      <View style={styles.header}>
            <Text style={styles.headerTitle}>Échangeurs</Text>
        </View>

        <View style={styles.footer}>
          
            <FlatList
              data={Data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
              style={styles.flatList}
            />

            {/* <FloatedIcon name='chatbubble-ellipses' redirection='prechatbot' /> */}

        </View>
    </>
  )
}

export default ExchangeScreen;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  header: {
    width: width,
    height: height * 0.1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    //  borderBottomLeftRadius: width * 0.15,
    //  borderBottomRightRadius: width * 0.15,
    borderColor: 'transparent',
    backgroundColor: '#ED7F10',
    elevation: 30
  },
  headerTitle: {
    color: '#fff',
    fontFamily: 'Avenir Next Bold',
    fontSize: 28
  },
  footer: {
    width: width,
    height: (height - height*0.14),
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  renderItem: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#cecece',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 15
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Avenir Next Bold',
    
  },
  itemImage: {
    width: 35,
    height: 35,
    marginLeft: 5,
    marginRight: 15,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 25
  },
  flatList: {
    width: width,
    height: (height - (height*0.15)) * 0.8,
  },
  floatedIcon: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ED7F10',
    position: 'absolute',
    bottom: height * 0.125,
    right: 20
  }
})