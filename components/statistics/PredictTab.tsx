import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const UNIT_LABELS = ['연', '월', '주', '일'];
const CHART_DATA = {
  연: {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
    data: [300, 350, 320, 400, 420, 380],
    avg: 40000,
    predict: 41000,
  },
  월: {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
    data: [30, 50, 40, 60, 55, 70],
    avg: 3500,
    predict: 3700,
  },
  주: {
    labels: ['1주', '2주', '3주', '4주'],
    data: [8, 12, 10, 15],
    avg: 900,
    predict: 950,
  },
  일: {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    data: [2, 3, 2, 4, 3, 5, 2],
    avg: 120,
    predict: 130,
  },
};

export default function PredictTab() {
  const [unit, setUnit] = useState<'연'|'월'|'주'|'일'>('연');
  const chart = CHART_DATA[unit];

  return (
    <View style={{flex:1, backgroundColor:'#f4f6fa', minHeight:'100%'}}>
      {/* 단위 선택 pill */}
      <View style={{flexDirection:'row', justifyContent:'center', marginTop: 0, marginBottom: 24}}>
        {UNIT_LABELS.map(u => (
          <TouchableOpacity
            key={u}
            style={{
              backgroundColor: unit === u ? '#2563eb' : '#fff',
              borderRadius: 18,
              paddingHorizontal: 22,
              paddingVertical: 10,
              marginHorizontal: 6,
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 4,
              elevation: 1,
              borderWidth: unit === u ? 0 : 1,
              borderColor: unit === u ? '#2563eb' : '#e5e7eb',
            }}
            onPress={()=>setUnit(u as any)}
            activeOpacity={0.85}
          >
            <Text style={{color: unit === u ? '#fff' : '#2563eb', fontWeight:'bold', fontSize:18, letterSpacing:1}}>{u}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* 카드 */}
      <View style={{backgroundColor:'#fff', borderRadius:24, marginHorizontal:16, marginBottom:24, padding:28, shadowColor:'#000', shadowOpacity:0.07, shadowRadius:10, elevation:3}}>
        {/* 평균 지출 금액 */}
        <Text style={{fontSize: 22, fontWeight: 'bold', color: '#222', marginBottom: 8, letterSpacing:0.5}}>
          평균 {unit} 지출 금액
        </Text>
        <Text style={{fontSize: 32, fontWeight: 'bold', color: '#2563eb', marginBottom: 18, letterSpacing:1}}>
          ₩{chart.avg.toLocaleString()}
        </Text>
        {/* 꺾은선 그래프 */}
        <View style={{alignItems:'center', marginBottom: 24}}>
          <LineChart
            data={{
              labels: chart.labels,
              datasets: [
                { data: chart.data, color: () => '#2563eb', strokeWidth: 4 },
              ],
            }}
            width={Dimensions.get('window').width - 80}
            height={180}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
              labelColor: () => '#888',
              propsForDots: { r: '7', strokeWidth: '3', stroke: '#fff' },
              propsForBackgroundLines: { stroke: '#f1f5f9' },
              decimalPlaces: 0,
            }}
            bezier
            withVerticalLines={false}
            withHorizontalLines={true}
            withShadow={false}
            style={{ borderRadius: 18, marginVertical: 8, backgroundColor:'#fff' }}
          />
        </View>
        {/* 예측 문구 */}
        <Text style={{fontSize: 19, color: '#222', marginBottom: 20, fontWeight:'bold', letterSpacing:0.5}}>
          다음 {unit}은 약 <Text style={{color:'#2563eb'}}>₩{chart.predict.toLocaleString()}</Text>  {'\n'}소비할 예정입니다.
        </Text>
        {/* AI 추천 문구 placeholder */}
        <View style={{backgroundColor:'#f4f6fa', borderRadius:16, padding:22, alignItems:'center', marginBottom: 8, borderWidth:1, borderColor:'#e5e7eb'}}>
          <Text style={{color:'#888', fontSize:17, textAlign:'center', fontWeight:'bold', letterSpacing:0.2}}>
            (AI 추천) 이러이러한 소비를 줄이고 부업을 하세요 등
          </Text>
        </View>
      </View>
    </View>
  );
} 