import './generics';

type typeFunc1 = (a: string, b: string, c: string, d: any) => void;
const testTypeFunc1: typeFunc1 = (a, b, ...c) => {
	console.log(`a: ${a}, b: ${b}`);
	console.log(c); // 배열 []
};
testTypeFunc1('1', '2', '3', '4');

type typeFunc2<T> = (a: T, b: T) => T;
const testTypeFunc2: typeFunc2<string> = (a, b) => {
	return a + b;
}
console.log(`testTypeFunc2: ${testTypeFunc2('a', 'b')}`);

let a1: string[] = ['A', 'B', 'C',];
let a2: Array<string> = ['A', 'B', 'C',];
let a3: (string | number)[] = ['A', 1, 'B', 2, 3, 4];
let a4: Array<string | number> = ['A', 1, 'B', 2, 3, 4];
let a5: any = [0, 1, {}, [], 'str', false];

interface IUser {
	name: string,
	age: number,
}
let userArr: IUser[] = [
	{
		name: 'name1',
		age: 10,
	},
	{
		name: 'name1',
		age: 20,
	}
];

// ------

export function makePerson(name: string, age: number) {
	return {
		name,
		age,
	};
};
export function testMakePerson() {
	console.log(makePerson('YSM', 22), makePerson('유성민', 33));
};

function test(a: number, b: number): number {
	return a + b;
}
console.log('TEST!!!');
const $root = document.querySelector('#root');
if($root) {
	$root.textContent = 'YSM!!!' + test(1, 2);
}

function sum(a: number, ...nums: number[]): number {
	let total = 0;
	for (let key in nums) {
		total += nums[key];
	}
	return a + total;
}
console.log(sum(1, 2, 3, 4, 5));

// object 타입 
//let person: object = { name: 'test' };
//console.log(person.name); // 'object' 형식에 'name' 속성이 없습니다. 에러!

// 인터페이스 방식
/*interface personObject {
	name: string,
};
let person: personObject = { name: 'test' };
console.log(person.name);*/

// 타입변환 방식
let person: object = { name: 'test' };
(<{name: string}>person).name;
