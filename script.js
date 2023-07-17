/* form Control Code */

var registerForm = document.getElementById("register-form")
var allInput = registerForm.querySelectorAll("INPUT");
var addBtn = document.querySelector("#add-btn");
var model = document.querySelector(".model");
addBtn.onclick = function(){
    model.classList.add("active");// it is used to  show the form as popup when we click on the add data button
}

/* Code for remove the model/from  */
 var closeBtn = document.querySelector(".close-icon");
closeBtn.onclick = function(){
     model.classList.remove("active");
     var i; // code for to takr empty data form.
     for(i=0; i<allInput.length; i++){
        allInput[i].value = "";
     }
 }


// /* start  declare all global var.  */
    var userData = [];
    var registerBtn  = document.querySelector("#register-btn");
    var idEl= document.getElementById("id");
    var nameEl = document.getElementById("name");
    var l_nameEl = document.getElementById("l-name");
    var emailEl = document.getElementById("email");
    var officeEl = document.getElementById("office-code");
    var jobTitleEl = document.getElementById("job-title");
    var imgUrl;
    var updateBtn  = document.querySelector("#update-btn");

    var profile_pic = document.querySelector("#profile-pic"); //code of imge pressing.
    var uploadPic  = document.querySelector("#upload-pic"); //code of imge pressing.
 
// /* End all global var. */


// /* codig for registration button */
registerBtn.onclick = function(e){
    e.preventDefault();// By this method form page it will not reload the form 
    regitrationData();
    registerForm.reset(''); // reset it is the method for reset the data
    closeBtn.click();
    getDataFromLocal();
}

// userData =  JSON.parse(localStorage.getItem('userData')); // to get data in local storage of array and by using this process data will not delete.
// console.log(userData);
if(localStorage.getItem("userData") != null){
    userData =  JSON.parse(localStorage.getItem('userData'));
}


 function  regitrationData(){   
 userData.push({
    id : idEl.value,
     name : nameEl.value,
    l_name : l_nameEl.value,
     email : emailEl.value,
     office : officeEl.value,
     jobTitle : jobTitleEl.value,
     profilePic : imgUrl == undefined ? "./img/pics1.jpg" : imgUrl  // ternary operator

  });
  var userString =JSON.stringify(userData);
  localStorage.setItem("userData", userString);
  swal("Good job!", "Registration is successful", "success");
 }


 /* code for bring data from local storage to on display page. */
var tableData = document.querySelector("#table-data");
const getDataFromLocal = () =>{
    tableData.innerHTML = "";
    userData.forEach((data,index)=>{
        //console.log(index);
        tableData.innerHTML += `
        <tr index ='${index}' >
        <td>${index+1}</td> 
        <td><img src="${data.profilePic}" width="40" height="40"></td> 
        <td>${data.id}</td> 
        <td>${data.name}</td> 
        <td>${data.l_name}</td> 
        <td>${data.email}</td> 
        <td>${data.office}</td> 
        <td>${data.jobTitle}</td> 
        <td>
        <button class="edit-btn" style="background-color: green;"><i class="fa fa-eye"></i></button>
        <button class = "del-btn"><i class="fa fa-trash"></i></button>
        </td> 
    </tr>
        `;

    });


    //code for delete data 
    var i;
    var allDelBtn = document.querySelectorAll(".del-btn");
    for(i=0; i<allDelBtn.length; i++){
        allDelBtn[i].onclick = function(){
            var tr = this.parentElement.parentElement; // accessing parent of parent element
           //console.log(tr);
           var idindex = tr.getAttribute("index");
           //-------------------------------------------------
           swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
          
                tr.remove(); // this delete only from display
                // alert(idindex);
                 userData.splice(idindex,1); // here splice method it is uses that for the delete the data from localstorage
                 localStorage.setItem("userData", JSON.stringify(userData));

              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });

          
           
        }
    }
    //console.log(allDelBtn);


    //.................................................................
    /* Start Upadte Data Code */
    var allEdit = document.querySelectorAll(".edit-btn");
    for(i=0; i<allEdit.length; i++){
        allEdit[i].onclick = function(){
            var tr = this.parentElement.parentElement;
            var td = tr.querySelectorAll("td");
           //console.log(td);
            var index = tr.getAttribute("index");
            var imgTag = td[1].getElementsByTagName("IMG");
            var profilePic = imgTag[0].src;
            var id = td[2].innerHTML;
            var name = td[3].innerHTML;
            var l_name = td[4].innerHTML;
            var email = td[5].innerHTML;
            var office = td[6].innerHTML;
            var jobTitle = td[7].innerHTML;
           addBtn.click();
           registerBtn.disabled = true;
           updateBtn.disabled = false;
           idEl.value = id;
           nameEl.value = name;
           l_nameEl.value = l_name;
           emailEl.value = email;
           officeEl.value = office;
           jobTitleEl.value = jobTitle;
           profile_pic.src = profilePic;
           updateBtn.onclick = function(e){ // this for update form data
                // e.preventDefault();
                // alert();
                userData[index] = {
                    id : idEl.value,
                    name : nameEl.value,
                    l_name : l_nameEl.value,
                    email : emailEl.value,
                    office : officeEl.value,
                    jobTitle : jobTitleEl.value,
                    profilePic : uploadPic.value == "" ?  profile_pic.src : imgUrl  // ternary operator

                }
                localStorage.setItem("userData",JSON.stringify(userData));

           }


        }
    }

}
getDataFromLocal();

//  code of image processing 
 
 uploadPic.onchange = function(){
    
     if(uploadPic.files[0].size < 1000000){
         var freader = new FileReader(); // it is API

         freader.onload = function(e){
           imgUrl = e.target.result;
             profile_pic.src = imgUrl;
             console.log(imgUrl);
         }
         freader.readAsDataURL(uploadPic.files[0]);
     }else{
         alert("File size can't be more than 3 mb");
     }
}


// code for Search Data

var searchEL =  document.querySelector("#empId");
searchEL.oninput = function(){
    searchfn();
}

function searchfn(){
    var tr = tableData.querySelectorAll("TR");
    var filter = searchEL.value.toLowerCase();
    var i;
    for(i=0; i<tr.length; i++){
        var id = tr[i].getElementsByTagName("td")[2].innerHTML;
        var name = tr[i].getElementsByTagName("td")[3].innerHTML;
       // var id = td.innerHTML;
        if(id.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";
        }
        else if(name.toLowerCase().indexOf(filter) > -1){
            tr[i].style.display = "";
        }
        
        else{
            tr[i].style.display = "none";
        }
    }
       
}


/* start code all clear data */

var delAllBtn = document.querySelector("#del-all-btn");
var allDelBox = document.querySelector("#delAll-box");
delAllBtn.addEventListener('click', () =>{
    if(allDelBox.checked == true){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                localStorage.removeItem("userData");
                window.location = location.href;
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
    }else{
        swal("Check The Box", "Please check the box to delete data", "warning");
    }
})