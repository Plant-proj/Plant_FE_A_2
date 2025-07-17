export enum Category {
  게임 = '게임',
  OTT = 'OTT',
  뮤직 = '뮤직',
  앱 = '앱',
  기타 = '기타',
}

export interface RecordItem {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: Category;
  memo: string;
  date: string; // YYYY-MM-DD
  title: string;
}

export interface DailySummary {
  date: string; // YYYY-MM-DD
  totalBalance: number;
  records: RecordItem[];
}

// 날짜별 더미 데이터 배열
export const dummyDailySummaries: DailySummary[] = [
  {
    date: '2024-12-30',
    totalBalance: 5000,
    records: [
      {
        id: 1,
        type: 'expense',
        amount: 5000,
        category: Category.앱,
        memo: '앱 결제',
        date: '2024-12-30',
        title: '앱',
      },
    ],
  },
  {
    date: '2024-12-31',
    totalBalance: 20000,
    records: [
      {
        id: 2,
        type: 'income',
        amount: 20000,
        category: Category.기타,
        memo: '용돈',
        date: '2024-12-31',
        title: '용돈',
      },
    ],
  },
  {
    date: '2025-01-01',
    totalBalance: 12000,
    records: [
      {
        id: 3,
        type: 'expense',
        amount: 10000,
        category: Category.게임,
        memo: '게임기',
        date: '2025-01-01',
        title: '게임기',
      },
      {
        id: 4,
        type: 'expense',
        amount: 10000,
        category: Category.OTT,
        memo: '넷플릭스',
        date: '2025-01-01',
        title: '넷플릭스',
      },
      {
        id: 5,
        type: 'income',
        amount: 32000,
        category: Category.기타,
        memo: '용돈',
        date: '2025-01-01',
        title: '용돈',
      },
    ],
  },
  {
    date: '2025-01-02',
    totalBalance: 8000,
    records: [
      {
        id: 6,
        type: 'expense',
        amount: 12000,
        category: Category.뮤직,
        memo: '애플뮤직',
        date: '2025-01-02',
        title: '애플뮤직',
      },
      {
        id: 7,
        type: 'income',
        amount: 20000,
        category: Category.기타,
        memo: '용돈',
        date: '2025-01-02',
        title: '용돈',
      },
    ],
  },
  {
    date: '2025-01-03',
    totalBalance: 0,
    records: [],
  },
  {
    date: '2025-01-04',
    totalBalance: 15000,
    records: [
      {
        id: 8,
        type: 'income',
        amount: 15000,
        category: Category.기타,
        memo: '용돈',
        date: '2025-01-04',
        title: '용돈',
      },
    ],
  },
  {
    date: '2025-01-05',
    totalBalance: 7000,
    records: [
      {
        id: 9,
        type: 'expense',
        amount: 8000,
        category: Category.앱,
        memo: '앱 결제',
        date: '2025-01-05',
        title: '앱',
      },
      {
        id: 10,
        type: 'income',
        amount: 15000,
        category: Category.기타,
        memo: '용돈',
        date: '2025-01-05',
        title: '용돈',
      },
    ],
  },
]; 