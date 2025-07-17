export enum Category {
  월급 = "월급",
  식비 = "식비",
  // 필요시 추가: 교통 = "교통", 문화 = "문화", 기타 = "기타"
}

export interface RecordItem {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: Category;
  memo: string;
}

export interface IncomeExpenseData {
  date: string;
  records: RecordItem[];
}

export interface DailyRecordsResponse {
  status: number;
  message: string;
  data: IncomeExpenseData;
}

export interface AddRecordRequest {
  type: 'income' | 'expense';
  category: Category;
  title: string;
  amount: number;
  memo: string;
  date: number;
}

// 더미 데이터 예시
export const dummyDailyRecords: DailyRecordsResponse = {
  status: 200,
  message: "수입/지출 조회가 완료되었습니다",
  data: {
    date: "1751779282",
    records: [
      {
        id: 1,
        type: "income",
        amount: 100000,
        category: Category.월급,
        memo: "알바비"
      },
      {
        id: 2,
        type: "expense",
        amount: 30000,
        category: Category.식비,
        memo: "점심"
      }
    ]
  }
};

export const dummyAddRecordRequest: AddRecordRequest = {
  type: "expense",
  category: Category.식비,
  title: "7월12일점심",
  amount: 30000,
  memo: "점심",
  date: 1752297682
}; 