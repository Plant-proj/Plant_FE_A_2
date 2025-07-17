import { View, Text, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useState } from 'react';

export default function ReportTab({
  year, month, setYear, setMonth, categories, income, expense, balance, styles: parentStyles
}: any) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const styles = { ...parentStyles, ...localStyles };

  return (
    <>
      {/* 연/월 한 줄, 클릭 시 달력 */}
      <View style={styles.yearMonthRowCustom}>
        <TouchableOpacity
          onPress={()=>setDatePickerVisible(true)}
          activeOpacity={0.8}
          style={styles.yearMonthBtn}
        >
          <Text style={styles.yearMonthText}>{year}년 {month}월 ▾</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={datePickerVisible}
          mode="date"
          display="spinner"
          onConfirm={date => {
            setDatePickerVisible(false);
            setYear(date.getFullYear());
            setMonth(date.getMonth()+1);
          }}
          onCancel={()=>setDatePickerVisible(false)}
        />
      </View>

 {/* 라인차트 카드 */}
 <View style={styles.sectionCard}>
        {/* 합계 카드 */}
   
        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>이번달 수입 - 지출</Text>
          <Text style={styles.balanceValue}>₩{income.toLocaleString()} - ₩{expense.toLocaleString()}</Text>
          <Text style={styles.balanceResult}>= ₩{balance.toLocaleString()}</Text>
        </View>
     

        <View style={{alignItems:'center', marginBottom: 24}}>
          <LineChart
            data={{
              labels: ['', '', '', ''],
              datasets: [
                { data: [30, 50, 40, 60], color: () => '#2563eb', strokeWidth: 3 },
                { data: [20, 40, 35, 50], color: () => '#e5e7eb', strokeWidth: 3 },
              ],
              legend: ['현재 사용량', '지난달/연 사용량'],
            }}
            width={Dimensions.get('window').width - 60}
            height={120}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
              labelColor: () => '#888',
              propsForDots: { r: '6', strokeWidth: '2', stroke: '#fff' },
              propsForBackgroundLines: { stroke: '#f1f5f9' },
              decimalPlaces: 0,
            }}
            bezier
            withVerticalLines={false}
            withHorizontalLines={true}
            withShadow={false}
            style={{ borderRadius: 16, marginVertical: 8 }}
          />
          <View style={{flexDirection:'row', marginTop: 2, marginLeft: 8}}>
            <View style={{width:12, height:12, borderRadius:6, backgroundColor:'#2563eb', marginRight:4}} />
            <Text style={{color:'#2563eb', fontSize:13, fontWeight:'bold', marginRight:12}}>현재 사용량</Text>
            <View style={{width:12, height:12, borderRadius:6, backgroundColor:'#e5e7eb', marginRight:4}} />
            <Text style={{color:'#888', fontSize:13, fontWeight:'bold'}}>지난달/연 사용량</Text>
          </View>
        </View>
      </View>
      
      

      {/* 월 변경 모달 */}

      {/* 파이차트 카드 */}
      <View style={styles.sectionCard}>
      <Text style={{color:'#2563eb', fontSize:22, fontWeight:'bold', marginBottom:2}}>
                ₩{categories.reduce((sum:number,cat:any)=>sum+cat.amount,0).toLocaleString()}
              </Text>
              <Text style={{color:'#888', fontSize:14, fontWeight:'bold'}}>이번달 지출</Text>
        <View style={{width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 0, marginBottom: 16}}>
          <View style={{width: 240, height: 240, alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
            <PieChart
              data={categories.map((cat:any) => ({
                name: cat.name,
                population: Number(cat.amount),
                color: cat.color,
                legendFontColor: '#222',
                legendFontSize: 13,
              }))}
              width={240}
              height={240}
              chartConfig={{
                color: () => '#222',
                labelColor: () => '#888',
                backgroundColor: 'transparent',
                backgroundGradientFrom: 'transparent',
                backgroundGradientTo: 'transparent',
              }}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'0'}
              hasLegend={false}
              center={[55, 0]}
              style={{ borderRadius: 120, alignSelf: 'center', overflow: 'visible' }}
            />
            {/* 중앙 금액 */}
            <View style={{
              position: 'absolute',
              left: 0, right: 0, top: 0, bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              height: '100%',
            }}>
              
            </View>
          </View>
          {/* 커스텀 legend */}
          <View style={{flexDirection:'row', justifyContent:'center', marginTop:12, flexWrap:'wrap'}}>
            {categories.map((cat:any) => (
              <View key={cat.name} style={{flexDirection:'row', alignItems:'center', marginHorizontal:8, marginBottom:4}}>
                <View style={{width:12, height:12, borderRadius:6, backgroundColor:cat.color, marginRight:4}} />
                <Text style={{color:'#222', fontWeight:'bold', fontSize:14, marginRight:2}}>{cat.name}</Text>
                <Text style={{color:'#888', fontSize:13}}>{cat.percent}%</Text>
              </View>
            ))}
          </View>
        </View>
        {/* 카테고리별 박스 카드 */} 
        {categories.map((item:any) => (
          <View key={item.name} style={styles.catCard}>
            <View style={[styles.catDot, {backgroundColor: item.color}]} />
            <View style={{flex:1}}>
              <Text style={styles.catName}>{item.name}</Text>
              <Text style={styles.catPercent}>{item.percent}%</Text>
            </View>
            <Text style={styles.catAmount}>₩{item.amount.toLocaleString()}</Text>
          </View>
        ))}
      </View>


     
    </>
  );
}

const localStyles = StyleSheet.create({
  yearMonthRowCustom: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 12,
    width: '100%',
  },
  yearMonthBtn: {
    paddingVertical: 4,
    paddingHorizontal: 22,
    borderRadius: 16,
    backgroundColor:'#f4f6fa',
    width: '100%',
  },
  yearMonthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
  },
}); 