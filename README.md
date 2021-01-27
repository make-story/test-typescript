# 타입스크립트(Typescript)

> 참고페이지  
https://typescript-kr.github.io/  


-----

## 타입주석
타입스크립트는 자바스크립트 변수 선언문을 확장해 다음과 같은 형태로 타입을 명시할 수 있습니다.  
이를 `타입주석(type annoration)`이라고 합니다.  
```
let 변수이름: 타입 [= 초깃값]
const 변수이름: 타입 = 초깃값
```
```typescript
let n: number = 1;
let b: boolean = true;
let s: string = 'hello';
let o: object = {};
```

-----

## 타입추론
타입스크립트는 자바스크립트와 호환성을 위해 타입 주석 부분을 생략할 수 있습니다.  
타입스크립트 컴파일러는 다음과 같은 코드를 만나면 대입 연산자 = 오른쪽 값에 따라 변수의 타입을 지정합니다.  
이를 `타입 추론(type inference)`이라고 합니다.
```typescript
let n = 1; // n의 타입을 number로 판단
let b = true; // b의 타입을 boolean으로 판단
let s = 'hello'; // s의 타입을 string으로 판단
let o = {}; // o의 타입을 object로 판단
```

-----

## any 타입
타입스크립트는 `자바스크립트와 호환을 위해 any라는 이름의 타입을 제공`합니다.  
다음 코드에서 변수 a는 타입이 any이므로 값의 타입과 무관하게 어떤 종류의 값도 저장할 수 있습니다.  
```typescript
let a: any = 0;
a = 'hello';
a = true;
a = {};
```

-----

## undefined 타입
자바스크립트에서 undefined는 값입니다.  
변수를 초기화하지 않으면 해당 변수는 undefined값을 가집니다.  
그러나 `타입스크립트에서 undefined는 타입이기도 하고 값이기도 합니다.`  
```typescript
let u: undefined = undefined;
u = 1; // Type '1' in not assignable to type 'undefined' 오류 발생
```

-----

## 타입 변환 (타입 단언)
타입이 있는 언어들은 특정 타입의 변숫값을 다른 타입의 값으로 변환할 수 있는 기능을 제공합니다. 이를 `타입변환(type conversion)`이라고 합니다.
```typescript
let person: object = { name: 'test' };
console.log(person.name); // 'object' 형식에 'name' 속성이 없습니다. 에러!
```

인터페이스 방식
```typescript
interface personObject {
	name: string,
};
let person: personObject = { name: 'test' };
console.log(person.name);
```

타입변환 방식
```typescript
let person: object = { name: 'test' };
(<{name: string}>person).name;
```

타입스크립트는 독특하게 타입 변환이 아닌 `타입 단언(type assertion)`이라는 용어를 사용합니다.
```
(<타입>객체)
또는
(객체 as 타입)
```
이들은 모두 ES5 자바스크립트 구문이 아닙니다. 따라서 자바스크립트의 타입 변환 구문과 구분하기 위해 `타입 단언`이라는 용어를 사용합니다.  
```typescript
interface INameable {
	name: string
};
let obj: object = { name: 'YSM' };
let name1 = (<INameable>obj).name;
let name2 = (obj as INameable).name;
console.log(name1, name2); // YSM YSM
```

-----

## 타입주석
타입스크립트 함수 선언문은 자바스크립트 `함수 선언문에서 매개변수와 함수 반환값(return type)에 타입 주석`을 붙이는 다음 형태로 구성됩니다.  
```
function 함수이름(매개변수1: 타입1, 매개변수2: 타입2[, ...]): 반환타입 {
	// 함수몸통...
}
```
```typescript
function add(a: number, b: number): number {
	return a + b;
}
```

-----

## 함수 시그니처
변수에 타입이 있듯이 함수 또한 타입이 있는데, `함수의 타입을 함수 시그니처(function signature)`라고 합니다.  
함수의 시그니처는 다음과 같은 형태로 표현합니다.
```
(매개변수1 타입, 매개변수2 타입[, ...]) => 반환값 타입
```
```typescript
let printMe: (string, number) => void = function(name: string, age: number): void {
	// ...
};
```
```typescript
type stringNumberFunc = (string, number) => void; // type 키워드로 타입 별칭 만들기

let f: stringNumberFunc = function(a: string, b: number): void {}
let g: stringNumberFunc = function(c: string, d: number): void {}
```

-----

## 메서드 체인 (method chain)
`return this;`
```typescript
export class Calculator {
	constructor(public value: number = 0) {

	}
	add(value: number) {
		this.value += value;
		return this;
	}
	multiply(value: number) {
		this.value *= value;
		return this;
	}
}
let calc = new Calculator();
let result = calc.add(1).add(2).multiply(3).multiply(4).value;
```

