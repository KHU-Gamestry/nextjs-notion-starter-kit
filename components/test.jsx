import React,{useEffect} from 'react';
import { FaParking } from 'react-icons/fa';
import { IoCaretBackSharp } from 'react-icons/io5';
export default function test(){
    useEffect(()=>{
        try{
            const HEART_KEY="test_heart";
            const HEART = "heart.png";
            const EMPTY_HEART = "empty_heart.png";
            const savedHeart = localStorage.getItem(HEART_KEY);
            const cardBody = document.getElementsByClassName("notion-collection-card-size-large");

            var heartState = []; 
            const DIFF = ['A','B','C','D','ALL'];
            const par = document.getElementsByClassName("notion-gallery")[0];
            const HIDDENCLASS = "hidden";
            const diffBtnDiv = document.createElement("div");
            diffBtnDiv.id = "diff_container";
            par.prepend(diffBtnDiv);
            diffBtnDiv.classList.add("diff_container");
            for (var i = 0;i<5; i++){
                const btn = document.createElement("button");
                btn.id = `test_${DIFF[i]}`;
                btn.classList.add("test_diff_btn");
                btn.classList.add("btn");
                btn.classList.add("btn-outline-secondary");
                btn.innerText = `${DIFF[i]}`;
                diffBtnDiv.appendChild(btn);
                btn.addEventListener("click",handleDiffBtn);
            }
            
            function paintCards(showDiff){
                const tmp = document.querySelectorAll(".notion-property-multi_select-item");
                for(var i =3;i<tmp.length;i+=5){
                    const card = tmp[i].parentNode.parentNode.parentNode.parentNode;
                    console.log(card);
                    if(showDiff==="ALL"){
                        card.classList.remove(HIDDENCLASS);
                    }
                    else if(tmp[i].innerText===showDiff){
                        card.classList.remove(HIDDENCLASS);
                    }else{
                        card.classList.add(HIDDENCLASS);
                    }
                    
                }
            }
            function handleDiffBtn(event){
                const clickedDiff = event.target.innerText;
                console.log(clickedDiff);
                paintCards(clickedDiff);
            }
  
            

            
            function saveHeartState(){
                localStorage.setItem(HEART_KEY,JSON.stringify(heartState));
            }

            function handleHeart(event){
                event.preventDefault();
                const heartId = event.target.id;
                const storageHeartId = event.target.id.substr(6,event.target.id.length+1);
                const clickedHeart = document.getElementById(heartId);
                if(heartState[storageHeartId]===0){
                    // clicked
                    clickedHeart.src=HEART;
                    heartState[storageHeartId]=1;

                }else{
                    clickedHeart.src=EMPTY_HEART;
                    heartState[storageHeartId]=0;
                }
                saveHeartState();
                
            }

            if(savedHeart){
                heartState = JSON.parse(savedHeart);
            }else{
                heartState = [];
                for (var i = 0; i< cardBody.length; i++){
                    heartState.push(0);
                }
                saveHeartState();
            }

            
            for (var i = 0; i< cardBody.length; i++){
                const img = document.createElement("img");
                img.classList.add("test_heart");
                if(heartState[i]==1){
                    img.src=HEART;
                }else{
                    img.src=EMPTY_HEART;
                }
                img.id = `heart_${i}`;
                img.width=40;
                cardBody[i].prepend(img);
                img.addEventListener("click",handleHeart);
            }

       


        }catch(error){
            console.log(error);
        }

    
    })
    console.log("test");
    const success="success";
    return <div></div>;
}