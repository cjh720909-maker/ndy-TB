# NDY Dispatch & Picking Summary 프로젝트 실행 가이드

이 문서는 프로젝트를 로컬 환경에서 실행하는 방법을 안내합니다.

## 1. 사전 준비
- **Node.js**: 최신 LTS 버전 권장
- **MySQL Database**: `.env` 파일의 `DATABASE_URL`에 올바른 접속 정보가 설정되어 있어야 합니다.

## 2. 설치 및 실행 단계

### 의존성 설치
```bash
npm install
```

### Prisma 클라이언트 생성
데이터베이스 스키마를 바탕으로 Prisma 클라이언트를 생성합니다.
```bash
npx prisma generate
```

### 서버 실행
서버를 실행합니다. 기본 포트는 `3011`로 설정되어 있습니다.
```bash
npm start
```

## 3. 접속 정보
- **대시보드**: [http://localhost:3011](http://localhost:3011)
- **주요 API**:
    - 고객사 목록: `http://localhost:3011/api/customers`
    - 배차 요약: `http://localhost:3011/api/summary`
    - 피킹 요약: `http://localhost:3011/api/picking-summary`

## 4. 문제 해결
- **한글 깨짐**: 시스템 내에서 EUC-KR 인코딩을 자동으로 처리하도록 `fixEncoding` 함수가 구현되어 있습니다.
- **포트 충돌**: 다른 프로세스가 3011 포트를 사용 중인 경우 `api/index.js`에서 `port` 값을 변경하십시오.
