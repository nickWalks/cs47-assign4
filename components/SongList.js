import { StyleSheet, Text, FlatList, View, Image, ScrollView, SafeAreaView, Pressable } from "react-native";
import Colors from "../Themes/colors";
import Images from "../Themes/images";
import millisToMinutesAndSeconds from '../utils/millisToMinuteSeconds';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SongList({ tracks }) {
    const navigation = useNavigation();

    const SongInfo = ({ songName, artist }) => (
        < View style={styles.songInfo} >
            <Text numberOfLines={1} style={styles.songName}>{songName}</Text>
            <Text style={styles.artistName}>{artist}</Text>
        </View >
    );

    function onPlayPress(e, preview_url) {
        e.stopPropagation();
        navigation.navigate("Song preview", {songPreview: preview_url});
    }

    const renderItem = ({ item, index }) => (
        <Pressable style={styles.songItem} onPress={() => navigation.navigate("Song details", {external_url: item.external_urls.spotify})}>
        {console.log(item)}
            <Pressable style={styles.playButton} onPress={(e) => onPlayPress(e, item.preview_url)}>
                <AntDesign name="caretright" size={12} color="black" />
            </Pressable>
            <Image style={styles.albumImage} resizeMode="contain" source={{ uri: item.album.images[1].url }} />
            <SongInfo songName={item.name} artist={item.artists[0].name} />
            <View style={styles.lastBox}>
                <Text numberOfLines={1} style={styles.albumName}>{item.album.name}</Text>
            </View>
            <Text style={styles.time}>{millisToMinutesAndSeconds(item.duration_ms)}</Text>


        </Pressable>

    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image resizeMode="cover" style={styles.spotifyLogo} source={Images.spotify} />
                <Text style={styles.headerText}>My Top Album</Text>
            </View>

            <FlatList
                data={tracks}
                renderItem={(item, index) => renderItem(item, index)}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width: '100%'
    },
    songItem: {
        color: Colors.gray,
        backgroundColor: Colors.background,
        width: '100%',
        height: 70,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'pink',
        flex: 1
    },
    albumImage: {
        height: '100%',
        width: '10%',
    },
    songInfo: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '50%'
    },
    songName: {
        color: 'white'
    },
    songNum: {
        color: Colors.gray,
        width: '5%',
    },
    albumName: {
        color: Colors.gray,
        height: '100%',
        textAlignVertical: 'center'
    },
    artistName: {
        color: Colors.gray,
    },
    lastBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',
        paddingRight: 10,
        marginLeft: 10
    },
    time: {
        color: Colors.gray
    },
    spotifyLogo: {
        height: 19,
        width: 19,
        marginRight: 10
    },
    headerText: {
        color: 'white'
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    playButton: {
       marginRight: 5,
       backgroundColor: Colors.spotify,
       width: 20,
       height: 20,
       borderRadius: 10,
       overflow: 'hidden',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center'
    }
});
