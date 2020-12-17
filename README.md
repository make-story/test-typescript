# 타입스크립트 프로젝트 생성

```bash
$ npm install -g typescript
$ mkdir <프로젝트명>
$ cd <프로젝트명>
$ tsc --init
```

# @types 라이브러리란?
기존 라이브러리들은 타입이 정의되지 않았다. (Typescript 비호환)  
대중적으로 흔히 사용되는 자바스크립트 라이브러리는 대부분 @types라는 별칭으로 타입스크립트 추론이 가능한 보조 라이브러리를 제공

# ts, tsx
TypeScript 를 사용 할때는 .ts (리액트 컴포넌트의 경우에는 .tsx) 확장자를 사용

# Webpack
```bash
$ yarn add --dev webpack webpack-cli webpack-dev-server 
$ yarn add --dev babel-loader ts-loader @babel/preset-env @babel/preset-typescript
```

# Babel
.babelrc 있다면 해당 파일을 먼저 참조 하며,  
없을 경우 webpack options에 부여한 presets plugins 을 참조한다. (babel-loader의 typescript preset을 사용)  
(webpack 설정 중, @babel/preset-env 의미는 자동으로 브라우저 polyfill 을 맞춘다는 의미)

# Webpack 3 부터는 기본적으로 json-loader 를 포함하고 있다.
import data from 'data.json' 으로 쓰면되는데, typescript 를 같이 쓸 경우 typescript에 내에서 해당 내역을 처리하지 못한다.  
( json type을 typescript에 알려주어야 함)

```javascript
// javascript
// tsconfig.json
{
  //...
  "typeRoots": [
    "typings.d.ts"
  ],
}
// typings.d.ts
declare module "json!*" {
  const json: any;
  export = json;
}
```

# webpack-dev-server 실행시 오류 'Error: Cannot find module 'webpack-cli/bin/config-yargs'
webpack 과 webpack-dev-server 버전이 서로간 충돌
```
"webpack": "4.41.2",
"webpack-cli": "3.3.10",
"webpack-dev-server": "^3.11.0",
````

# eslint
이전에는 TS로 작업할 때 tslint를 썼지만, eslint로 커버가 가능하기 때문에 tslint는 deprecated 될 예정
```bash
$ yarn add eslint eslint-plugin-import @typescript-eslint/parser
```

----------


# 타입 (Type)
> ':'를 이용하여 자바스크립트 코드에 타입을 정의하는 방식을 타입 표기(Type Annotation)라고 합니다.
> '대상이되는것:그것의타입'

- String
```javascript
let str: string = 'hi';
```

- Number
```javascript
let num: number = 10;
```

- Boolean
```javascript
let isLoggedIn: boolean = false;
```

- Array
```javascript
let arr: number[] = [1,2,3];
// 또는
let arr: Array<number> = [1,2,3];
```

- Tuple
(튜플은 배열의 길이가 고정되고 각 요소의 타입이 지정되어 있는 배열 형식을 의미)
```javascript
let arr: [string, number] = ['hi', 10];
```

- Enum
(특정 값(상수)들의 집합을 의미)
```javascript
enum Avengers { Capt, IronMan, Thor }
let hero: Avengers = Avengers.Capt;
// 또는 (인덱스 번호로도 접근)
enum Avengers { Capt, IronMan, Thor }
let hero: Avengers = Avengers[0];
```

- Any
(모든 타입에 대해서 허용한다는 의미)
```javascript
let str: any = 'hi';
let num: any = 10;
let arr: any = ['a', 2, true];
```

- Void
(변수에는 undefined와 null만 할당하고, 함수에는 반환 값을 설정할 수 없는 타입)
```javascript
let unuseful: void = undefined;
function notuse(): void {
  console.log('sth');
}
```

- Never
(함수의 끝에 절대 도달하지 않는다는 의미)
```javascript
function neverEnd(): never {
  while (true) {

  }
}
```

----------


# 함수 (Function)
- 함수의 반환 값에 타입을 정하지 않을 때는 void라도 사용
```javascript
function text(): void {
  console.log('ysm');
}
function sum(a: number, b: number): number {
  return a + b;
}
```

- 타입스크립트에서는 함수의 인자를 모두 필수 값으로 간주
(선택적 사용 변수는 '?' 사용)
```javascript
function sum(a: number, b?: number): number {
  return a + b;
}
```

- 파라미터의 초기값
```javascript
function sum(a: number, b = '100'): number {
  return a + b;
}
```

- ES6 REST문법
(파라미터의 여러 인자들을 하나의 배열로 받음)
```javascript
function sum(a: number, ...nums: number[]): number {
  let total = 0;
  for(let key in nums) {
    total += nums[key];
  }
  return a + total;
}
sum(1, 2, 3, 4, 5);
```

- this
타입스크립트에서 this가 가리키는 것을 명시가능
```
function test(this: 타입) {

}
```

----------

# <Type> 과 as Type
> (타입 단언, 타입 캐스팅, 다운 캐스팅, 강제형변환)
> (타입 단언 문법은 <Type> 과 as Type 으로 두 종류)
> (JSX 를 사용하는 경우 <Type> 키워드는 JSX 의 문법과 겹치기 때문에 불편)

```javascript
let hello: number = 1;

