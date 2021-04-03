# 타입스크립트(Typescript)
타입스크립트는 `일반 변수, 매개 변수(Parameter), 객체 속성(Property)` 등에 `: TYPE`과 같은 형태로 `타입을 지정`할 수 있습니다.  

> 참고페이지  
https://typescript-kr.github.io/  
https://heropy.blog/2020/01/27/typescript/  

https://typescript-kr.github.io/  
https://heropy.blog/2020/01/27/typescript/  
https://joshua1988.github.io/ts/guide/enums.html#%EB%AC%B8%EC%9E%90%ED%98%95-%EC%9D%B4%EB%84%98  
http://typescript-handbook-ko.org/pages/generics.html  
https://velog.io/@zeros0623/TypeScript-%EA%B3%A0%EA%B8%89-%ED%83%80%EC%9E%85  
https://typescript-kr.github.io/pages/tutorials/typescript-in-5-minutes.html  


- 타입스크립트 Element Type   
https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.htmlelement.html  
  
  
- 타입스크립트 고급
https://typescript-kr.github.io/pages/advanced-types.html  

  
- 타입스크립트 + 리덕스
https://react-etc.vlpt.us/07.typescript-redux.html  


-----


## 타입주석 - 타입선언
타입스크립트는 자바스크립트 변수 선언문을 확장해 다음과 같은 형태로 `타입을 명시`할 수 있습니다.  
이를 `타입주석(type annoration)`이라고 합니다.  
```
let 변수이름: 타입 [= 초깃값]
const 변수이름: 타입 = 초깃값
```

```typescript
// 불린: Boolean
let isBoolean: boolean;
let isDone: boolean = false;

// 숫자: Number
let num: number;
let integer: number = 6;
let float: number = 3.14;
let hex: number = 0xf00d; // 61453
let binary: number = 0b1010; // 10
let octal: number = 0o744; // 484
let infinity: number = Infinity;
let nan: number = NaN;

// 문자열: String
let str: string;
let red: string = 'Red';
let green: string = "Green";
let myColor: string = `My color is ${red}.`;
let yourColor: string = 'Your color is' + green;
```


## Null과 Undefined  
`기본적으로 Null과 Undefined는 모든 타입의 하위 타입으로, 각 타입에 할당할 수 있음`   
```typescript
let num: number = undefined;
let str: string = null;
let obj: { a: 1, b: false } = undefined;
let arr: any[] = null;
let und: undefined = null;
let nul: null = undefined;
let voi: void = null;
```


## Any  
`값의 타입과 무관하게 어떤 종류의 값도 저장`할 수 있음
```typescript
let any: any = 123;
any = 'Hello world';
any = {};
any = null;
let any2: any[] = [0, 1, {}, [], 'str', false];
```


## Unknown (알 수 없는 타입)
`Unknown은 알 수 없는 타입을 의미`  
일반적인 경우 Unknown은 타입 단언(Assertions)이나 타입 가드(Guards)를 필요  
```typescript
let a: any = 123;
let u: unknown = 123;

let v1: boolean = a; // 모든 타입(any)은 어디든 할당할 수 있습니다.
let v2: number = u; // 알 수 없는 타입(unknown)은 모든 타입(any)을 제외한 다른 타입에 할당할 수 없습니다.
let v3: any = u; // OK!
let v4: number = u as number; // 타입을 단언하면 할당할 수 있습니다.
```
`다양한 타입을 반환할 수 있는 API에서 유용`  
```typescript
type Result = {
	success: true,
	value: unknown
} | {
	success: false,
	error: Error
}
export default function getItems(user: IUser): Result {
	// Some logic...
	if(id.isValid) {
		return {
			success: true,
			value: ['Apple', 'Banana'] // unknown
		};
	}else {
		return {
			success: false,
			error: new Error('Invalid user.')
		}
	}
}
```


## 유니언 (Union) - 'OR' - '|'
`2개 이상의 타입을 허용하는 경우` 
```typescript
let union: (string | number);
union = 'Hello type!';
union = 123;
union = false; // Error - TS2322: Type 'false' is not assignable to type 'string | number'.
```


## 인터섹션 (Intersection) - 'AND' - '&'
` 2개 이상의 타입을 조합` (자주 사용하는 방법은 아님)
```typescript
// 기존 타입들이 조합 가능하다면 인터섹션을 활용할 수 있습니다.
interface IUser {
	name: string,
	age: number
}
interface IValidation {
	isValid: boolean
}
const neo: IUser & IValidation = {
	name: 'Neo',
	age: 85,
	isValid: true
};
```


