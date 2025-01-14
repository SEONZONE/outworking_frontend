# 외근신청 FrontEnd


## 기술 스택
- React
- Axios (HTTP 클라이언트)
- React Router (라우팅)

## 주요 기능
1. 외근 신청
    - 기안자 선택
    - 승인자 선택
    - 외근 장소 입력
    - 신청 상태 확인
    - 승인 처리
    - 신청 상태 조건 조회

    
#### OutWork Component
외근 신청의 메인 컴포넌트로, 다음 기능들을 포함합니다:
- 기안자/승인자 선택 기능
- 장소 입력 기능
- 외근 신청 제출 기능

## API 연동
- URL: `http://localhost:3000`
- 주요 엔드포인트:
    - `/outwork/list/reqUser`: 기안자 목록 조회
    - `/outwork/list/approverUser`: 승인자 목록 조회
    - `/outwork/request`: 외근 신청 



## 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행 (Vite)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 빌드 미리보기
npm run preview
```

## TODO LIST
-[x] 승인/반려 처리 기능 구현
- [x] 목록 조건 조회/초기화 기능 구현
- [ ] 엑셀 다운로드 기능 구현
- [ ] CI/CD 로 배포 (gitaction)
- [ ] 로그인 기능 구현
- [ ] SSL 추가, 도메인 추가 