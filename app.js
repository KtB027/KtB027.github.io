document.querySelector("#masuk").addEventListener("click",function(){
	document.querySelector(".popup").classList.add("active");
	document.querySelector(".popup-register").classList.remove("active");

});

document.querySelector(".popup .close-btn").addEventListener("click",function(){
	document.querySelector(".popup").classList.remove("active");
});

document.querySelector("#registration").addEventListener("click",function(){
	document.querySelector(".popup").classList.remove("active");
	document.querySelector(".popup-register").classList.add("active");

});

document.querySelector(".popup-register .close-btn-register").addEventListener("click",function(){
	document.querySelector(".popup-register").classList.remove("active");
});

document.querySelector("#login-back").addEventListener("click",function(){
	document.querySelector(".popup").classList.add("active");
	document.querySelector(".popup-register").classList.remove("active");

});