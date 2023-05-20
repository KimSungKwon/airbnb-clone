
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## directory:
### app
- types: DB의 유저 스키마의 타입 변환(warning 방지)
- api: 회원가입 등 API
- actions: 세션 관리
- components: 컴포넌트
- hooks: 커스텀 훅, 전역 상태 관리(using zustand)를 쓰는 훅
### pages
- api/auth: NextAuth 로그인, 로그아웃 등

## using Libararies:

- react-hook-form: 효과적인 폼 관리, 개발을 위한 입력 상태관리 라이브러리
- react-hot-toast: warning을 위한 toast 컴포넌트 라이브러리
- zustand: React 상태 관리 라이브러리
- prisma: 데이터베이스용 라이브러리
- query-string: CategoryBox등 쿼리 작업을 위한 라이브러리
- world-countries: 모든 국가들의 정보가 있는 데이터 라이브러리
- react-select: select 컴포넌트 라이브러리
- leaflet: 지도 컴포넌트 라이브러리
- react-cloudinary: Cloudinary 서비스를 이용한 파일 업로드 라이브러리
- date-fns: 날짜 관련 라이브러리
- react-date-range: 달력 컴포넌트 라이브러리