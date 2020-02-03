function change(){
  let read = document.querySelector("#read");
  
  if(read.getAttribute("read") == "true"){
    read.innerHTML = "<<< Read less";
    read.setAttribute("read","false");
  }
  else {
    read.innerHTML = "Read more >>>";
    read.setAttribute("read","true");
  }
}

window.onload = change;
document.querySelector("#read").addEventListener("click", change);