## readonly    
```typescript
let arr1: readonly number[] = [1, 2, 3, 4];
let arr2: ReadonlyArray<number> = [0, 9, 8, 7];

arrA[0] = 123; // Error - TS2542: Index signature in type 'readonly number[]' only permits reading.
arrA.push(123); // Error - TS2339: Property 'push' does not exist on type 'readonly number[]'.

arrB[0] = 123; // Error - TS2542: Index signature in type 'readonly number[]' only permits reading.
arrB.push(123); // Error - TS2339: Property 'push' does not exist on type 'readonly number[]'.
```


## array  
```typescript
// 문자열만 가지는 배열
let fruits1: string[] = ['Apple', 'Banana', 'Mango'];
let fruits2: Array<string> = ['Apple', 'Banana', 'Mango'];

// 숫자만 가지는 배열
let oneToSeven1: number[] = [1, 2, 3, 4, 5, 6, 7];
let oneToSeven2: Array<number> = [1, 2, 3, 4, 5, 6, 7];

// 유니언 타입(다중 타입)
let array1: (string | number)[] = ['Apple', 1, 2, 'Banana', 'Mango', 3];
let array2: Array<string | number> = ['Apple', 1, 2, 'Banana', 'Mango', 3];

// any
let someArr: any[] = [0, 1, {}, [], 'str', false];
```


## 인덱싱 가능 타입 (Indexable types)
arr[2]와 같이 ‘숫자’로 인덱싱하거나 obj['name']과 같이 ‘문자’로 인덱싱하는, 인덱싱 가능 타입(Indexable types)  
`인덱싱에 사용할 인덱서(Indexer)의 이름과 타입 그리고 인덱싱 결과의 반환 값을 지정`  
`인덱서의 타입은 string과 number만 지정할 수 있음`  
```typescript
interface IItem {
	[itemIndex: number]: string // Index signature
}
let item1: IItem = ['a', 'b', 'c']; // Indexable type

console.log(item1[0]); // 'a' is string.
console.log(item1[1]); // 'b' is string.
console.log(item1['0']); // Error - TS7015: Element implicitly has an 'any' type because index expression is not of type 'number'.


// 유니온 활용
interface IItemUnion {
	[itemIndex: number]: string | boolean | number[]
}
let item2: IItemUnion = ['Hello', false, [1, 2, 3]];
console.log(item2[0]); // Hello
console.log(item2[1]); // false
console.log(item2[2]); // [1, 2, 3]
```


## keyof
`인덱싱 가능 타입에서 keyof를 사용하면 속성 이름을 타입으로 사용`  
인덱싱 가능 타입의 속성 이름들이 유니온 타입으로 적용  
```typescript
interface ICountries {
  KR: '대한민국',
  US: '미국',
  CP: '중국'
}
// key 로 접근
let country1: keyof ICountries; // 'KR' | 'US' | 'CP'
country1 = 'KR'; // ok
country1 = 'RU'; // Error - TS2322: Type '"RU"' is not assignable to type '"KR" | "US" | "CP"'.

// value 로 접근
let country2: ICountries[keyof ICountries]; // ICountries['KR' | 'US' | 'CP']
country2 = '대한민국';
country2 = '러시아'; // Error - TS2322: Type '"러시아"' is not assignable to type '"대한민국" | "미국" | "중국"'.
```


## object    
`typeof 연산자가 "object"로 반환하는 모든 타입이 해당 됨`  
컴파일러 옵션에서 엄격한 타입 검사(strict)를 true로 설정하면, null은 포함하지 않음  
```typescript
let obj: object = {}; 
let arr: object = [];
let func: object = function () {};
let nullValue: object = null;
let date: object = new Date();

// 보다 정확하게 타입 지정을 하기 위해 다음과 같이 객체 속성(Properties)들에 대한 타입을 개별적으로 지정
let userA: { name: string, age: number } = {
	name: 'HEROPY',
	age: 123
};

// interface나 type을 사용하는 것을 추천
interface IUser {
	name: string,
 	age: number
}
let userA: IUser = {
	name: 'HEROPY',
	age: 123
};
let userB: IUser = {
	name: 'HEROPY',
	age: false, // Error
	email: 'thesecon@gmail.com' // Error
};
```


## interface   
```typescript
interface IUser {
	name: string,
	age: number,
	// 속성에 ?를 사용하면 선택적 속성으로 정의
	isAdmin?: boolean,
}
let userArr: IUser[] = [
	{
		name: 'name1',
		age: 10,
		isAdmin: true,
	},
	{
		name: 'name1',
		age: 20,
	}
];

// 모든 속성이 readonly일 경우, 유틸리티(Utility)나 단언(Assertion) 타입을 활용
// Readonly Utility
let user1: Readonly<IUser> = {
	name: 'Neo',
	age: 36
};
user1.age = 85; // Error
user1.name = 'Evan'; // Error

// 타입 단언 (Type assertion)
let user2 = {
	name: 'Neo',
	age: 36
} as const;
user2.age = 85; // Error
user2.name = 'Evan'; // Error
```


