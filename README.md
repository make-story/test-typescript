> 타입스크립트 프로젝트

$ npm install -g typescript
$ mkdir <프로젝트명>
$ cd <프로젝트명>
$ tsc --init

> @types 라이브러리란?
기존 라이브러리들은 타입이 정의되지 않았다. (Typescript 비호환)
대중적으로 흔히 사용되는 자바스크립트 라이브러리는 대부분 @types라는 별칭으로 타입스크립트 추론이 가능한 보조 라이브러리를 제공

> Babel
.babelrc 있다면 해당 파일을 먼저 참조 하며,
없을 경우 webpack options에 부여한 presets plugins 을 참조한다.
(webpack 설정 중, @babel/preset-env 의미는 자동으로 브라우저 polyfill 을 맞춘다는 의미)