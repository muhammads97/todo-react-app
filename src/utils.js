function getUser() {
  let token = localStorage.getItem("token");
  // console.log(token);
  if (token != null) {
    //get user
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/auto_login", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.send();
    // console.log(xhr);
    if (xhr.status == 200) {
      // console.log(JSON.parse(xhr.responseText));
      return JSON.parse(xhr.responseText);
    }
  }
  return null;
}

export default getUser;