## 인터페이스 확장
`인터페이스도 클래스처럼 extends 키워드를 활용해 상속` 
또는 `같은 이름의 인터페이스를 여러 개 만들어 기존에 만들어진 인터페이스에 내용을 추가`하는 경우
```typescript
interface IAnimal {
	name: string
}
interface ICat extends IAnimal {
	meow(): string
}

class Cat implements ICat { // Error - TS2420: Class 'Cat' incorrectly implements interface 'ICat'. Property 'name' is missing in type 'Cat' but required in type 'ICat'.
	meow() {
		return 'MEOW~'
	}
}
```
```typescript
interface IFullName {
	firstName: string,
	lastName: string
}
interface IFullName {
	middleName: string
}

const fullName: IFullName = {
	firstName: 'Tomas',
	middleName: 'Sean',
	lastName: 'Connery'
};
```


## 타입 별칭 (Type Aliases)
`type 키워드를 사용해 새로운 타입 조합`  
`일반적인 경우 둘 이상의 조합으로 구성하기 위해 유니온을 많이 사용`  
```typescript
type MyType = string;
type YourType = string | number | boolean;
type TUser = { name: string, age: number, isValid: boolean } | [ string, number, boolean ]; // { ... } 또는 [ ... ]

// TUser에서 T는 Type를 의미하는 별칭으로 사용
let userA: TUser = {
	name: 'Neo',
	age: 85,
	isValid: true
};
let userB: TUser = [
	'Evan', 
	36, 
	false
];

function someFunc(arg: MyType): YourType {
	switch (arg) {
		case 's':
			return arg.toString(); // string
		case 'n':
			return parseInt(arg); // number
		default:
			return true; // boolean
	}
}
```



## Void  
`Void는 일반적으로 값을 반환하지 않는 함수에서 사용`  
```typescript
function hello(msg: string): void {
	console.log(`Hello ${msg}`);
}
```


## function   
`화살표 함수를 이용해 타입을 지정`   
```typescript
// myFunc는 2개의 숫자 타입 인수를 가지고, 숫자 타입을 반환하는 함수.
let myFunc: (arg1: number, arg2: number) => number;

myFunc = function (x, y) {
	return x + y;
};
```
`함수 타입을 인터페이스로 정의하는 경우, 호출 시그니처(Call signature)라는 것을 사용`   
```typescript
interface IUser {
	name: string
}
interface IGetUser {
	(name: string): IUser
}

// 매개 변수 이름이 인터페이스와 일치할 필요가 없습니다.
// 또한 타입 추론을 통해 매개 변수를 순서에 맞게 암시적 타입으로 제공할 수 있습니다.
const getUser: IGetUser = function (n) { // n is name: string
	// Find user logic..
	// ...
	return user;
};
getUser('Heropy');
```


## Tuple  
Tuple 타입은 배열과 매우 유사  
차이점이라면 `정해진 타입의 고정된 길이(length) 배열을 표현`   
```typescript
let tuple: [string, number];
tuple = ['a', 1];
tuple = ['a', 1, 2]; // Error - TS2322
tuple = [1, 'a']; // Error - TS2322

// 데이터를 개별 변수로 지정하지 않고, 단일 Tuple 타입으로 지정해 사용
let user: [number, string, boolean] = [1234, 'HEROPY', true];
console.log(user[0]); // 1234
console.log(user[1]); // 'HEROPY'
console.log(user[2]); // true

// Tuple 타입의 배열(2차원 배열)을 사용
let users: [number, string, boolean][];
users = [[1, 'Neo', true], [2, 'Evan', false], [3, 'Lewis', true]];

// 값으로 타입을 대신
let tuple: [1, number];
tuple = [1, 2];
tuple = [1, 3];
tuple = [2, 3]; // Error - TS2322: Type '2' is not assignable to type '1'.

// readonly 키워드를 사용해 읽기 전용 튜플을 생성
let a: readonly [string, number] = ['Hello', 123];
a[0] = 'World'; // Error - TS2540: Cannot assign to '0' because it is a read-only property.
```


## Enum (열거형)
숫자 혹은 문자열 값 집합에 이름(Member)을 부여할 수 있는 타입  
`값의 종류가 일정한 범위로 정해져 있는 경우 유용`  
`기본적으로 0부터 시작하며 값은 1씩 증가`  
```typescript
enum Week {
	Sun,
	Mon,
	Tue,
	Wed,
	Thu,
	Fri,
	Sat
}
console.log(Week.Mon); // 1
console.log(Week.Tue); // 2
```
`수동으로 값을 변경할 수 있으며, 값을 변경한 부분부터 다시 1씩 증가`  
```typescript
enum Week {
	Sun, // 0
	Mon = 22,
	Tue, // 23
	Wed, // 24
	Thu, // 25
	Fri, // 26
	Sat // 27
}
console.log(Week.Mon); // 22
console.log(Week.Tue); // 23
```
`Enum은 숫자 값 열거뿐만아니라 문자열 값으로 초기화할 수 있음`  
```typescript
enum Color {
	Red = 'red',
	Green = 'green',
	Blue = 'blue'
}
console.log(Color.Red); // red
console.log(Color['Green']); // green
```


