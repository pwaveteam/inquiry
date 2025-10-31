export interface EstimateStep {
    title: string
    desc: string
    options?: string[]
    sub?: string[]
    multi?: boolean
    grid?: string
    type?: 'form'
  }
  
  export const estimateSteps: EstimateStep[] = [
    {
      title: '프로젝트는 어떤 유형인가요?',
      desc: '보기 중에서 가장 가까운 항목을 선택해주세요',
      options: [
        '기업/브랜드 홈페이지 (랜딩페이지)',
        '커머스/예약-결제',
        '내부용 시스템',
        '구독형 플랫폼',
        '콘텐츠 포털/커뮤니티',
        '교육/LMS',
      ],
      multi: false,
      grid: 'sm:grid-cols-2',
    },
    {
      title: '프로젝트 형태는 무엇인가요?',
      desc: '복수선택이 가능합니다.',
      options: [
        'PC웹',
        '반응형웹',
        '안드로이드/iOS 앱',
        '관리자시스템',
        'PC프로그램 / 기타',
      ],
      multi: true,
      grid: 'sm:grid-cols-2',
    },
    {
      title: '프로젝트 기획이 되어있나요?',
      desc: '프로젝트 준비 상태를 선택해주세요.',
      options: ['모두 준비됨', '일부만 있음', '준비 안됨'],
      sub: [
        '기획서, 디자인, 콘텐츠 모두 준비됨',
        '일부만 준비되어 있으며 보완 필요',
        '기획부터 진행 필요',
      ],
      multi: false,
      grid: 'sm:grid-cols-3',
    },
    {
      title: '프로젝트에 대해서 자유롭게 설명해주세요',
      desc: '구체적인 요청사항이나 참고사항을 자유롭게 작성해주세요. (생략 가능)',
      type: 'form',
    },
    {
      title: '프로젝트의 예산을 알려주세요',
      desc: '대략적인 예산 구간을 선택해주세요.',
      options: [
        '100~500만원',
        '500~1,500만원',
        '1,500~3,000만원',
        '3,000만원 이상',
      ],
      multi: false,
      grid: 'sm:grid-cols-2',
    },
    {
      title: '연락처 정보를 입력해주세요',
      desc: '예상견적을 바로 확인할 수 있습니다.',
      type: 'form',
    },
  ]
  