const searchbar=document.querySelector('.searchbar-container')
const profilecontainer=document.querySelector('.profile-container')
const root=document.documentElement.style;
const get=(param)=>document.getElementById(`${param}`)
const url='https://api.github.com/users/'
const noresults=get('no-results')
const input=get('input')
const submit=get('submit')
const avatar=get('avatar')
const username=get('name')
const user=get('user')
const date=get('date')
const bio=get('bio')
const repos=get('repos')
const folowers=get('folowers')
const following=get('following')
const loc=get('location')
const page=get('page')
const twitter=get('twitter')
const company=get('company')
const months=['jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec']
const btnmode=get('btn-mode')
const modetext=get('mode-text')
const modeicon=get('mode-icon')
let darkMode=false
const body=document.querySelector('body')


submit.addEventListener('click', ()=>{
    if (input.value!==""){
        getuseData(url+input.value)
    }
})

input.addEventListener('keydown', (e)=>{
  if(e.key=='Enter'){
    if (input.value!==''){
        getUserData(url+input.value)
    }
  }
})

input.addEventListener('input', ()=>{
    noresults.style.display='none'
})

btnmode.addEventListener('click', ()=>{
   
    if (darkMode==false)
     darkModeProperties()

     else 
      lightModeProperties()
    
})

function getuseData(gitUrl){
    fetch(gitUrl)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        updateProfile(data)
    })
    .catch((error)=>{
        throw error;
    })
}

function updateProfile (data){
    if (data.message!=='Not Found'){
    noresults.style.display='none'
    console.log(noresults);
     function checkNull(param1, param2){
        if (param1==''||param1==null)
        {
            param2.style.opacity=0.5
            console.log(param2);
            param2.previousElementSibling.style.opacity=0.5;
            return false
        }
        else {
            return true
        }
     }

      avatar.src=`${data.avatar_url}`
      username.innerText= data.name===null? `${data.login}`:`${data.name}`
      user.innerText=`${data.login}`
      user.href=`${data.html_url}`
      datesegments = data.created_at.split("T").shift().split("-");
    console.log(data.created_at.split("T").shift().split('-'));
      date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
      bio.innerText=data.bio==null ?`This profile has no bio`:`${data.bio}`
      repos.innerText=`${data.public_repos}`
      folowers.innerText=`${data.followers}`
      following.innerText=`${data.following}`
      loc.innerText=checkNull(data.location, loc)?data.location:"Not Aviable"
      page.innerText=checkNull(data.blog,page)?data.blog:"Not Avilable"
      page.href=checkNull(data.blog, page)?data.blog:'#'
      twitter.innerText=checkNull(data.twitter_username, twitter)?data.twitter_username:"Not Available"
      twitter.href=checkNull(data.twitter_username,twitter)?`https://twitter.com/${data.twitter_username}`:'#'
      company.innerText=checkNull(data.company, company)?data.company:"Not Available"

      searchbar.classList.toggle('active')
      profilecontainer.classList.toggle('active')
      console.log(avatar);
    
    }
    else {
        noresults.style.display='block';
    }
}
 function darkModeProperties(){
  root.setProperty('--lm-bg', '#141D2F')
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText='LIGHT'

  modeicon.src='./images/sun-icon.svg'
  darkMode=true;
console.log(modeicon);
localStorage.setItem("dark-mode",true)

 }
//console.log(darkModeProperties());

 function lightModeProperties(){
    root.setProperty("--lm-bg", "#f6f6f6");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  
    modetext.innerText = "DARK";
    modeicon.src='./images/moon-icon.svg'
    root.setProperty("--lm-icon-bg", "brightness(100%)");

    darkMode=false;
    console.log('darkmode change to'+darkMode);
   localStorage.setItem("dark-mode",false)
    console.log('setting dark mode to false');
 }

//Initialise Ui 

function init() {
    darkMode = false;
  
  
    let value = localStorage.getItem("dark-mode");
  
    if(value === null) {
      console.log("null k andar");
      localStorage.setItem("dark-mode", darkMode);
      lightModeProperties();
    }
    else if(value == "true") {
      console.log("truer k andar");
      darkModeProperties();
    }
    else if(value == "false") {
      console.log("false k andar");
      lightModeProperties();
    }
  
  
    getuseData(url + "rajaartimuni1234");
 }

init()

