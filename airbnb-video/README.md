
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
- types: DB의 스키마의 타입 변환(to ISO string)(warning 방지)
- api: POST, DELETE 등 API
- actions: 세션을 가져오거나, DB에서 데이터들(listings, reservations ...)을 가져옴
- components: 컴포넌트
- hooks: 커스텀 훅, 전역 상태 관리(using zustand)를 쓰는 훅
- libs: prisma 클라이언트
- providers: toast라이브러리의 클라이언트 
#### 라우팅 디렉토리
- favorties: '/favorites' 페이지
- listings: '/listings' 페이지
- properties: '/properties' 페이지
- reservations: '/reservations' 페이지
- trips: '/trips' 페이지

### pages
- api/auth: NextAuth 관련. 로그인, 로그아웃 등

### prisma
- DB 스키마 정의

### public
- 이미지파일, 리소스

### 그 외
- middleware: 로그인을 하지 않은 상태일 때, url에 페이지경로를 직접 입력해 로그인 전용 페이지에 들어가는 것을 방지 

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
- react-date-range: 기간 설정, 달력 컴포넌트 라이브러리
- react-spinners: 로딩용 컴포넌트