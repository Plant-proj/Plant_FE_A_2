// 2. 메인 페이지 - 달력 기반 수입/지출 확인
// - 일자별 수입/지출 총합 금액 표시
// - 날짜별 수입/지출 금액, 카테고리
// - 카테고리: 이체, 교육, 미용, 취미, 교통, 주거, 통신, 식비, 기타

import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { dummyDailySummaries, RecordItem } from '../models/records';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const DATES = dummyDailySummaries.map(d => d.date);

// 날짜별 수입/지출 합계 계산
const getIncomeExpenseMap = () => {
  const map: Record<string, { income: number; expense: number }> = {};
  dummyDailySummaries.forEach(day => {
    let income = 0;
    let expense = 0;
    day.records.forEach(r => {
      if (r.type === 'income') income += r.amount;
      else expense += r.amount;
    });
    map[day.date] = { income, expense };
  });
  return map;
};

export default function CalendarPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(DATES[0]);
  // 선택된 날짜의 데이터 찾기 (없으면 기본값)
  const selectedSummary = dummyDailySummaries.find(d => d.date === selectedDate);
  const totalBalance = selectedSummary ? selectedSummary.totalBalance : 0;
  const records = selectedSummary ? selectedSummary.records : [];

  // 디버깅용 콘솔 출력
  console.log('selectedDate:', selectedDate);
  console.log('dummyDailySummaries:', dummyDailySummaries.map(d => d.date));
  console.log('selectedSummary:', selectedSummary);

  // 날짜별 수입/지출 합계
  const incomeExpenseMap = getIncomeExpenseMap();

  // markedDates에 customStyles로 수입/지출 표시
  const markedDates = DATES.reduce((acc, date) => {
    const isSelected = selectedDate === date;
    const { income, expense } = incomeExpenseMap[date] || { income: 0, expense: 0 };
    acc[date] = {
      selected: isSelected,
      selectedColor: isSelected ? '#888' : undefined,
      customStyles: {
        container: {},
        text: {},
        // 날짜 아래 텍스트
        // 아래 dots 대신 customStyles.text로 표시
      },
      // react-native-calendars의 custom marking
      // 아래 dots 대신 customStyles.text로 표시
      // dots: [
      //   income > 0 ? { key: 'income', color: '#2563eb' } : null,
      //   expense > 0 ? { key: 'expense', color: '#888' } : null,
      // ].filter(Boolean),
      // customStyles는 CalendarProvider/CalendarList에서만 동작
      // 하지만 dayComponent로 완전 커스텀 가능
    };
    return acc;
  }, {} as any);

  // dayComponent로 날짜 셀 커스텀
  const renderDay = (date: any, state: string | undefined) => {
    const dateStr = date.dateString;
    const { income, expense } = incomeExpenseMap[dateStr] || { income: 0, expense: 0 };
    return (
      <TouchableOpacity onPress={() => setSelectedDate(dateStr)} activeOpacity={0.7}>
        <View style={{ alignItems: 'center', minWidth: 36 }}>
          <Text style={{ color: state === 'disabled' ? '#ccc' : '#222', fontWeight: dateStr === selectedDate ? 'bold' : 'normal', fontSize: 15 }}>
            {date.day}
          </Text>
          <Text style={{ fontSize: 10, color: '#22c55e', fontWeight: 'bold', marginTop: 5 }}>
            {income > 0 ? `+${income.toLocaleString()}` : ''}
          </Text>
          <Text style={{ fontSize: 10, color: '#ef4444', marginTop: 2 }}>
            {expense > 0 ? `-${expense.toLocaleString()}` : ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: RecordItem }) => (
    <View style={styles.recordRow}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.amount, item.type === 'income' ? styles.income : styles.expense]}>
          {item.type === 'income' ? '+' : '-'}₩{item.amount.toLocaleString()}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.memo}>{item.memo}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end', minWidth: 60 }}>
        <Text style={styles.date}>{item.date.replace(/-/g, '/')}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>수입/지출 기록</Text>
        {/* 잔고 - 왼쪽 정렬, 박스 제거 */}
        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>총 잔고</Text>
          <Text style={styles.balance}>{totalBalance.toLocaleString()}원</Text>
        </View>
        {/* 안내문구 */}
        <Text style={styles.guideText}>날짜를 선택하면 해당 날의 기록이 표시됩니다.</Text>
        {/* 달력 */}
        <Calendar
          current={selectedDate}
          onDayPress={day => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          dayComponent={({ date, state }) => renderDay(date, state)}
          style={{ marginHorizontal: 10, marginBottom: 12, borderRadius: 16, elevation: 1, backgroundColor: '#f8fafc' }}
          theme={{
            backgroundColor: '#f8fafc',
            calendarBackground: '#f8fafc',
            selectedDayBackgroundColor: '#888',
            todayTextColor: '#222',
            arrowColor: '#888',
            textDayFontSize: 15,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 13,
          }}
          renderArrow={direction => (
            <Ionicons
              name={direction === 'left' ? 'chevron-back' : 'chevron-forward'}
              size={24}
              color="#888"
              style={{ marginHorizontal: 4 }}
            />
          )}
        />
        {/* 리스트 */}
        <View style={{paddingHorizontal: 18, marginTop: 8}}>
          {/* + 기록 추가하기 버튼 */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f4f6fa',
              borderRadius: 12,
              paddingVertical: 16,
              paddingHorizontal: 18,
              marginBottom: 16,
              shadowColor: '#000',
              shadowOpacity: 0.04,
              shadowRadius: 4,
              elevation: 1,
            }}
            activeOpacity={0.85}
            onPress={() => router.push('/record-detail')}
          >
            <Ionicons name="add-circle" size={28} color="#2563eb" style={{marginRight: 10}} />
            <Text style={{fontSize: 17, color: '#2563eb', fontWeight: 'bold'}}>기록 추가하기</Text>
          </TouchableOpacity>
          {records.length === 0 ? (
            <Text style={{ color: '#bbb', textAlign: 'center', marginTop: 32 }}>기록이 없습니다.</Text>
          ) : (
            records.map(item => (
              <View key={item.id} style={{ marginBottom: 12 }}>{renderItem({ item })}</View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 18,
    marginLeft: 20,
    marginBottom: 8,
    color: '#222',
  },
  balanceBox: {
    alignItems: 'flex-start',
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 20,
    // 배경, 그림자, 테두리 제거
    backgroundColor: 'transparent',
    borderRadius: 0,
    paddingVertical: 0,
    marginHorizontal: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  balanceLabel: {
    fontSize: 15,
    color: '#888',
    marginBottom: 2,
  },
  balance: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
    textAlign: 'left',
  },
  guideText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'left',
    marginLeft: 20,
    marginBottom: 8,
  },
  recordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 10,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: '#f1f5f9',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  income: {
    color: '#22c55e',
  },
  expense: {
    color: '#ef4444',
  },
  date: {
    fontSize: 12,
    color: '#bbb',
    marginTop: 2,
  },
  category: {
    fontSize: 13,
    color: '#888',
    fontWeight: 'bold',
  },
  dot: {
    fontSize: 13,
    color: '#bbb',
    marginHorizontal: 4,
  },
  memo: {
    fontSize: 13,
    color: '#888',
  },
  separator: {
    height: 8,
    backgroundColor: 'transparent',
  },
}); 