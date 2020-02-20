let registeredShortcuts = []
const handleKeyDown = event => {
	for (let i = 0; i < registeredShortcuts.length;i++) {
		if (registeredShortcuts[i](event)) {
			break;
		}
	}
};
const addKeyBinding = (toDo) => {
	registeredShortcuts.push(toDo)
}
document.addEventListener('keydown', handleKeyDown);
