/*
-
인터페이스 선언문
타입스크립트는 객체의 타입을 정의할 수 있게 하는 interface 라는 키워드를 제공합니다.
interface 인터페이스 이름 {
	속성이름[?]: 속성타입[,...]
}


-
선택 속성 구문
인터페이스를 설계할 때 어떤 속성은 반드시 있어야 하지만, 어떤 속성은 있어도 되고 없어도 되는 형태로 만들고 싶을 때가 있습니다.
이러한 속성을 선택속성(optional property) 이라고 합니다.
interface 인터페이스 이름 {
	etc?: boolead // 물음표(?) 선택속성 명시
}


-
익명 인터페이스
타입스크립트는 interface 키워드도 사용하지 않고 인터페이스의 이름도 없는 인터페이스를 만들 수 있습니다.
이를 익명 인터페이스(anonymous interface) 라고 합니다.
let ai: {
	name: string
	age: number
	etc?: boolean
} = {name: 'YSM', age: 35}


-
클래스
타입스크립트는 C++ 나 자바와 같은 객체지향 언어에서 흔히 볼 수 있는 class, private, public, protected, implements, extend 와 같은 키워드를 제공합니다.
class 클래스 이름 {
	[private | protected | public] 속성이름[?]: 속성타입[...]
}

class Person {
	name: string
	age: number
	constructor(name: string, age?: number) {
		this.name = name;
		this.age = age;
	}
}
let ysm: Person = new Person('YSM', 35);


-
클래스의 인터페이스 구현
class 클래스 이름 implements 인터페이스 이름 {
	...
}

interface IPerson {
	name: string
	age?: number
}
class Person implements IPerson {
	name: string
	age: number
}

또는

class Person implements Iperson {
	constructor(public name: string, public age?: number) {}
}


-
추상 클래스
타입스크립트는 다른 언어처럼 abstract 키워드를 사용해 추상 클래스를 만들 수 있습니다.
abstract class 클래스 이름 {
	abstract 속성 이름: 속성 타입
	abstract 메서드 이름() {}
}

abstract class AbstractPerson {
	// name 속성 앞에 abstract 가 붙었으므로 new 연산자를 적용해 객체를 만들 수 없습니다.
	abstract name: string
	constructor(public age?: number) {}
}


-
클래스의 상속
class 상속 클래스 extends 부모 클래스 { ... }

abstract class AbstractPerson {
	// name 속성 앞에 abstract 가 붙었으므로 new 연산자를 적용해 객체를 만들 수 없습니다.
	abstract name: string
	constructor(public age?: number) {}
}
// Person 클래스는 AbstractPerson 추상 클래스를 상속해 
// AbstractPerson 가 구현한 age를 얻고, AbstractPerson 를 상속받은 클래스가 구현해야할 name 속성을 구현합니다.
class Person extends AbstractPerson {
	constructor(public name: string, age?: number) {
		// 부모 클래스의 생성자를 super 키워드로 호출할 수 있습니다.
		super(age);
	}
}


-
static 속성
class 클래스 이름 {
	static 정적 속성 이름: 속성 타입
}
'클래스이름.정적 속성이름' 형태의 점 표기법(dot notation)을 사용해 값을 얻거나 설정합니다.

class A {
	static initValue = 1
}
let initVal = A.initValue;


-
객체의 타입 변환 / 타입 단언
타입이 있는 언어들은 특정 타입의 변수값을 다른 타입의 값으로 변환할 수 있는 기능을 제공합니다.
이를 타입 변환(type conversion) 이라고 합니다.
그런데 타입스크립트는 독특하게 타입 변환이 아닌 타입 단언(type assertion) 이라는 용어를 사용합니다.
타입 단언문은 다음 두 가지 형태가 있습니다.
(<타입>객체)
(객체 as 타입)

inerface INameable {
	name: string
};

let obj: object = {name: 'YSM'};
// INameable 타입 객체로 변환되어 자신에게 담긴 객체의 name 속성값을 얻습니다.
let name1 = (<INameable>obj).name;
let name2 = (obj as INameable).name;
console.log(name1, name2); // YSM YSM

*/


interface IPerson {
	name: string
	age: number
}
/*let test6: IPerson = {
	name: 'YSM',
	age: 35
}
let bad1: IPerson = {
	name: 'YSM'
	// age 속성이 없으므로 오류
}
let bad2: IPerson = {
	age: 35
	// name 속성이 없으므로 오류
}
let bad3: IPerson = {
	// name, age 속성이 없으므로 오류
}
let bad4: IPerson = {
	name: 'YSM',
	age: 35,
	etc: true, // etc 속성이 있으므로 오류
}*/

class Person1 {
	name: string
	age?: number
}
let ysm1: Person1 = new Person1();
ysm1.name = 'YSM';
ysm1.age = 35;

/*
-
정적 메소드
메서드 속성 앞에 static 붙여 정적 메서드를 만들 수 있습니다.
'클래스이름.정적메소드()' 형태로 호출합니다.
*/
export class C {
	static ysm(): string {
		return '유성민';
	}
}
console.log(C.ysm());

/*
-
메서드 체인
타입스크립트로 메서드 체인을 구현하려면 메서드가 항상 this 를 반환하게 합니다.
*/
export class Chain {
	constructor(public value: number = 0) {} 
	add(value: number) {
		this.value += value;
		return this;
	}
	multiply(value: number) {
		this.value *= value;
		return this;
	}
}
let chain = new Chain();
let result = chain.add(1).add(2).add(3).multiply(3).multiply(4).value;
console.log(result); // (0 + 1 + 2) * 3 * 4 = 36

