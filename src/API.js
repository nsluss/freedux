export const makeTodo = (item) => new Promise(function (resolve, _) { setTimeout(() => resolve(item), 5000) })