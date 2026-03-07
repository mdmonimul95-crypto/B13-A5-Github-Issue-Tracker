const cardconteiner = document.getElementById("cardconteiner");
let allProblems = [];

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
        
       console.log(problem);
       const card = document.createElement("div");
       card.className = "bg-white w-[270px] p-[16px] rounded-md shadow-md  border-t-4 ";
       card.innerHTML = `
                <div class="flex justify-between items-center mb-3">
                  <img src="${statusImg}">
                  <div  class="priority bg-[#feececFF] p-1 pl-4  pr-4 rounded-2xl">
                      ${problem.priority}
                  </div>
                </div>
                <div class="">
                  <p class="font-semibold line-clamp-1 mb-2 text-[14px]">${problem.title}</p>
                  <span class="font-normal line-clamp-2 mb-2 text-[12px]">${problem.description}</span>
                
                  <div class="flex  gap-2 mt-3 ">
                   ${labelImages}
                   
                  </div>
                </div>
                <div class="mt-3">
                  <p>#1 by ${problem.author}</p>
                  <p> ${formattedDate}</p>
                </div>

                 
              `;
              if( problem.status === "open"){
                 card.classList.add("border-green-500");
                 }  if(problem.status === "closed"){
                 card.classList.add("border-[#A855F7]");
                 }
              
               const priorityDiv = card.querySelector(".priority");

               if(problem.priority === "medium"){
                priorityDiv.classList.remove("bg-[#feececFF]");
                priorityDiv.classList.add("bg-[#fff6d1FF]");
              
                }
                 if(problem.priority === "low"){
                priorityDiv.classList.remove("bg-[#feececFF]");
                priorityDiv.classList.add("bg-[#eeeff2FF]");
              
                }
               
              cardconteiner.appendChild(card);
             

    });
}
 
problemLode()
 