## Class  
`인터페이스로 클래스를 정의하는 경우, implements 키워드를 사용`  
```typescript
interface IUser {
	name: string,
	getName(): string
}

class User implements IUser {
	constructor(public name: string) {

	}
	getName() {
		return this.name;
	}
}

const neo = new User('Neo');
neo.getName(); // Neo
```
Construct signature  
`new 키워드를 사용해야 하는 경우`  
```typescript
interface ICat {
	name: string
}
interface ICatConstructor {
	new (name: string): ICat; // Construct signature
}

class Cat implements ICat {
	constructor(public name: string) {}
}
function makeKitten(c: ICatConstructor, n: string) {
	return new c(n); // ok
}

const kitten = makeKitten(Cat, 'Lucy');
console.log(kitten);
```


## Never
`절대 발생하지 않을 값을 나타내며, 어떠한 타입도 적용할 수 없음`  
```typescript
function error(message: string): never {
	throw new Error(message);
}
```


-----


## 타입추론
`명시적으로 타입 선언이 되어있지 않은 경우, 타입스크립트는 타입을 추론해 제공`  
타입스크립트는 `자바스크립트와 호환성을 위해 타입 주석 부분을 생략`할 수 있습니다.  
타입스크립트 컴파일러는 다음과 같은 코드를 만나면 대입 연산자 = 오른쪽 값에 따라 변수의 타입을 지정합니다.  
이를 `타입 추론(type inference)`이라고 합니다.
```typescript
let n = 1; // n의 타입을 number로 판단
let b = true; // b의 타입을 boolean으로 판단
let s = 'hello'; // s의 타입을 string으로 판단
let o = {}; // o의 타입을 object로 판단
```
```typescript
// 변수 num을 초기화하면서 숫자 12를 할당해 Number 타입으로 추론되었고, 
let num = 12;
// 따라서 'Hello type!'이라는 String 타입의 값은 할당할 수 없기 때문에 에러가 발생
num = 'Hello type!'; // TS2322: Type '"Hello type!"' is not assignable to type 'number'.
```

`타입스크립트가 타입을 추론하는 경우`
- 초기화된 변수  
- 기본값이 설정된 매개 변수  
- 반환 값이 있는 함수  

타입 추론이 엄격하지 않은 타입 선언을 의미하는 것은 아닙니다.  
따라서 이를 활용해 모든 곳에 타입을 명시할 필요는 없으며, 많은 경우 더 좋은 코드 가독성을 제공할 수 있습니다.


## 타입변환 (타입스크립트는 '타입단언'이라는 용어로 사용)
`타입 추론을 통해 판단할 수 있는 타입의 범주를 넘는 경우, 더 이상 추론하지 않도록 지시할 수 있음`  
타입이 있는 언어들은 특정 타입의 변숫값을 `다른 타입의 값으로 변환할 수 있는 기능`을 제공합니다.   
이를 `타입변환(type conversion)`이라고 합니다.
```typescript
let person: object = { name: 'test' };
console.log(person.name); // 'object' 형식에 'name' 속성이 없습니다. 에러!
```
```typescript
function someFunc(val: string | number, isNumber: boolean) {
	// some logics
	if(isNumber) {
		// 1. '변수 as 타입' 방식
		(val as number).toFixed(2);
		// 2. '<타입>변수' 방식
		// (<number>val).toFixed(2);
	}
}
```

인터페이스 사용을 추천
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

`타입스크립트는 독특하게 타입 변환이 아닌 타입 단언(type assertion)이라는 용어를 사용`합니다.
```
(<타입>객체)
또는
(객체 as 타입)
```

이들은 모두 ES5 자바스크립트 구문이 아닙니다.  
따라서 `자바스크립트의 타입 변환 구문과 구분하기 위해 타입 단언이라는 용어를 사용`합니다.  
```typescript
interface INameable {
	name: string
};
let obj: object = { name: 'YSM' };
let name1 = (<INameable>obj).name;
let name2 = (obj as INameable).name;
console.log(name1, name2); // YSM YSM
```


