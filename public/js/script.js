const cross_btn = document.querySelector(".fa-times");
const input_box = document.querySelector("#input-box");

cross_btn.addEventListener('click',()=>{
    input_box.value = "";
})

