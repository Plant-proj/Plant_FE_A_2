// 3. 수입/지출 상세 기록 페이지
// - 특정 날짜에 수입/지출 추가, 수정, 삭제
// - 카테고리 선택(드롭다운/아이콘)
// - 필드: 날짜, 금액, 카테고리

import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, Animated, Easing } from 'react-native';
import { useState, useRef } from 'react';
// DateTimePickerModal은 타입 선언이 없으므로 require로 불러옴
const DateTimePickerModal = require('react-native-modal-datetime-picker').default;
import { Calendar } from 'react-native-calendars';

export interface RecordDetail {
  type: 'income' | 'expense';
  category: string;
  title: string;
  amount: number;
  memo: string;
  date: number;
}

export const dummyRecord: RecordDetail = {
  type: 'expense',
  category: '식비',
  title: '7월12일점심',
  amount: 30000,
  memo: '점심',
  date: 1752297682,
};

const categories = ['식비', '교통', '문화', '기타'];

export default function RecordDetailPage() {
  // 오늘 날짜를 기본값으로
  const today = Math.floor(Date.now() / 1000);
  const [form, setForm] = useState<RecordDetail>({...dummyRecord, date: today});
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [tempSelectedDate, setTempSelectedDate] = useState(form.date); // 임시 선택 날짜

  // 입력란 포커스 관리
  const amountRef = useRef<TextInput>(null);
  const memoRef = useRef<TextInput>(null);

  // 날짜 변환
  const dateString = new Date(form.date * 1000).toLocaleDateString();
  // 캘린더에서 선택된 날짜 yyyy-mm-dd
  const selectedDateStr = new Date(tempSelectedDate * 1000).toISOString().slice(0, 10);

  // Animated SlideUp
  const slideAnim = useRef(new Animated.Value(400)).current; // 400px 아래에서 시작

  // 캘린더 열기/닫기 애니메이션
  const openCalendar = () => {
    setCalendarVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 320,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };
  const closeCalendar = () => {
    Animated.timing(slideAnim, {
      toValue: 400,
      duration: 220,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => setCalendarVisible(false));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}}>
        <Text style={styles.header}>수입/지출 입력</Text>
        <View style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>수입/지출 이름</Text>
            <TextInput
              style={styles.inputToss}
              value={form.title}
              onChangeText={text => setForm({ ...form, title: text })}
              placeholder="예: 7월12일점심"
              placeholderTextColor="#d1d5db"
              returnKeyType="next"
              onSubmitEditing={() => amountRef.current?.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>카테고리</Text>
            <View style={styles.selectBoxToss}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryPill, form.category === cat && styles.categoryPillSelected]}
                  onPress={() => setForm({ ...form, category: cat })}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.categoryPillText, form.category === cat && styles.categoryPillTextSelected]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.inputGroup}>
        <Text style={styles.header}>수입/지출 기록</Text>
            <TextInput
              ref={amountRef}
              style={styles.inputToss}
              value={form.amount.toString()}
              onChangeText={text => setForm({ ...form, amount: Number(text.replace(/[^0-9]/g, '')) })}
              placeholder="예: 30000"
              placeholderTextColor="#d1d5db"
              keyboardType="numeric"
              returnKeyType="next"
              onSubmitEditing={() => memoRef.current?.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>메모</Text>
            <TextInput
              ref={memoRef}
              style={styles.inputToss}
              value={form.memo}
              onChangeText={text => setForm({ ...form, memo: text })}
              placeholder="메모 입력"
              placeholderTextColor="#d1d5db"
              returnKeyType="done"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>날짜</Text>
            <TouchableOpacity onPress={openCalendar} style={styles.datePill} activeOpacity={0.8}>
              <Text style={styles.datePillText}>{dateString}</Text>
            </TouchableOpacity>
          </View>
        </View>


        {/* 하단 고정 캘린더 (Animated) */}
        {isCalendarVisible && (
          <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slideAnim }] }]}>
            <Calendar
              current={selectedDateStr}
              onDayPress={day => {
                // day.dateString: yyyy-mm-dd
                const selected = new Date(day.dateString).getTime() / 1000;
                setTempSelectedDate(Math.floor(selected));
              }}
              markedDates={{
                [selectedDateStr]: {selected: true, selectedColor: '#222'},
              }}
              theme={{
                backgroundColor: '#fff',
                calendarBackground: '#fff',
                selectedDayBackgroundColor: '#222',
                todayTextColor: '#2563eb',
                arrowColor: '#222',
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 13,
              }}
              style={{ borderRadius: 16, marginBottom: 12 }}
            />
            <View style={styles.calendarBtnRow}>
              <TouchableOpacity onPress={closeCalendar} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>닫기</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setForm({ ...form, date: tempSelectedDate }); closeCalendar(); }} style={styles.confirmBtn}>
                <Text style={styles.confirmBtnText}>확인</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f6fa',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 18,
    marginLeft: 20,
    marginBottom: 8,
    color: '#222',
  },
  formCard: {
      backgroundColor: '#fff',
      borderRadius: 22,
      margin: 18,
      padding: 22,
      shadowColor: '#000',
      shadowOpacity: 0.07,
      shadowRadius: 12,
      elevation: 4, 
  },
  inputGroup: {
    marginBottom: 28,
  },
  label: {
    fontSize: 15,
    color: '#888',
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 2,
  },
  inputToss: {
    backgroundColor: '#f4f6fa',
    borderRadius: 12,
    fontSize: 17,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    paddingHorizontal: 16,
    color: '#222',
    borderWidth: 0,
  },
  selectBoxToss: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryPill: {
    backgroundColor: '#f4f6fa',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryPillSelected: {
    backgroundColor: '#222',
  },
  categoryPillText: {
    color: '#888',
    fontSize: 15,
    fontWeight: '500',
  },
  categoryPillTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  datePill: {
    backgroundColor: '#f4f6fa',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  datePillText: {
    color: '#222',
    fontSize: 16,
    fontWeight: '500',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarModalBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    width: 320,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  closeBtn: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#f4f6fa',
  },
  closeBtnText: {
    color: '#222',
    fontSize: 15,
    fontWeight: 'bold',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: 18,
    paddingBottom: 24,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  calendarBtnRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 4,
    marginRight: 2,
  },
  confirmBtn: {
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
}); 