let registeredShortcuts = []
let shortcuts = {};
const handleKeyDown = event => {
	for (let i = 0; i < registeredShortcuts.length;i++) {
		const shortcut = registeredShortcuts[i];
		if (shortcuts[shortcut](event)) {
			break;
		}
	}
};
const addKeyBinding = (toDo,name) => {
	registeredShortcuts.push(name)
	shortcuts[name]=toDo
}
document.addEventListener('keydown', handleKeyDown);
control = false
document.addEventListener('keyup', (event)=>{if(event.key == 'Control'){control = false}});