## Non-null 단언 연산자 - 특히 컴파일 환경에서 체크하기 어려운 DOM 사용에서 유용
`!`를 사용하는 Non-null 단언 연산자(Non-null assertion operator)를 통해  
피연산자가 `Nullish(null이나 undefined) 값이 아님을 단언`할 수 있는데,  
변수나 속성에서 간단하게 사용할 수 있기 때문에 유용  
```typescript
// Error - TS2533: Object is possibly 'null' or 'undefined'.
function fnA(x: number | null | undefined) {
	return x.toFixed(2);
}

// if statement
function fnD(x: number | null | undefined) {
	if(x) {
		return x.toFixed(2);
	}
}

// Type assertion
function fnB(x: number | null | undefined) {
	return (x as number).toFixed(2);
}
function fnC(x: number | null | undefined) {
	return (<number>x).toFixed(2);
}

// Non-null assertion operator
function fnE(x: number | null | undefined) {
	return x!.toFixed(2); 
}
```

```typescript
// Error - TS2531: Object is possibly 'null'.
document.querySelector('.menu-item').innerHTML;

// Type assertion
(document.querySelector('.menu-item') as HTMLDivElement).innerHTML;
(<HTMLDivElement>document.querySelector('.menu-item')).innerHTML;

// Non-null assertion operator
document.querySelector('.menu-item')!.innerHTML;
```


## 타입 가드 (Guards) - 타입 단언을 여러 번 사용하게 되는 경우 유용  
`타입 가드는 NAME is TYPE 형태의 타입 술부(Predicate)를 반환 타입으로 명시한 함수`  
```typescript
// 일반적 타입 단언 사용 방식
function someFunc(val: string | number, isNumber: boolean) {
	if(isNumber) {
		(val as number).toFixed(2);
		isNaN(val as number);
	}else {
		(val as string).split('');
		(val as string).toUpperCase();
		(val as string).length;
	}
}
```
```typescript
// 타입 가드 함수 사용 방식
function isNumber(val: string | number): val is number { // 타입 가드 함수
	// typeof, in 그리고 instanceof 연산자 등 사용
	return typeof val === 'number';
}
function someFunc(val: string | number) {
	if(isNumber(val)) {
		val.toFixed(2);
		isNaN(val);
	}else {
		val.split('');
		val.toUpperCase();
		val.length;
	}
}
```


-----


## 타입 주석 (함수 선언문에서 매개변수, 반환값)
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


## 함수 시그니처 (함수의 타입)
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


## 제네릭 방식 타입 - 타입을 인수로 받아서 사용
`사용 시점에 타입을 선언할 수 있는 방법을 제공`  
타입을 `T 와 같은 일종의 변수(타입 변수)로 취급하는 것`을 `제네릭(generics)타입`이라고 합니다.  

> <u>컴파일러는 T 의 의미를 알 수 있어야 합니다.  
즉, T 가 타입 변수(type variable)라고 알려줘야 합니다.</u>  
const 함수이름 = `<타입변수>`(매개변수: 타입변수): 타입변수 => {};  

> T 는 Type의 약자로 다른 언어에서도 제네릭을 선언할 때 관용적으로 많이 사용된다.  
이 부분에는 식별자로 사용할 수 있는 것이라면 무엇이든 들어갈 수 있다. 이를테면 $나 _도 가능하다는 의미다.  
하지만 대개의 경우 T를 사용한다. 여기에서 T를 타입 변수(Type variables)라고 한다.   

```typescript
function toArray<T>(a: T, b: T): T[] {
	return [a, b];
}

toArray<number>(1, 2);
toArray<string>('1', '2');
toArray<string | number>(1, '2');
toArray<number>(1, '2'); // Error
```

`타입 추론을 활용해, 사용 시점에 타입을 제공하지 않을 수 있음`  
```typescript
const arrayLength = <T>(array: T[]): number => array.length;
const isEmpty = <T>(array: T[]): boolean => arrayLength<T>(array) == 0;

let numArray: number[] = [1, 2, 3];
let strArray: string[] = ['Hello', 'World'];

arrayLength(numArray); // 타입 추론
isEmpty([]); // 타입 추론
```

> 두 개 이상의 타입 변수  
제네릭 함수나 클래스에서는 두 개 이상의 타입 변수도 사용할 수 있다.   
```typescript
function toPair<T, U>(a: T, b: U): [ T, U ] {
	return [ a, b ];
}
toPair<string, number>('1', 1); // [ '1', 1 ]
```
<br>


## 제네릭 함수의 타입 추론
`제네릭 형태로 구현된 함수는 원칙적으로는 타입변수를 명시`해줘야 합니다.
```typescript
const identoty = <T>(n: T): T => n;
console.log(identoty<boolean>(true)); // true - 타입 변수 명시
console.log(identoty(true)); // true - 타입 추론 방식
```
하지만 이런 코드는 번거로워서 `타입스크립트는 타입 변수 부분을 생략할 수 있게 합니다.`   
타입스크립트는 타입 변수가 생략된 제네릭 함수를 만나면 타입 추론을 통해 생략된 타입을 찾아냅니다.  
<br>


