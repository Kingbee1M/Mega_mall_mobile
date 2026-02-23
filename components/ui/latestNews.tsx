import { formatDate } from "@/functions/dateformat"
import { Image, Text, TouchableOpacity, View } from "react-native"

export default function LatestNews () {
    const news = [
        {title: 'Philosophy That Addresses Topics Such As Goodness', date: '2/5/2023', time: '2:20', desc: 'Ziggleblop drufflepink, snorpleskratch wibberclomp, Fiddlewhip trundlenox, zoodlefrap plinchersnap, Gribblebump squaffleshank, twindlecrash plooperswit, Snazzyfizz florpelquink, wobblerspuff zindlewhack, Frizzledrop trunbleswack, whindlequap crabblesmash.', image: require("../../assets/images/news(2).png")},
        {title: 'Many Inquiries Outside Of Academia Are Philosophical In The Broad Sense', date: '2/5/2023', time: '2:20', desc: 'Ziggleblop drufflepink, snorpleskratch wibberclomp, Fiddlewhip trundlenox, zoodlefrap plinchersnap, Gribblebump squaffleshank, twindlecrash plooperswit, Snazzyfizz florpelquink, wobblerspuff zindlewhack, Frizzledrop trunbleswack, whindlequap crabblesmash.', image: require("../../assets/images/news(3).png")},
        {title: 'Tips Merawat Bodi Mobil agar Tidak Terlihat Kusam', date: '2/5/2023', time: '2:20', desc: 'Ziggleblop drufflepink, snorpleskratch wibberclomp, Fiddlewhip trundlenox, zoodlefrap plinchersnap, Gribblebump squaffleshank, twindlecrash plooperswit, Snazzyfizz florpelquink, wobblerspuff zindlewhack, Frizzledrop trunbleswack, whindlequap crabblesmash.', image: require("../../assets/images/news(4).png")},
    ]
    return (
        <View style={{width: '90%', alignItems: 'center'}}>
            <Text style={{fontSize: 26, fontWeight: 600, marginBottom: 20, width: '100%'}}>Latest News</Text>
            <View style={{display: 'flex', gap: 20, width: '100%', justifyContent: 'space-between'}}>
            {news.map((item, index) => (
                    <TouchableOpacity key={index}>
                        <View style={{display: 'flex', flexDirection: 'row', gap: 7, width: '100%'}}>
                            <View style={{display: 'flex', gap: 2, width: '70%'}}>
                                <Text style={{width: '100%' ,fontSize: 20, fontWeight: 500}}>{item.title}</Text>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{width: '100%'}}>{item.desc}</Text>
                                <Text style={{color: '#838589', fontSize: 12}}>{formatDate(item.date)}</Text>
                            </View>
                            <View>
                                <Image source={item.image} width={70} height={70} />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={{marginTop: 30, width: 200}}>
                <Text style={{borderWidth: 2, borderColor: '#0C1A30', textAlign: 'center', padding: 10, borderRadius: 7}}>See All News</Text>
            </TouchableOpacity>
        </View>
    )
}