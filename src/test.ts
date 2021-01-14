import './css/drag.css';
import './drag.ts';

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

// test
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