## 제네릭 함수의 함수 시그니처
타입스크립트는 어떤 경우 `함수 시그니처의 매개변수 부분에 변수 이름을 기입하라고 요구`합니다.  
```typescript
// cb 라는 이름의 매개변수에 함수 시그니처를 사용
const f = (cb: (a: number, number?) => number): void => {}; // 오류발생! - 타입만 있고 변수명은 없음!
```
이런 오류가 발생하면 타입스크립트가 해석하지 못하는 부분에 변수를 삽입하고 이 변수에 타입을 명시해 해결합니다.    
```typescript
const f = (cb: (a: number, i?: number) => number): void => {};
```
```typescript
const f = <T>(cb: (arg: T, i?: number) => number): void => {};
```


-----


## 타입 수정자 readonly, 불변과 가변
`readonly 타입으로 서언된 매개변숫값을 변경하는 시도가 있으면 문제가 있는 코드라고 알려줘서 불순 함수가 되지 않게 방지`합니다.
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


## 함수형 프로그래밍이란?
함수형 프로그래밍은 순수 함수와 선언형 프로그래밍의 토대 위에 함수 조합(function composition)과 모나드 조합(monadic composition)으로 코드를 설계하고 구현하는 기법입니다.  
<br>

## 제네릭 함수
타입스크립트에서 `제네릭 타입은 함수와 인터페이스, 클래스, 타입 별칭에 적용`할 수 있으며,  
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


## 제네릭 프로그래밍 
`제네릭 타입은 인터페이스나 클래스, 함수, 타입 별칭 등에 사용할 수 있는 기능`으로,  
해당 심벌의 `타입을 미리 지정하지 않고 다양한 타입을 대응하려고 할 때 사용`합니다.  
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


## 제네릭 타입 제약, 제약 조건(Constraints)   
`extends 키워드를 사용하는 제약 조건을 추가`  
`T extends U`  
```typescript
interface MyType<T extends string | number> {
	name: string,
	value: T
}

const dataA: MyType<string> = {
	name: 'Data A',
	value: 'Hello world'
};
const dataB: MyType<number> = {
	name: 'Data B',
	value: 1234
};
const dataC: MyType<boolean> = { // TS2344: Type 'boolean' does not satisfy the constraint 'string | number'.
	name: 'Data C',
	value: true
};
const dataD: MyType<number[]> = { // TS2344: Type 'number[]' does not satisfy the constraint 'string | number'.
	name: 'Data D',
	value: [1, 2, 3, 4]
};
```
```typescript
type U = string | number | boolean;

// type 식별자 = 타입 구현
type MyType<T extends U> = string | T;

// interface 식별자 { 타입 구현 }
interface IUser<T extends U> {
	name: string,
	age: T
}
```


## 조건부 타입(Conditional Types)
`제약 조건과 다르게 ‘타입 구현’ 영역에서 사용하는 extends는 삼항 연산자(Conditional ternary operator)를 사용`  
`T extends U ? X : Y`  
```typescript
type U = string | number | boolean;

// type 식별자 = 타입 구현
type MyType<T> = T extends U ? string : never;

// interface 식별자 { 타입 구현 }
interface IUser<T> {
	name: string,
	age: T extends U ? number : never
}
```
```typescript
// `T`는 `boolean` 타입으로 제한.
interface IUser<T extends boolean> {
	name: string,
	age: T extends true ? string : number, // `T`의 타입이 `true`인 경우 `string` 반환, 아닌 경우 `number` 반환.
	isString: T
}

const str: IUser<true> = {
	name: 'Neo',
	age: '12', // String
	isString: true
}
const num: IUser<false> = {
	name: 'Lewis',
	age: 12, // Number
	isString: false
}
```
```typescript
type MyType<T> =
	T extends string ? 'Str' :
	T extends number ? 'Num' :
	T extends boolean ? 'Boo' :
	T extends undefined ? 'Und' :
	T extends null ? 'Nul' :
	'Obj';
```


## infer
`infer 키워드를 사용해 타입 변수의 타입 추론(Inference) 여부를 확인할 수 있음`  
U가 추론 가능한 타입이면 참, 아니면 거짓 `T extends infer U ? X : Y`   
```typescript
// 타입 변수 R은 MyType<number>에서 받은 타입 number가 되고 infer 키워드를 통해 타입 추론이 가능한지 확인
// number 타입은 당연히 타입 추론이 가능하니 R을 반환하게 됩니다.(만약 R을 타입 추론할 수 없다면 null이 반환됩니다)
// 결과적으로 MyType<number>는 number를 반환하고 변수 a는 123을 할당할 수 있습니다.
type MyType<T> = T extends infer R ? R : null;
const a: MyType<number> = 123;
```


