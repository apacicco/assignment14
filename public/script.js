

const addJewelry = async(e) => {
    e.preventDefault();
    const form = document.getElementById("add-JEWELS-form");

    const formData = new FormData(form);//all form data is in FormData
    

    formData.append("materials", getMaterials());
    //console.log(...formData);
    let response;

    if(form._id.value == -1)
    {
        formData.delete("_id");
       //console.log(...formData); 

       response = await fetch("/api/jewelry", {
        method:"POST",
        body:formData
       });
    }


   //after if, err if needed
   if(response.status !=200){
    console.log("errrrrrrrrrrrrr");
    return;
   }

   document.querySelector(".form-class").classList.add("transparent");
   //resetForm();
   showJewels();
};

const getMaterials = () => {
    const inputs = document.querySelectorAll("#jewel-boxes input");
    const mats = [];
    inputs.forEach((input)=> {
        mats.push(input.value);
    });
    return mats;
}

const getJewelry = async () => {
    try {
        return (await fetch("api/jewelry/")).json();
    } catch (error) {
        console.log(error);
    }
}

const showJewels = async () =>{
    console.log("showJewels");
    let jewelry = await getJewelry();

    console.log(jewelry);
    let store = document.getElementById("store"); 
    store.innerHTML = "";
    
    jewelry.forEach((jewel)=>{
        const section = document.createElement("section");
        store.append(section);

        
        const a = document.createElement("a");
        a.href = "#";
        section.append(a);


        const h4 = document.createElement("h4");
        h4.innerHTML = jewel.name;

        //console.log("below jewel.name");
        a.append(h4);

        a.onclick = () => {
            //console.log(jewel.description);
            const details = document.getElementById("jewel-details");
            details.innerHTML = "";
            const h5 = document.createElement("h5");
            details.append(h5);
            h5.innerHTML = jewel.description;

        }
    });
}

const addJewelryBoxes = (e) => {
    e.preventDefault();
    console.log("adding jewel");
    const jewelBoxes = document.getElementById("jewel-boxes");
    const input = document.createElement("input");
    input.type = "text";
    jewelBoxes.append(input);
};


window.onload = () => {
    document.getElementById("add-jewelry-link").onclick = addJewelryBoxes;
    showJewels();
   // document.getElementById("add-edit-JEWEL-form").onsubmit = addJewelry;
   document.getElementById("add-JEWELS-form").onsubmit = addJewelry;
    

}