// 4. 통계 페이지 - 시각화 자료
// - 카테고리별 비율 원형 그래프, 월별 총합 막대 그래프, 수입 vs 지출 비교
// - (추후) LLM 기반 예산 관리 플랜 제안

import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import ReportTab from '../components/statistics/ReportTab';
import PredictTab from '../components/statistics/PredictTab';

const months = [1,2,3,4,5,6,7,8,9,10,11,12];
const categories = [
  { name: '게임기', color: '#3b82f6', amount: 30000, percent: 59 },
  { name: '애플뮤직', color: '#06b6d4', amount: 10000, percent: 30 },
  { name: '넷플릭스', color: '#fb7185', amount: 10000, percent: 1 },
  { name: '기타', color: '#888', amount: 10000, percent: 10 },
];
const income = 52000;
const expense = 40000;
const balance = income - expense;

export default function StatisticsPage() {
  const [tab, setTab] = useState<'report' | 'predict'>('report');
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(1);
  const [monthModal, setMonthModal] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{paddingBottom: 32}} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>수입/지출 기록</Text>

        {/* 탭 */}
        <View style={styles.tabRow}>
          <TouchableOpacity style={[styles.pillTab, tab==='report' && styles.pillTabActive]} onPress={()=>setTab('report')}>
            <Text style={[styles.pillTabText, tab==='report' && styles.pillTabTextActive]}>리포트</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.pillTab, tab==='predict' && styles.pillTabActive]} onPress={()=>setTab('predict')}>
            <Text style={[styles.pillTabText, tab==='predict' && styles.pillTabTextActive]}>예측</Text>
          </TouchableOpacity>
        </View>
        {tab === 'report' ? (
          <ReportTab
            year={year}
            month={month}
            setYear={setYear}
            setMonth={setMonth}
            categories={categories}
            income={income}
            expense={expense}
            balance={balance}
            styles={styles}
          />
        ) : (
          <PredictTab />
        )}
      </ScrollView>
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
    marginBottom: 20,
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    margin: 18,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
    backgroundColor: '#f4f6fa',
    borderRadius: 16,
    padding: 4,
  },
  pillTab: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 100,
    marginHorizontal: 4,
  },
  pillTabActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  pillTabText: {
    fontSize: 16,
    color: '#bbb',
    fontWeight: 'bold',
  },
  pillTabTextActive: {
    color: '#222',
  },
  yearMonthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  yearText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginRight: 8,
  },
  monthPill: {
    backgroundColor: '#f4f6fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthModalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    width: 220,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  monthModalItem: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  monthModalText: {
    fontSize: 17,
    color: '#222',
  },
  pieChartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
    minHeight: 60,
  },
  pieDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: -10,
    borderWidth: 3,
    borderColor: '#fff',
    position: 'absolute',
    top: 0,
  },
  pieChartText: {
    position: 'absolute',
    left: 0, right: 0, top: 40,
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  catCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f6fa',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  catDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  catName: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
    minWidth: 60,
  },
  catAmount: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 8,
    minWidth: 80,
  },
  catPercent: {
    color: '#888',
    fontSize: 13,
    marginLeft: 8,
  },
  balanceBox: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  balanceLabel: {
    color: '#888',
    fontSize: 14,
    marginBottom: 2,
  },
  balanceValue: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
  },
  balanceResult: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 2,
  },
  graphDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    zIndex: 2,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    marginHorizontal: 18,
    marginTop: 18,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
  },
}); 