-----


## 클래스(Class)
- public  
어디서나 자유롭게 접근 가능(생략 가능)    
- protected  
나와 파생된 후손 클래스 내에서 접근 가능    
- private  
내 클래스에서만 접근 가능  

- static  
정적으로 사용 (속성, 일반 메소드)  
- readonly  
읽기 전용으로 사용 (속성)  

```typescript
class Cat {
	static legs: number;
	readonly name: string;
	constructor() {
		Cat.legs = 4; // Init static property.
		this.name = 'test';
	}
}
console.log(Cat.legs); // undefined
new Cat();
console.log(Cat.legs); // 4

class Dog {
	// Init static method.
	static getLegs() {
		return 4;
	}
}
console.log(Dog.getLegs()); // 4
```


## 추상(Abstract) 클래스
```typescript 
// Abstract Class
abstract class Animal {
	abstract name: string; // 파생된 클래스에서 구현해야 합니다.
	abstract getName(): string; // 파생된 클래스에서 구현해야 합니다.
}
class Cat extends Animal {
	constructor(public name: string) {
		super();
	}
	getName() {
		return this.name;
	}
}
new Animal(); // Error - TS2511: Cannot create an instance of an abstract class.
const cat = new Cat('Lucy');
console.log(cat.getName()); // Lucy

// Interface
interface IAnimal {
	name: string;
	getName(): string;
}
class Dog implements IAnimal {
	constructor(public name: string) {}
	getName() {
		return this.name;
	}
}
```


-----


## 모듈의 타입 선언(Ambient module declaration)
모듈 구현(implement)과 타입 선언(declaration)이 동시에 이뤄지는 타입스크립트와 달리,  
구현만 존재하는 자바스크립트 모듈(E.g. Lodash)을 사용하는 경우, 컴파일러가 이해할 수 있는 모듈의 타입 선언이 필요하며,   
이를 대부분 `.d.ts파일로 만들어 제공하`게 됩니다.  
1. 루트 경로에 lodash.d.ts 파일을 생성  
2. module 키워드를 사용해 모듈 이름을 명시  
```typescript
// lodash.d.ts

// 모듈의 타입 선언(Ambient module declaration)
// 타입스크립트 컴파일러가 이해할 수 있도록 declare 키워드를 통해 선언
declare module 'lodash' {
	// 1. 타입(인터페이스) 선언
	interface ILodash {
		camelCase(str?: string): string
	}

	// 2. 타입(인터페이스)을 가지는 변수 선언
	const _: ILodash;

	// 3. 내보내기(CommonJS)
	export = _;
}
```


---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- 


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

```typescript
// tsconfig.json
{
	//...
	"typeRoots": [
		"typings.d.ts"
	],
}
```
```typescript
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


---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- ---------- 


# 타입 (Type)
> `:`를 이용하여 자바스크립트 코드에 타입을 정의하는 방식을 타입 표기(Type Annotation)라고 합니다.  
> `타입설정대상:타입명시`  

- String  
```typescript
let str: string = 'hi';
```

- Number  
```typescript
let num: number = 10;
```

- Boolean  
```typescript
let isLoggedIn: boolean = false;
```

- Array  
```typescript
let arr: number[] = [1,2,3];
// 또는
let arr: Array<number> = [1,2,3];
```

- Tuple  
(튜플은 배열의 길이가 고정되고 각 요소의 타입이 지정되어 있는 배열 형식을 의미)  
```typescript
let arr: [string, number] = ['hi', 10];
```

- Enum  
(특정 값(상수)들의 집합을 의미)  
```typescript
enum Avengers { Capt, IronMan, Thor }
let hero: Avengers = Avengers.Capt;
// 또는 (인덱스 번호로도 접근)
enum Avengers { Capt, IronMan, Thor }
let hero: Avengers = Avengers[0];
```

- Any  
(모든 타입에 대해서 허용한다는 의미)  
```typescript
let str: any = 'hi';
let num: any = 10;
let arr: any = ['a', 2, true];
```

- Void  
(변수에는 undefined와 null만 할당하고, 함수에는 반환 값을 설정할 수 없는 타입)  
```typescript
let unuseful: void = undefined;
function notuse(): void {
	console.log('sth');
}
```

- Never  
(함수의 끝에 절대 도달하지 않는다는 의미)  
```typescript
function neverEnd(): never {
	while (true) {

	}
}
```

- Element  
```typescript
const content: HTMLElement = document.querySelector('#content');
```

----------


# 함수 (Function)
- 함수의 반환 값에 타입을 정하지 않을 때는 void라도 사용  
```typescript
function text(): void {
	console.log('ysm');
}
function sum(a: number, b: number): number {
	return a + b;
}
```

- 타입스크립트에서는 함수의 인자를 모두 필수 값으로 간주  
(선택적 사용 변수는 '?' 사용)
```typescript
function sum(a: number, b?: number): number {
	return a + b;
}
```

- 파라미터의 초기값  
```typescript
function sum(a: number, b = '100'): number {
	return a + b;
}
```

- ES6 REST문법  
(파라미터의 여러 인자들을 하나의 배열로 받음)  
```typescript
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
> 타입 단언, 타입 캐스팅, 다운 캐스팅, 강제형변환  
> 타입 단언 문법은 `<Type>` 과 as Type 으로 두 종류  
> JSX 를 사용하는 경우 `<Type>` 키워드는 JSX 의 문법과 겹치기 때문에 불편  