-----

## 제네릭 방식 타입
타입을 `T 와 같은 일종의 변수(타입 변수)로 취급하는 것`을   
`제네릭(generics)타입`이라고 합니다.  

> <u>컴파일러는 T 의 의미를 알 수 있어야 합니다.  
즉, T 가 타입 변수(type variable)라고 알려줘야 합니다.</u>  
const 함수이름 = `<타입변수>`(매개변수: 타입변수): 타입변수 => {};

> T 는 Type의 약자로 다른 언어에서도 제네릭을 선언할 때 관용적으로 많이 사용된다.  
이 부분에는 식별자로 사용할 수 있는 것이라면 무엇이든 들어갈 수 있다. 이를테면 $나 _도 가능하다는 의미다.  
하지만 대개의 경우 T를 사용한다. 여기에서 T를 타입 변수(Type variables)라고 한다. 

```typescript
const arrayLength = <T>(array: T[]): number => array.length;
const isEmpty = <T>(array: T[]): boolean => arrayLength<T>(array) == 0;

let numArray: number[] = [1, 2, 3];
let strArray: string[] = ['Hello', 'World'];
arrayLength(numArray); 
// 또는 arrayLength<number>(numArray);
isEmpty([]);
// 또는 isEmpty<number>([]);
```

> 두 개 이상의 타입 변수  
제네릭 함수나 클래스에서는 두 개 이상의 타입 변수도 사용할 수 있다.   
```javascript
function toPair<T, U>(a: T, b: U): [ T, U ] {
	return [ a, b ];
}
toPair<string, number>('1', 1); // [ '1', 1 ]
```

<br>

## 제네릭 함수의 타입 추론
제네릭 형태로 구현된 함수는 원칙적으로는 `타입변수`를 명시해줘야 합니다.
```typescript
const identoty = <T>(n: T): T => n;
console.log(identoty<boolean>(true)); // true
console.log(identoty(true)); // true - 타입 추론 방식
```
하지만 이런 코드는 번거로워서 타입스크립트는 타입 변수 부분을 생략할 수 있게 합니다.  
타입스크립트는 타입 변수가 생략된 제네릭 함수를 만나면 타입 추론을 통해 생략된 타입을 찾아냅니다.  
<br>

## 제네릭 함수의 함수 시그니처
타입스크립트는 어떤 경우 `함수 시그니처의 매개변수 부분에 변수 이름을 기입하라고 요구`합니다.  
```typescript
// cb 라는 이름의 매개변수에 함수 시그니처를 사용
const f = (cb: (a: number, number?) => number): void => {}; // 오류발생!
```
이런 오류가 발생하면 타입스크립트가 해석하지 못하는 부분에 변수를 삽입하고 이 변수에 타입을 명시해 해결합니다.    
```typescript
const f = <T>(cb: (arg: T, i?: number) => number): void => {};
```

-----

## 타입 수정자 readonly, 불변과 가변
readonly 타입으로 서언된 매개변숫값을 변경하는 시도가 있으면 문제가 있는 코드라고 알려줘서 불순 함수가 되지 않게 방지합니다.
```typescript
function forcePure(array: readonly number[]) {
	// ...
}
```
변수가 const 나 readonly 를 명시하고 있으면 변숫값은 초깃값을 항상 유지 합니다.  
이런 변수는 변경할 수 없다는 의미로 `'불변(immutable)'`변수라고 합니다.  
반면에 let 이나 readonly 를 명시하지 않는 변수는 언제든지 값을 변경할 수 있습니다.  
이런 변수는 변경할 수 있다는 의미로 `'가변(mutable'`변수라고 합니다.  

-----

## 반복기 (iterator)
```typescript

```


## 생성기 (generator)
`function*` 키워드  
`yield`키워드  
`yield*` 키워드  

```typescript

```

-----

## 함수형 프로그래밍이란?
함수형 프로그래밍은 순수 함수와 선언형 프로그래밍의 토대 위에 함수 조합(function composition)과 모나드 조합(monadic composition)으로 코드를 설계하고 구현하는 기법입니다.  
<br>

