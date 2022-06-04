var addBtn = document.getElementById("add");
var title = document.getElementById("title");
var writer = document.getElementById("writer");
var tag = document.getElementById("tag");
var desc = document.getElementById("desc");
var date = document.getElementById("date");
var blogsData = document.getElementById("blogsData");
var inputs = document.getElementsByClassName("form-control")
var btns = document.getElementById("btns");

if(localStorage.getItem('BLOGS')){
   var blogs = JSON.parse(localStorage.getItem("BLOGS"))
   displayBlogs();
}else
{
    var blogs = [];
    localStorage.setItem('BLOGS',JSON.stringify(blogs));
}
addBtn.addEventListener('click',function(){
addBlog();
displayBlogs();
clearForm();
})

function addBlog(){
    var blog ={
        id:blogs.length,
        title:title.value,
        writer:writer.value,
        tag:tag.value,
        desc:desc.value,
        date:date.value
    }
    blogs.push(blog);
    localStorage.setItem("BLOGS",JSON.stringify(blogs));

}
function displayBlogs(){
var result = '';
for(var i=0; i<blogs.length;i++){
    result += 
    `
    <tr>
            <th scope="row">${blogs[i].id}</th>
            <td>${blogs[i].title}</td>
            <td>${blogs[i].writer}</td>
            <td>${blogs[i].tag}</td>
            <td>${blogs[i].desc}</td>
            <td>${blogs[i].date}</td>
            <td>
            <button type="button" class="btn btn-primary" onclick="updateBlog(${i})">update</button>
            <button type="button" class="btn btn-danger" onclick="deletBlog(${i})">delete</button>
            </td>
          </tr>
    
    `
    clearForm();
}
blogsData.innerHTML = result;
}
function clearForm(){
    for(var i =0; i<inputs.length; i++){
        inputs[i].value = '';
    }
}
function deletBlog(index){
    blogs.splice(index,1);
    localStorage.setItem("BLOGS",JSON.stringify(blogs));
    displayBlogs();
    
}
function updateBlog(index){
    title.value = blogs[index].title;
    writer.value = blogs[index].writer;
    tag.value = blogs[index].tag;
    desc.value = blogs[index].desc;
    date.value = blogs[index].date;
    btns.innerHTML = `
<button type="button" class="btn btn-primary" onclick="(function(){
    addBlog();
     displayBlogs()
    })();">Add Blog</button>
<button type="button" class="btn btn-success"  id="update">Update Blog</button>
`;
var updateBtn = document.getElementById("update");
updateBtn.onclick = function(){
blogs[index].title =  title.value ;
blogs[index].writer = writer.value;
blogs[index].tag =  tag.value ;
blogs[index].desc = desc.value ;
blogs[index].date = date.value;
localStorage.setItem("BLOGS",JSON.stringify(blogs));
btns.innerHTML = `
<button type="button" class="btn btn-primary" onclick="(function(){
    addBlog();
     displayBlogs()
    })();">Add Blog</button>`
clearForm();
displayBlogs();
}
l
}
function editData(currentIndex){

}
function search(test){
var data= "";
for(var i=0; i<blogs.length;i++){
    if(blogs[i].title.toLowerCase().includes(test.toLowerCase())){
    data += `
    <tr>
            <th scope="row">${blogs[i].id}</th>
            <td>${blogs[i].title}</td>
            <td>${blogs[i].writer}</td>
            <td>${blogs[i].tag}</td>
            <td>${blogs[i].desc}</td>
            <td>${blogs[i].date}</td>
            <td>
            <button type="button" class="btn btn-primary" onclick="updateBlog(${i})">update</button>
            <button type="button" class="btn btn-danger" onclick="deletBlog(${i})">delete</button>
            </td>
          </tr>
    
    `
    }
}
console.log(data);
blogsData.innerHTML = data;

}
function deleteAll(){
    localStorage.removeItem("BLOGS");
    blogs = [];
    displayBlogs();
}