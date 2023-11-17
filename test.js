let apiUrl="https://api.github.com/users/"
console.log(apiUrl);

let search=document.querySelector('#search')
let form=document.querySelector('#form')
let main=document.querySelector('#main')
let card=document.querySelector('.card')
let img=document.querySelector('.img')
let user_info=document.querySelector('.user-info')

const getUser=async (username)=>{
    const response=await fetch(apiUrl+username);

    const data=await response.json()
    console.log(data);
    img.src=`${data.avatar_url}`
    let h=document.querySelector('h2')
    h.innerText=`${data.name}`
    let p=h.nextElementSibling
    p.innerText=`${data.bio}`
    let li_1=p.nextElementSibling.firstElementChild
    li_1.innerHTML=`${data.followers}<strong>Follwers</strong>`
    let li_2=li_1.nextElementSibling
    li_2.innerHTML=`${data.following}<strong>Following</strong>`
   let li_3=document.querySelector('ul').lastElementChild
  li_3.innerHTML=`${data.public_repos}<strong>Repositories</strong>`
  
      getRepos(username)

} 



const getRepos =async (username)=>{
    const repos =document.querySelector("#repos");
    const response =await fetch(apiUrl + username +"/repos");
    const data =await response.json();

    console.log(data)
   data.forEach((item)=>{
    let a=document.createElement('a')
    a.classList='repo'
    a.href=item.html_url
    a.innerText=item.name
    a.target='_blank'
    repos.append(a)
})
}

form.addEventListener('submit',function formsubmit(){
    console.log("aarti");
 getUser(search.value)
})