## 제네릭 함수
타입스크립트에서 제네릭 타입은 함수와 인터페이스, 클래스, 타입 별칭에 적용할 수 있으며,  
꺽쇠 괄호 `<>`으로 타입을 감싼 `<T>, <T, Q>`처럼 표현합니다.
```typescript
// function 키워드 (함수선언식)
function g1<T>(a: T): void {};
function g2<T, Q>(a: T, b: Q): void {};
```
```typescript
// 화살표 함수
const g3 = <T>(a: T): void => {};
const g4 = <T, Q>(a: T, b: Q): void => {};
```
```typescript
// 타입 별칭(type-alias)
type Type1Func<T> = (T) => void;
type Type2Func<T, Q> = (T, Q) = > void;
type Type3Func<T, Q, R> = (T, Q) => R; // T와 Q타입 값을 입력 받아 R타입 값을 반환
```

-----

## 람다 라이브러리 (함수형 유틸리티 라이브러리)


-----

## 제네릭 프로그래밍 
제네릭 타입은 인터페이스나 클래스, 함수, 타입 별칭 등에 사용할 수 있는 기능으로,  
해당 심벌의 타입을 미리 지정하지 않고 다양한 타입을 대응하려고 할 때 사용합니다.  
```typescript
// 제네릭 인터페이스 구문
interface IValueable<T> {
	value: T
};
```
```typescript
// 제네릭 함수 구문
function identity1<T>(arg: T): T {
	return arg;
}
const identity2 = <T>(arg: T): T => arg;
```
```typescript
// 제네릭 타입 별칭 구문
type IValuble<T> = {
	value: T
};
```
```typescript
// 제네릭 클래스 구문
class Valuable<T> {
	constructor(public value: T) {

	}
}
```

제네릭 사용하기
```typescript
// 제네릭 인터페이스 정의
export interface IValuable<T> {
	value: T
};
```

```typescript
// 제네릭 인터페이스를 구현하는 제네릭 클래스
import { IValuable } from './IValuable';

// 제네릭 클래스는 자신이 가진 타입 변수 T 를 인터페이스 쪽 제네릭 타입 변수로 넘길 수 있습니다.
export class Valuable<T> implements IValuable<T> {
	constructor(public value: T) {

	}
}

export { IValuable };
```

```typescript
// 제네릭 함수는 다음처럼 자신의 타입 변수 T를 제네릭 인터페이스의 타입 변수 쪽으로 넘기는 형태로 구현할 수 있습니다.
import { IValuable, Valuable } from './Valuable';

export const printValue = <T>(o: IValuable<T>): void => console.log(o.value);
export { IValuable, Valuable };
```

```typescript
// 사용
import { printValue, Valuable } from './printValue';

printValue(new Valuable<number>(1)); // 1
// 또는 타입추론 방식 printValue(new Valuable(1));

printValue(new Valuable<boolean>(true)); // true
// 또는 타입추론 방식 printValue(new Valuable(true));

printValue(new Valuable<string>('hello')); // hello
// 또는 타입추론 방식 printValue(new Valuable('hello'));

printValue(new Valuable<number[]>([1, 2, 3])); // [1, 2, 3]
// 또는 타입추론 방식 printValue(new Valuable([1, 2, 3]));
```
<br>


## 제네릭 타입 제약  


-----

## 모나드


-----

# 타입스크립트 프로젝트 생성
```bash
$ npm install -g typescript
$ mkdir <프로젝트명>
$ cd <프로젝트명>
$ tsc --init
```


## @types 라이브러리란?
기존 라이브러리들은 타입이 정의되지 않았다. (Typescript 비호환)  
대중적으로 흔히 사용되는 자바스크립트 라이브러리는 대부분 @types라는 별칭으로 타입스크립트 추론이 가능한 보조 라이브러리를 제공  


## ts, tsx
TypeScript 를 사용 할때는 .ts (리액트 컴포넌트의 경우에는 .tsx) 확장자를 사용  


## Webpack
https://webpack.js.org/guides/typescript/
```bash
$ yarn add --dev webpack webpack-cli webpack-dev-server 
$ yarn add --dev babel-loader ts-loader @babel/preset-env @babel/preset-typescript
```


## Babel
.babelrc 있다면 해당 파일을 먼저 참조 하며,  
없을 경우 webpack options에 부여한 presets plugins 을 참조한다. (babel-loader의 typescript preset을 사용)   
(webpack 설정 중, @babel/preset-env 의미는 자동으로 브라우저 polyfill 을 맞춘다는 의미)  


## Webpack 3 부터는 기본적으로 json-loader 를 포함하고 있다.
import data from 'data.json' 으로 쓰면되는데, typescript 를 같이 쓸 경우 typescript에 내에서 해당 내역을 처리하지 못한다.    
(json type을 typescript에 알려주어야 함)  

