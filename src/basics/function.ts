/*
-
함수 선언문
일반적으로 parameter 는 '매개변수' 라고 하고,
argument 는 '인수' 혹은 '인자'라고 합니다.
매개변수는 함수 선언문에서 함수 이름 뒤 괄호 안에 선언되는 변수이고,
인수는 함수를 호출할 대 전달하는 값입니다.
function 함수 이름(매개변수: 타입, 매개변수: 타입[, ...]) : 반환값 타입 {
	...
}

function add(a: number, b: number): number {
	return a + b;
}

값을 반환하지 않는 함수는 반환 타입이 void 입니다.
function printMe(name: string, age: number): void {
	console.log(`name: ${name}, age: ${age}`);
}


-
함수 시그니처
변수에 타입이 있듯이 함수 또한 타입이 있는데, 함수의 타입을 함수 시그니처(function signature)라고 합니다.
(매개변수 타입, 매개변수 타입[, ...]) => 반환값 타입

let printMe: (strin, number) => void = console.log(`name: ${name}, age: ${age}`);


-
type 키워드로 타입 별칭 만들기
타입스크립트는 type 이라는 키워드를 제공합니다.
type 키워드는 기존에 존재하는 타입을 단순히 이름만 바궈서 사용할 수 있게 해줍니다.
이러한 기능을 타입 별칭(type alias)이라고 합니다.
type 새로운 타입 = 기존 타입

type stringNumberFunc = (string, number) => void;
let f: stringNumberFunc = function(a: string, b: number): void {}
let g: stringNumberFunc = function(c: string, d: number): void {}


-
const 키워드와 함수 표현식
함수 표현식을 담는 변수는 let 보다는 const 키워드로 선언하는 것이 바랍직합니다.
let 키워드는 변수값이 변할 수 있으므로 다음처럼 코드를 작성하면 함수 f는 언젠가 다른 내용으로 바뀔 수 있습니다.
let f = () => {}

반면에 함수 표현식을 담는 변수를 const 키워드로 선언하면, 함수 내용이 이후에 절대 바뀔 수 없습니다.
const f = () => {}


-
화살표 함수
const 함수이름 = (매개변수1: 타입1, 매개변수2: 타입2[, ...]) : 반환타입 => 함수몸통


-
실행문과 표현식 문
꽤 오래전부터 프로그래밍 언어는 실행문 지향 언어(execution-oriented language)와 표현식 지향 언어(expression-oriented language)로 구분되어 왔습니다.
C가 대표적인 실행문 지향 언어이고, 스칼라(scala)가 대표적인 표현식 지향 언어입니다. 
자바스크립트는 흥미롭게도 ES5는 실행문 지향언어이지만, ESNext 와 타입스크립트는 실행문과 표현식 문을 동시에 지원합니다.
보통 이런 언어를 '다중 패러다임 언어(multi-paradigm language)'라고 합니다.
프로그래밍 언어에서 실행문은 CPU에서 실행되는 코드를 의미합니다. 그런데 실행문은 CPU에서 실행만 될 뿐 결과를 알려주지 않습니다. 실행문이 실행된 결과를 알려면 반드시 return 키워드를 사용해야 합니다.
반면에 표현식 문은 CPU에서 실행된 결과를 굳이 return 키워드를 사용하지 않아도 알려줍니다.


-
일등 함수
콜백 함수
일등 함수(first-class function)는 프로그래밍 언어가 제공하는 기능입니다.
일등 함수 기능을 제공하는 언어에서 함수는 '함수 표혀닉'이라는 일정의 값입니다. 따라서 변수에 담을 수 있습니다. 이 말은 함수 표현식을 매개변수로 받을 수 있다는 것을 의미합니다.
이처럼 매개변수 형태로 동작한는 함수를 콜백함수(callback function)라고 합니다.
const f = (callback: () => void): void => callback();


-
중첩 함수
함수형 언어에서 함수는 변수에 담긴 함수 표현식이므로 함수 안에 또 다른 함수를 중첩(nested)함수 구현할 수 있습니다.
const calc = (value: number, cb: (number) => void): void => {
	let add = (a, b) => a + b;
	function multiply(a, b) { return a * b }

	let result = multiply(add(1, 2), value)
	cb(result)
}
calc(30, (result: number) =>console.log(`result is ${result}`)) // result is 90


-
고차 함수
고차 함수(high-order function)는 또 다른 함수를 반환하는 함수를 말합니다.
함수형 언어에서 함수는 단순히 함수 표현식이라는 값이므로 다른 함수를 반환할 수 있습니다.
고차 함수 기능이 없다면 함수형 프로그래밍이 불가능할 정도로 고차함수는 매우 중요한 기능입니다.
const add = (a: number): (number) => number (b:number): number => a + b;


-
부분 적용 함수(부분함수)와 커리
add(1)(2)나 add(1)(2)(3)과 같은 코드의 고차 함수들은 이처럼 자신의 차수(값반환 차수)만큼 함수 호출 연산자를 연달아 사용합니다.
만약 add(1)이나 add(1)(2) 처럼 자신의 차수보다 함수 호출 연산자를 덜 사용하면(최종 값이 반한되기 전 호출 차수) '부분 적용 함수(partially applied function)', 짧게 말하면 '부분 함수(partial function)'라고 합니다.


-
클로저
고차 함수의 몸통에서 선언되는 변수들은 클로저(closure)라는 유효 범위를 가집니다.
클로저는 '지속되는 유효 범위(persistence scope)'를 의미합니다.


-
고차함수와 클로저
고차 함수를 구현하려면 클로저 기능은 필수입니다.
타입스크립트뿐만 아니라 고차 함수 구문이 있는 모든 프로그래밍 언어는 클로저 기능을 제공합니다.
따라서 어떤 프로그래밍 언어는 클로저와 고차 함수를 한꺼번에 클로저로 표현하기도 합니다.


-
함수 조합
함수 조합(function composition)은 작은 기능을 구현한 함수를 여러 번 조합해 더 의미 있는 함수를 만들어 내는 프로그램 설계 기법입니다.
함수 조합을 할 수 있는 언어들은 compose 혹은 pipe 라는 이름의 함수를 제공하거나 만들 수 있습니다.
*/
export const f = <T>(x: T): string => `f(${x})`;
export const g = <T>(x: T): string => `g(${x})`;
export const h = <T>(x: T): string => `h(${x})`;
const y = h(g(f('x')));