(hello as unknown as string).substr(1, 2); 
// (<string>hello).substr(1, 2); 
// hello의 타입을 string으로 바꾸고 substr 메소드를 실행한다.
// unknown : number와 string은 명확히 다른 타입이기 때문에 unknown을 생략할 수 없다.
```

----------


# 타입 별칭 (Type Aliases)
> ('type' 키워드)

```javascript
// string 타입을 사용할 때
const name: string = 'capt';

// 타입 별칭을 사용할 때
type MyName = string;
const name: MyName = 'capt';

type Developer = {
  name: string;
  skill: string;
}

type User<T> = {
  name: T
}
```

- 타입, 인터페이스 차이
타입의 확장 가능 / 불가능 여부  
인터페이스는 확장이 가능한데 반해 타입 별칭은 확장이 불가능  
(가능한한 type 보다는 interface로 선언해서 사용하는 것을 추천)


----------


# 인터페이스
> (미리 정의한 약속, 규칙을 의미)
1. 객체(JSON)의 스펙
2. 함수 파라미터, 반환 타입
3. 배열과 객체를 접근 방식
4. 클래스

```javascript
interface ageImpl {
  age: number;
}
function age(obj: ageImpl) {
  console.log(obj.age);
}
let person = { age: 28 };
age(person);
```

- 선택적 사용
('?' 사용)
```
interface 인터페이스이름 {
  속성?: 타입;
}
```

- 읽기 전용 
```javascript
interface nameImpl {
  readonly name: string;
}
let ysm: nameImpl = {
  name: '유성민'
};
```

- 읽기 전용 배열  
(ReadonlyArray<T> 타입을 사용)
```javascript
let arr: ReadonlyArray<number> = [1,2,3];

// 또는

interface ReadonlyStringArray {
  readonly [index: number]: string;
}
const arr: ReadonlyStringArray = ['Thor', 'Hulk'];
arr[2] = 'Capt'; // Error!
```


- 타입 체킹
```javascript
interface CraftBeer {
  brand?: string;
}
function brewBeer(beer: CraftBeer) {
  // ..
}
let myBeer = { brandon: 'what' };
brewBeer(myBeer as CraftBeer); // 타입 추론을 무시

// 또는 (인터페이스 정의하지 않은 속성들을 추가로 사용하고 싶을 때)

interface CraftBeer {
  brand?: string;
  [propName: string]: any;
}
```


- 함수
```javascript
interface testImpl {
  (name: string, age: number): boolean;
}
let test: testImpl;
test = function(n: string, a: number) {
  return true;
}

// 또는 

interface numberOperation {
  (arg1: number, arg2: number): number;
}
const sum: numberOperation = (arg1: number, arg2: number): number => {
  return arg1 + arg2;
};
const multiply: numberOperation = (arg1, arg2) => {
  return arg1 * arg2;
};
const toArray: numberOperation = (arg1: any, arg2: any): any[] => { // error: Type '(arg1: any, arg2: any) => any[]' is not assignable to type 'numberOperation'. Type 'any[]' is not assignable to type 'number'.
  return [arg1, arg2];
};
```

- 클래스 
```javascript
interface NameImpl {
  name: string;
  setName(name: string): void;
}

class Name implements NameImpl {
  name: string = 'TEST';
  setName(n: string) {
    this.name = n;
  }
  constructor() {}
}
```

- 덕 타이핑 (Duck typing)
TypeScript의 덕 타이핑은 어떤 객체가 특정 인터페이스에서 명시하는 메소드를 가지고 있다면 해당 객체가 그 인터페이스를 구현한 것으로 보는 것
```javascript
interface Quackable {
  quack(): void;
}

class Duck implements Quackable {
  quack() {
    console.log('꽥!');
  }
}

class Person {
  quack() {
    console.log('나도 꽥!');
  }
}

function makeSomeNoiseWith(duck: Quackable): void {
  duck.quack();
}

makeSomeNoiseWith(new Duck()); // OK
makeSomeNoiseWith(new Person()); // OK
```

- Indexable
프로퍼티 접근자(Property accessor)
```javascript
const dict = {
  foo: 1,
  bar: 2
};
Object.keys(dict).forEach(k => console.log(dict[k])); // error: Index signature of object type implicitly has an 'any' type.

interface Indexable {
  [key: string]: any;
}
const dict: Indexable = {
  foo: 1,
  bar: 2
};
Object.keys(dict).forEach(k => console.log(dict[k])); // OK
```

- 인터페이스 확장
```javascript
interface NameImpl {
  name: string;
}
interface PersonImpl extends NameImpl {
  age: number;
}
let person = {} as PersonImpl;
person.name = 'ysm';
person.age = 30;
```

- 하이브리드
```javascript
interface CraftBeer {
  (beer: string): string;
  brand: string;
  brew(): void;
}

function myBeer(): CraftBeer {
  let my = (function(beer: string) {}) as CraftBeer;
  my.brand = 'Beer Kitchen';
  my.brew = function() {};
  return my;
}