```javascript
// tsconfig.json
{
	//...
	"typeRoots": [
		"typings.d.ts"
	],
}
```
```javascript
// typings.d.ts
declare module "json!*" {
	const json: any;
	export = json;
}
```


## webpack-dev-server 실행시 오류 'Error: Cannot find module 'webpack-cli/bin/config-yargs'
webpack 과 webpack-dev-server 버전이 서로간 충돌  
```
"webpack": "4.41.2",
"webpack-cli": "3.3.10",
"webpack-dev-server": "^3.11.0",
```


## eslint
이전에는 TS로 작업할 때 tslint를 썼지만, eslint로 커버가 가능하기 때문에 tslint는 deprecated 될 예정   
```bash
$ yarn add eslint eslint-plugin-import @typescript-eslint/parser
```


----------


# 타입 (Type)
> `:`를 이용하여 자바스크립트 코드에 타입을 정의하는 방식을 타입 표기(Type Annotation)라고 합니다.  
> `타입설정대상:타입명시`  

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

- Element  
```javascript
const content: HTMLElement = document.querySelector('#content');
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

# `<Type>` 과 `as Type`
> (타입 단언, 타입 캐스팅, 다운 캐스팅, 강제형변환)  
> (타입 단언 문법은 `<Type>` 과 as Type 으로 두 종류)  
> (JSX 를 사용하는 경우 `<Type>` 키워드는 JSX 의 문법과 겹치기 때문에 불편)  

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

// 함수 시그니처
type Func = (a: number, b: number) => number;
```

- 타입, 인터페이스 차이  
타입의 확장 가능 / 불가능 여부  
인터페이스는 확장이 가능한데 반해 타입 별칭은 확장이 불가능  
(가능한한 type 보다는 interface로 선언해서 사용하는 것을 추천)  


----------


# 인터페이스
> (미리 정의한 약속, 규칙을 의미)  
1. 객체(JSON)의 스펙
2. 함수의 전체모양 (파라미터타입, 반환타입 등 한번에 타입설정)
3. 함수 파라미터 타입, 반환 타입 각각 설정
4. 배열과 객체를 접근 방식
5. 클래스

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
(ReadonlyArray`<T>` 타입을 사용)
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
	(name: string, age: number): boolean; // 함수 전체 모양 (파라미터 타입, 반환 타입)
}
let test: testImpl;
test = function(n: string, a: number) {
	return true;
}

// 또는 

interface numberOperation {
	(arg1: number, arg2: number): number; // 함수 전체 모양 (파라미터 타입, 반환 타입)
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
함수의 인자로 어떤 타입이 들어갔고 어떤 값이 반환되는지는 알 수가 없음  
any라는 타입은 타입 검사를 하지 않기 때문  
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

- `제네릭 조건 부여`  
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

- `객체의 속성을 제약`  
```javascript
// 제네릭을 선언할 때 <O extends keyof T> 부분에서 첫 번째 인자로 받는 객체에 없는 속성들은 접근할 수 없게끔 제한
function getProperty<T, O extends keyof T>(obj: T, key: O) { 
	return obj[key];  
}
let obj = { a: 1, b: 2, c: 3 };

getProperty(obj, "a"); // okay
getProperty(obj, "z"); // error: "z"는 "a", "b", "c" 속성에 해당하지 않습니다.
```

----------

# 유틸리티
> TypeScript는 공통 타입 변환을 용이하게 하기 위해 몇 가지 유틸리티 타입을 제공  
* `Partial<T>` : T의 모든 프로퍼티를 선택적으로 만드는 타입을 구성
* `Readonly<T>` : T의 모든 프로퍼티를 읽기 전용(readonly)으로 설정한 타입을 구성
* `Record<K,T>` : 타입 T의 프로퍼티의 집합 K로 타입을 구성
* `Pick<T,K>` : T에서 프로퍼티 K의 집합을 선택해 타입을 구성
* `Omit<T,K>` : T에서 모든 프로퍼티를 선택한 다음 K를 제거한 타입을 구성
* `Exclude<T,U>` : T에서 U에 할당할 수 있는 모든 속성을 제외한 타입을 구성
* `Extract<T,U>` : T에서 U에 할당 할 수 있는 모든 속성을 추출하여 타입을 구성
* `NonNullable<T>` : T에서 null 과 undefined를 제외한 타입을 구성
* `Parameters<T>` : 함수 타입 T의 매개변수 타입들의 튜플 타입을 구성
* `ConstructorParameters<T>`
* `ReturnType<T>`
* `InstanceType<T>`
* `Required<T>`
* `ThisParameterType`
* `OmitThisParameter`
* `ThisType<T>`