```typescript
let hello: number = 1;

(hello as unknown as string).substr(1, 2); 
// (<string>hello).substr(1, 2); 
// hello의 타입을 string으로 바꾸고 substr 메소드를 실행한다.
// unknown : number와 string은 명확히 다른 타입이기 때문에 unknown을 생략할 수 없다.
```


----------


# 타입 별칭 (Type Aliases)
> 'type' 키워드  

```typescript
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
> 미리 정의한 약속, 규칙을 의미 
1. 객체(JSON)의 스펙
2. 함수의 전체모양 (파라미터타입, 반환타입 등 한번에 타입설정)
3. 함수 파라미터 타입, 반환 타입 각각 설정
4. 배열과 객체를 접근 방식
5. 클래스

```typescript
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
```typescript
interface nameImpl {
	readonly name: string;
}
let ysm: nameImpl = {
	name: '유성민'
};
```

- 읽기 전용 배열  
(ReadonlyArray`<T>` 타입을 사용)
```typescript
let arr: ReadonlyArray<number> = [1,2,3];

// 또는

interface ReadonlyStringArray {
	readonly [index: number]: string;
}
const arr: ReadonlyStringArray = ['Thor', 'Hulk'];
arr[2] = 'Capt'; // Error!
```


- 타입 체킹  
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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

- 인터페이스 확장 (`인터페이스도 클래스처럼 extends 키워드를 활용해 상속할 수 있습니다.`)    
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
> 한가지 타입보다 여러 가지 타입에서 동작하는 컴포넌트를 생성하는데 사용  
> 타입을 마치 함수의 파라미터처럼 사용하는 것  

```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
class GenericMath<T> {
	pi: T;
	sum: (x: T, y: T) => T;
}

let math = new GenericMath<number>();
```

- `제네릭 조건 부여 ('extends' 키워드)`  
`T extends U`
```typescript
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

```typescript
// 조건부여 전
interface MyType<T> {
  name: string,
  value: T
}
const dataA: MyType<string> = {
  name: 'Data A',
  value: 'Hello world'
};
const dataD: MyType<number[]> = {
  name: 'Data D',
  value: [1, 2, 3, 4]
};
```
```typescript
// 조건부여 후
interface MyType<T extends string | number> { // 조건부여!!
  name: string,
  value: T
}
const dataA: MyType<string> = {
  name: 'Data A',
  value: 'Hello world'
};
const dataD: MyType<number[]> = { // TS2344: Type 'number[]' does not satisfy the constraint 'string | number'.
  name: 'Data D',
  value: [1, 2, 3, 4]
};
```

대표적으로 `type` 과 `interface` 키워드를 사용하는 타입 선언은 다음 예제와 같이 `=` 기호를 기준으로 ‘식별자’와 ‘타입 구현’으로 구분할 수 있습니다.  
제약 조건은 ‘식별자’ 영역에서 사용하는 `extends`에 한합니다.  
```typescript
type U = string | number | boolean;

// type 식별자 = 타입 구현
type MyType<T extends U> = string | T;

// interface 식별자 { 타입 구현 }
interface IUser<T extends U> {
  name: string,
  age: T
}
```


- 인덱싱 가능 타입(Indexable types)    


- `keyof` 
인덱싱 가능 타입에서 `keyof`를 사용하면 속성 이름을 타입으로 사용할 수 있습니다.
인덱싱 가능 타입의 속성 이름들이 유니온 타입으로 적용됩니다.
```typescript
interface ICountries {
  KR: '대한민국',
  US: '미국',
  CP: '중국'
}
let country: keyof ICountries; // 'KR' | 'US' | 'CP'
country = 'KR'; // ok
country = 'RU'; // Error - TS2322: Type '"RU"' is not assignable to type '"KR" | "US" | "CP"'.
```



- `객체의 속성을 제약`  
```typescript
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
https://www.typescriptlang.org/docs/handbook/utility-types.html  
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