let brewedBeer = myBeer();
brewedBeer('My First Beer');
brewedBeer.brand = 'Pangyo Craft';
brewedBeer.brew();
```

----------


# 연산자를 통한 타입 정의 
- Union Type ('|' 연산자)
```javascript
function test(text: string | number) {
  
}
function person(age: number | string) {
  if(typeof age === 'number') {
    return age;
  }
  if(typeof age === 'string') {
    return age;
  }
  return new TypeError('type number or string');
}

// 또는

interface Person {
  name: string;
  age: number;
}
interface Developer {
  name: string;
  skill: string;
}
function pd(someone: Person | Developer) {
 
}
```

- Intersection Type ('&' 연산자)
```javascript
interface Person {
  name: string;
  age: number;
}
interface Developer {
  name: string;
  skill: number;
}
type PD = Person & Developer;

// 결과적으로 PD 타입은
/*
{
  name: string;
  age: number;
  skill: string;
}
*/
```


----------


# 클래스 (Class)
- readonly
(읽기 전용)
```javascript
class Developer {
    readonly name: string;
    constructor(theName: string) {
        this.name = theName;
    }
}
let ysm = new Developer("유성민");
console.log(ysm.name);
```

- Accessor (geter, seter)
```javascript
class Developer {
  private name: string;
  
  get name(): string {
    return this.name;
  }

  set name(newValue: string) {
    if (newValue && newValue.length > 5) {
      throw new Error('이름이 너무 깁니다');
    }
    this.name = newValue;
  }
}
const josh = new Developer();
josh.name = 'Josh Bolton'; // Error
josh.name = 'Josh';
```

- 추상 클래스 (Abstract Class)
(인터페이스와 비슷하나 추상 클래스는 특정 클래스의 상속 대상이 되는 클래스)
```javascript
abstract class Developer {
  abstract coding(): void; // 'abstract'가 붙으면 상속 받은 클래스에서 무조건 구현해야 함
  drink(): void {
    console.log('drink sth');
  }
}

class FrontEndDeveloper extends Developer {
  coding(): void {
    // Developer 클래스를 상속 받은 클래스에서 무조건 정의해야 하는 메서드
    console.log('develop web');
  }
  design(): void {
    console.log('design web');
  }
}
const dev = new Developer(); // error: cannot create an instance of an abstract class
const josh = new FrontEndDeveloper();
josh.coding(); // develop web
josh.drink(); // drink sth
josh.design(); // design web
```

----------


# 제네릭 (Generics)
> (한가지 타입보다 여러 가지 타입에서 동작하는 컴포넌트를 생성하는데 사용)
> (타입을 마치 함수의 파라미터처럼 사용하는 것)

```javascript
function getText<T>(text: T): T {
  return text;
}
getText<string>('hi');
getText<number>(10);
getText<boolean>(true);
```

- any 타입과 같은 것 아닌가?
(함수의 인자로 어떤 타입이 들어갔고 어떤 값이 반환되는지는 알 수가 없음)  
(any라는 타입은 타입 검사를 하지 않기 때문)
```javascript
function logText(text: any): any {
  return text;
}

function logText<T>(text: T): T {
  return text;
}
// 방법 #1
const text = logText<string>("Hello Generic");
// 방법 #2
const text = logText("Hello Generic");
```

- 배열 제네릭 타입
```javascript
function logText<T>(text: T[]): T[] {
  console.log(text.length); // 제네릭 타입이 배열이기 때문에 `length`를 허용합니다.
  return text;
}

// 또는

function logText<T>(text: Array<T>): Array<T> {
  console.log(text.length);
  return text;
}
```

- 인터페이스
```javascript
interface GenericLogTextFn {
  <T>(text: T): T; // 함수구조
}
function logText<T>(text: T): T {
  return text;
}
let myString: GenericLogTextFn = logText; // Okay

// 또는

interface GenericLogTextFn<T> {
  (text: T): T;
}
function logText<T>(text: T): T {
  return text;
}
let myString: GenericLogTextFn<string> = logText;
```

- 클래스 (Class)
```javascript
class GenericMath<T> {
  pi: T;
  sum: (x: T, y: T) => T;
}

let math = new GenericMath<number>();
```

- 제네릭 조건 부여
```javascript
interface LengthWise {
  length: number;
}

function logText<T extends LengthWise>(text: T): T {
  console.log(text.length);
  return text;
}
logText(10); // Error, 숫자 타입에는 `length`가 존재하지 않으므로 오류 발생
logText({ length: 0, value: 'hi' }); // `text.length` 코드는 객체의 속성 접근과 같이 동작하므로 오류 없음
```

- 객체의 속성을 제약
```javascript
// 제네릭을 선언할 때 <O extends keyof T> 부분에서 첫 번째 인자로 받는 객체에 없는 속성들은 접근할 수 없게끔 제한
function getProperty<T, O extends keyof T>(obj: T, key: O) { 
  return obj[key];  
}
let obj = { a: 1, b: 2, c: 3 };

getProperty(obj, "a"); // okay
getProperty(obj, "z"); // error: "z"는 "a", "b", "c" 속성에 해당하지 않습니다.
```