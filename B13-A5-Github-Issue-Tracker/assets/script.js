const cardconteiner = document.getElementById("cardconteiner");
let allProblems = [];
let allCount = document.getElementById("allcount")
function calculateCount(){

   allCount.innerText = cardconteiner.children.length;
};


async function problemLode() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    // console.log(data);
    // displayProblem(data.data);
    allProblems = data.data;   // data store
    displayProblem(allProblems);
}

problemLode()

// const cardconteiner = document.getElementById('cardconteiner');
// console.log(allcardsection.children.length)
// const maincontriner = document.querySelector('main')

// const rejecteded = document.getElementById('rejecteded')
const allBtn = document.getElementById('all-btn')
const allOpenBtn = document.getElementById('all-open-btn')
const allClosedBtn = document.getElementById('all-closed-btn')

function toggleStyle(id){
    allBtn.classList.add('bg-white','text-black')
    allOpenBtn.classList.add('bg-white','text-black')
    allClosedBtn.classList.add('bg-white','text-black')

    allBtn.classList.remove('bg-[#4a00ffFF]','text-white')
    allOpenBtn.classList.remove('bg-[#4a00ffFF]','text-white')
    allClosedBtn.classList.remove('bg-[#4a00ffFF]','text-white')

    const selected = document.getElementById(id)
    currentstatus = id
    // console.log(currentstatus);

    selected.classList.remove('bg-white','text-black')
    selected.classList.add('bg-[#4a00ffFF]','text-white')
    //  empty.classList.add('hidden')
       if(id === "all-btn"){
        displayProblem(allProblems)
    }

    else if(id === "all-open-btn"){
        const openProblems = allProblems.filter(p => p.status === "open")
        displayProblem(openProblems)
    }

    else if(id === "all-closed-btn"){
        const closedProblems = allProblems.filter(p => p.status === "closed")
        displayProblem(closedProblems)
    }
    // if(id == 'allOpenBtn'){
    //   allcardsection.classList.add('hidden');
    //   rejecteded.classList.add('hidden')
    //   filterSection.classList.remove('hidden')
    //   // console.log(interRigtotalbox)
    //   interRigtotalbox.classList.remove('hidden')
    //   interRigtotalbox.classList.add('flex')
    //   Righttotalbox.classList.remove('flex')
    //   Righttotalbox.classList.add('hidden')
    //    reterRigtotalllbox.classList.remove('flex')
    //     reterRigtotalllbox.classList.add('hidden')
        // if( interviewlist.length === 0){
        //   empty.classList.remove('hidden')
        //  }
      // console.log(interRigtotalbox)
    //   renderInterview()
    // }else if( id == "all-thriving-btn"){
    //    allcardsection.classList.remove('hidden')
    //   filterSection.classList.add('hidden')
    //   rejecteded.classList.add('hidden')
    //    Righttotalbox.classList.remove('hidden')
    //    Righttotalbox.classList.add('flex')
    //    interRigtotalbox.classList.remove('flex')
    //    interRigtotalbox.classList.add('hidden')
    //     reterRigtotalllbox.classList.remove('flex')
    //     reterRigtotalllbox.classList.add('hidden')
    //      empty.classList.add('hidden')
    //     //   if(allcardsection.children.length === 0){
    //     //   empty.classList.remove('hidden')
    //     //  }

    // }else if(id=='rejected-thriving-btn'){
    //     allcardsection.classList.add('hidden')
    //    filterSection.classList.add('hidden')
    //    rejecteded.classList.remove('hidden')
    //    interRigtotalbox.classList.remove('flex')
    //    interRigtotalbox.classList.add('hidden')
    //     Righttotalbox.classList.remove('flex')
    //     Righttotalbox.classList.add('hidden')
    //     reterRigtotalllbox.classList.add('flex')
    //     reterRigtotalllbox.classList.remove('hidden')
    //      empty.classList.add('hidden')
    //       // if(rejectedlist.length === 0){
    //       // empty.classList.remove('hidden')
    //       //  }
    //    renderRejected();
    // }
}
function openModal(problem){
   const statusEl = document.getElementById("statusM");
    statusEl.innerText = problem.status; // Text

    // Class assignment based on status
    if(problem.status === "open"){
        statusEl.className = "text-green-600 font-semibold bg-green-100 px-2  rounded-full";
    } else {
        statusEl.className = "text-red-600 font-semibold bg-red-100 px-2  rounded-full";
    }
   let labelImages = "";

    if(problem.labels && problem.labels.length > 0){
        problem.labels.forEach(label => {
            if(label === "bug"){
                labelImages += `<img src="./bug.png" alt="bug">`;
            } else if(label === "help wanted"){
                labelImages += `<img src="./help.png" alt="help">`;
            } else if(label === "enhancement"){
                labelImages += `<img src="./enhancement.png" alt="label">`;
            } else if(label === "good first issue"){
                labelImages += `<p class="rounded-xl pl-1 line-clamp-1 bg-fuchsia-400">good first issue</p>`;
            } else if(label === "documentation"){
                labelImages += `<p class="rounded-xl pl-1 pr-1 bg-yellow-800 text-cyan-50">documentation</p>`;
            }
        });
          } else {
        labelImages = `<img src="./default.png" alt="label">`;
    }

   document.getElementById("levelM").innerHTML = labelImages;
  document.getElementById("modal-title").innerText = problem.title;
  document.getElementById("modal-description").innerText = problem.description;
  document.getElementById("openby").innerText = problem.author;
  document.getElementById("AssigneeM").innerText = problem.assignee;
  const date = new Date(problem.createdAt);

  document.getElementById("dateM").innerText = date.toLocaleString();

    const priorityEl = document.getElementById("priorityM");
    priorityEl.innerText = problem.priority;

    // Priority color based on level
    if(problem.priority === "high"){
        priorityEl.className = " w-15 pl-3 py-1  rounded-full font-semibold bg-red-100 text-red-500 ";
    } else if(problem.priority === "medium"){
        priorityEl.className = "w-20 px-2 py-1 rounded-full font-semibold bg-yellow-100 text-yellow-500";
    } else if(problem.priority === "low"){
        priorityEl.className = "w-12 px-2 py-1 rounded-full font-semibold bg-gray-300";
    }
   

 

  document.getElementById("my_modal_5").showModal();
  // document.getElementById("levelM").innerText =labelImages;

}
function displayProblem(problems){
        cardconteiner.innerHTML = "";
    // console.log(problems);
    problems.forEach(problem => {
         const statusImg = problem.status === "open"
                 ? "./Open-Status.png" : "./Closed- Status .png";
                 

                 let labelImages = "";

                 if(problem.labels && problem.labels.length > 0){

                  problem.labels.forEach(label => {

                 if(label === "bug"){
                 labelImages += `<img src="./bug.png" alt="bug">`;
                 }

                 else if(label === "help wanted"){
                 labelImages += `<img src="./help.png" alt="help">`;
                 }

                 else if(label === "enhancement"){
                 labelImages += `<img src="./enhancement.png" alt="label">`;
                 }
                 else if(label === "good first issue"){
                 labelImages += `<p class="rounded-xl pl-1 line-clamp-1 bg-fuchsia-400">good first issue</p>`;
                 }
                 else if(label === "documentation"){
                 labelImages += `<p class="rounded-xl pl-1 pr-1 bg-yellow-800 text-cyan-50 ">documentation</p>`;
                 }

                 });

                 }else{
                  labelImages = `<img src="./default.png" alt="label">`;
                 }
                 const date = new Date(problem.updatedAt);
                 const formattedDate = date.toLocaleDateString();
                 const idate = new Date(problem.createdAt);
                 const formattediDate = idate.toLocaleDateString();
        
       console.log(problem);
       const card = document.createElement("div");
       
       card.className = "bg-white w-[270px] p-[16px] rounded-md shadow-md  border-t-4 cursor-pointer";
       card.innerHTML = `<div class="">
                <div class="flex justify-between items-center mb-3">
                  <img src="${statusImg}">
                  <div  class="priority bg-[#f3cece] p-1 pl-4  pr-4 rounded-2xl text-red-500">
                      ${problem.priority}
                  </div>
                </div>
                <div class="mb-4">
                  <p class="font-semibold line-clamp-1 mb-2 text-[14px]">${problem.title}</p>
                  <span class="font-normal line-clamp-2 mb-2 text-[12px]">${problem.description}</span>
                
                  <div class="flex  gap-2 mt-3 ">
                   ${labelImages}
                   
                  </div>
                </div>
                <div class="border-t w-full"></div>
                <div class="mt-3">
                   <div class="flex justify-between">
                    <p class="text-xs"># ${problem.id} by ${problem.author}</p>
                    <p class="text-xs"> ${formattediDate}</p>
                   </div>
                   <div class="flex justify-between">
                    <p class="text-xs"> Assignee : ${problem.assignee}</p>
                    <p class="text-xs">Updated : ${formattedDate}</p>
                   </div>
                  
                </div>
                </div>

                 
              `;
              if( problem.status === "open"){
                 card.classList.add("border-green-500");
                 }  if(problem.status === "closed"){
                 card.classList.add("border-[#A855F7]");
                 }
              
               const priorityDiv = card.querySelector(".priority");

               if(problem.priority === "medium"){
                priorityDiv.classList.remove("bg-[#feececFF]","text-red-500");
                priorityDiv.classList.add("bg-[#fff6d1FF]","text-yellow-500");
              
                }
                 if(problem.priority === "low"){
                priorityDiv.classList.remove("bg-[#f3cece]","text-red-500");
                priorityDiv.classList.add("bg-[#eeeff2FF]");
              
                }
               card.onclick = () => openModal(problem);
              cardconteiner.appendChild(card);
              calculateCount();
              
             

    });
}
 
problemLode()


 

