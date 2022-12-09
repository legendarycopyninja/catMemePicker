import {catsData} from '/data.js'

/*
    Challenge:
    1. Add a nested "for of" to log out just 
        the emotions from the emotionTags array 
        in each object.
    1. Set up a const and initialise it with 
       an empty array.
    2. Instead of logging out each emotion, 
       push each one to the new array.
    3. At the end of the function, log out the 
       const holding the new array.
    */ 

function getEmotionsArray(cats){
    
        const emotionsArray = []
        
        for (let cat of cats){
            for (let emotion of cat.emotionTags){
     /*
Challenge:
1. Refactor this nested for of so that an 
   emotion is only pushed to emotionsArray
   if it is not already in emotionsArray.
   Extra kudos if you use the "logical not"
   operator - feel free to google it!
*/
                if (!emotionsArray.includes(emotion)) {
                    emotionsArray.push(emotion)
                   
                }
            }
            
        }
        return emotionsArray
    }
    
  /*
Challenge:
1. Take control of the 'emotion-radios' div.
2. In renderEmotionsRadios, set up a let 
   to hold our string of HTML. You can initialise
   it with an empty string.
3. Iterate over "emotions" and put each emotion 
   in a <p> tag and then add them to the let you 
   created in step 2. 
4. Render the string to the 'emotion-radios' div.
*/ 
const emotionRadios = document.getElementById("emotion-radios")
function renderEmotionsRadios(cats){
    let result = ''
    const emotions = getEmotionsArray(cats)
    for (let emotion in emotions){
    /*
Challenge:
1. Swap out `<p>${emotion}</p>` for HTML
   that will render a radio input for each
   emotion. Remember to use "type", "id", 
   "value", and "name" properties on each radio.
   ("id" and "value" can both be set to the
   "emotion").
2. Remember to give each radio a label.
   (What property does a label need?)
3. Enclose each individual radio input in this div:
   <div class="radio">
      **RADIO HERE**
   </div>
*/     
        result += `<div class="radio">
        <label for="${emotions[emotion]}">${emotions[emotion]}</label>
        <input 
                    type="radio"
                    id="${emotions[emotion]}"
                    value="${emotions[emotion]}"
                    name="choice-radios" 
                    >
                               
     </div> `
     
    }
    emotionRadios.innerHTML = result
}

renderEmotionsRadios(catsData)  
 
/*
Challenge:
1. Add an eventListener to emotionRadios that will listen 
   out for any *change* in our radio buttons. When it detects
   a change, it should log out the id of the element that 
   was selected.
⚠️️ ️T️h️is won't work if the eventListener is listening out for a 
   'click'. Google what event to listen for - I've already 
   given you a clue!
*/
emotionRadios.addEventListener('change', highlightCheckedOption)

    function highlightCheckedOption(e){

/*
Challenge:
1. Create an array of all items that have 
   the "radio" class.
2. Iterate over the array and remove the 
   "highlight" class from each one.
*/ 
const radios = document.getElementsByClassName('radio')
    
for (let radio of radios){
    radio.classList.remove('highlight')
}

        document.getElementById(e.target.id).parentElement.classList.add('highlight')
    /*
    Challenge:
    1. Change the code in line 8 so we add the 
       'highlight' class to the parent of the 
       selected input radio.
    */
    }

    const getImageBtn = document.getElementById('get-image-btn')
    const checkedGifs = document.getElementById('gifs-only-option')
    
    
    getImageBtn.addEventListener('click', rendercat)
   
/*
Challenge:
1. Take control of the gifs only option checkbox.
2. Set up a const in getMatchingCatsArray to store 
   a boolean which will be set to true if the 
   "gifs only" option is checked and false if it's
   not. (Think what a good name for this const would 
   be.)
3. Log it out to check it's working.
*/
        /*
        Challenge:
        1. Add code to getMatchingCatsArray so 
           that the two existing lines of code 
           only run if an emotion has been selected.
        */

/*
Challenge:
1. Use the .filter() and .includes() methods to get 
   an array of cats which have the selected emotion
   in their emotionTags array. 
2. Store this array in a const and log it out to check
   it's working. Think: what would be a good name for the
   const?
*/

           function getMatchingCatsArray(){
            if(document.querySelector('input[type="radio"]:checked')){
                const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
                const isGif = checkedGifs.checked

                const matchingCatsArray = catsData.filter(function(cat){
                    if(isGif){
                        return cat.emotionTags.includes(selectedEmotion) && cat.isGif
                    }
                    else{
                        return cat.emotionTags.includes(selectedEmotion)
                    }
        /*
        Challenge:
        1. Change the .filter() method's function so it returns an 
           array that only has GIFs if the 'GIFs only' option is 
           checked. If the 'GIFs only' option is not checked, it
           should return an array of all matches as it does now.
        */ 
                    
                })
                return matchingCatsArray
            }
            
        }

function getSingleCatObject() {

    const catsArray = getMatchingCatsArray()
    if (catsArray.length === 1){
        return catsArray[0]
    }
    else {
        const randomNumber = Math.floor(Math.random() *catsArray.length)
        return catsArray[randomNumber]
    }
}

const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const closeBtn = document.getElementById('meme-modal-close-btn')

function rendercat(){
    const catObject = getSingleCatObject()
    /*
Challenge:
1. Take the object that is returned by 
   getSingleCatObject and save it to a const 
   called "catObject".
2. Set memeModalInner’s innerHTML to the HTML 
   string below, remembering to insert the relevant 
   data from catObject to replace the UPPERCASE text.
3. Set memeModal’s display property to "flex". 
 
       `<img 
        class="cat-img" 
        src="./images/CAT IMAGE"
        alt="CAT ALT TEXT"
        >`
*/ 
memeModalInner.innerHTML = `<img 
class="cat-img" 
src="./images/${catObject.image}"
alt=${catObject.alt}
>`
memeModal.style.display ='flex'
}

closeBtn.addEventListener('click',function(){
    memeModal.style.display ='none'
    checkedGifs.checked = false
    highlightCheckedOption()
})