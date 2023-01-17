export function setLocalStorage(todosJson: any) {
	window.localStorage.setItem('dotnet-wasm-todomvc', todosJson);
}

export function getLocalStorage() {
	return window.localStorage.getItem('dotnet-wasm-todomvc') || '[]';
};
