/*
-
타입주석
let 변수이름:티입 [= 초기값]
const 변수이름:타입 = 초기값


-
타입추론
변수 선언문에 타입 주석을 명시하지 않았지만, 컴파일러가 초기값에 따라 타입을 추론하므로 
각 변수는 초기값에 해당하는 타입으로 지정됩니다. (따라서 이후에 각 변수에는 해당 타입의 값만 저장할 수 있습니다.)
let n = 1; // n의 타입을 number 로 판단
let b = true; // b의 타입을 boolean 으로 판단
let s = 'hello'; // s의 타입을 string 으로 판단
let p = {}; // o의 타입을 object 로 판단


-
any 타입
타입스크립트는 자바스크립트와 호환을 위해 any 라는 이름의 타입을 제공합니다.
값의 타입과 무관하게 어떤 종류의 값도 저장할 수 있습니다.
let a: any = 0;
a = 'hello';
a = true;
a = {};


-
undefined 타입
자바스크립트 처럼 타입스크립트에서 undefined 는 타입이기도 하고 값이기도 합니다. 
(변수를 초기화하지 않으면 해당 변수는 undefined 값)
let u: undefined = undefined; 
*/

let test1: number = 1;
let test2: boolean = false;
let test3: string = 'test';
let test4: object = {}; 
let test5: undefined = undefined;


/*
-
제네릭 타입
number 와 같은 타입을 타입 변수(type variable) T 로 표기할 때 이를 '제네릭 타입(generic type)'이라고 합니다.
타입스크립트의 함수는 매개변수와 반환값에 타입이 존재하므로, 함수 조합을 구현할 떄는 제네릭 함수 구문을 사용해야만 합니다.


타입스크립트의 제네릭 함수 구문
타입스크립트에서 제네릭 타입은 함수와 인터페이스, 클래스, 타입 별칭에 적용할 수 있으며, 꺾쇠 괄호 <>로 타입을 감싼 <T>, <T, Q> 처럼 표현합니다.
*/
// a 메개변수가 제네릭 타입으로 지정
function g1<T>(a: T): void {}
// a와 b 매개변수가 각각 다른 제네릭 타입으로 지정
function g2<T, Q>(a: T, b: Q): void {}

// 타입 별칭(tpe-alias)에 제네릭 타입을 적용한 예
type Type1Func<T> = (T) => void;
type Type2Func<T, Q> = (T, Q) => void;
type Type3Func<T, Q, R> = (T, Q) => R; // T와 Q타입 값을 입력 받아 R타입 값을 반환하는 것

// 아이덴티티 함수
type MapFunc<T, R> = (T) => R;
type IdentityFunc<T> = MapFunc<T, T>;

// 아이덴티티 함수 활용 예
const numberIdentity: IdentityFunc<number> = (x: number): number => x;

