
const button = document.getElementById("b")
const button_a = document.getElementById("a")
const button_с = document.getElementById("с")
const button_e = document.getElementById("e")
const pre = document.getElementById("m")
button.addEventListener("click", () => {open()})
button_a.addEventListener("click", () => {close()})
button_с.addEventListener("click", () => {sendToChild()})
button_e.addEventListener("click", () => {sendToParent()})

// без params откроется скорее всего в новой вкладке, зависит от браузера
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=600,left=100,top=100`

let a

function open() {
	// const b = window.open('/', 'example', 'width=600,height=400');
	a = window.open("http://localhost:8080/","some", params)
	console.log('here', a)
	onLoad(a, () => {
		console.log("window load")
	})

}

function sendToChild() {
	postMessage(a, "its message")
}


function postMessage(child,message) {
	child.postMessage(message, "*")
}

//Дожидаемся пока все прогрузится
function onLoad(child,cb) {
	child.addEventListener("onload", cb())
}

function close() {
	// const b = window.open('/', 'example', 'width=600,height=400');
	a.close()
	console.log('close', a)
}

window.addEventListener("message", (e) => {
	if (e.data && e.data.type && e.data.type.includes("webpack")) return
	pre.innerText = JSON.stringify(e.data)
	self.console.log(e)
	if(a) {
		a.close()
	}
})


function sendToParent() {
	console.log(window.opener)
	window.opener.postMessage({message: "im your child", count: 2, array: ["some", "any"]}, '*');
}

