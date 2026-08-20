const users = [
  { id: 1, name: 'Tùng', age: 25, role: 'admin', isActive: true },
  { id: 2, name: 'An', age: 20, role: 'user', isActive: true },
  { id: 3, name: 'Bình', age: 22, role: 'user', isActive: false },
];

function getActiveUsers(users) {
  return users.filter(user => user.isActive === true);
}

function getNames(users) {
  return users.map(user => user.name);
}

function printUserInfo({ name, age }) {
  console.log(`Tên: ${name} - Tuổi: ${age}`);
}

console.log("Danh sách user active:");
console.log(getActiveUsers(users));

console.log("\nDanh sách tên:");
console.log(getNames(users));

console.log("\nThông tin user:");
printUserInfo(users[0]);