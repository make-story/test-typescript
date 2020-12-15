/*
-
배열의 타입
타입스크립트에서 배열의 타입은 '아이템 타입[]'입니다.
예를 들어, 배열의 아이템이 number 타입이면 배열의 타입은 number[]이고, 아이템이 string 타입이면 string[]입니다.
*/
let numArray: number[] = [1, 2, 3];

type IPersion = {name: string, age?: number};
let personArray: IPersion[] = [{name: 'ysm'}, {name: 'test', age: 30}];

// string 을 입력받아 배열로 반환
export const split = (str: string, delim: string = ''): string[] => str.split(delim);
split('hello'); // ['h', 'e', 'l', 'l', 'o']

/*
-
제네릭 방식 타입
배열을 다루는 함수를 작성할 떄는 number[] 와 같이 타입이 고정된 함수를 만들기 보다는
T[] 형태로 배열의 아이템 타입을 한꺼번에 표현하는 것이 편리합니다.
타입을 T와 같은 일종의 변수(타입 변수)로 취급하는 것을 제네릭(generics) 타입이라고 합니다.
*/
// number[], string[] 등 다양한 아이템 타입을 가지는 배열 기능
//const arrayLength = (array: T[]): number => array.length;
// 이렇게 하면 컴파일러가 T의 의미를 알 수 있어야 합니다.
// 즉, T가 타입 변수(type variable)라고 알려줘야 합니다.
export const arrayLength = <T>(array: T[]): number => array.length;
export const isEmpty = <T>(array: T[]): boolean => arrayLength<T>(array) === 0;

/*
-
제네릭 함수의 타입 추론
제네릭 형태로 구현된 함수는 원칙적으로는 타입 변수를 다음과 같은 형태로 명시해 주어야 합니다.
함수이름<타입변수>(매개변수)
하지만 이런 코드는 번거워로서 타입스크립트는 타입 변수 부분을 생략할 수 있게 합니다.
*/
const identity = <T>(n: T): T => n;
console.log(
	identity<boolean>(true), // true
	identity(true) // true
);