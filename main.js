const btn = document.getElementById("add");
const itemList = document.getElementById("itemList");


btn.addEventListener('click',addItem);
window.addEventListener("DOMContentLoaded" , loaData)
itemList.addEventListener('click', buy);

function loaData(){

  axios.get("https://crudcrud.com/api/2e4b643ec79e4904b43d285367ffc482/InventoryList").then(response=>{
    console.log(response.data)
    data = response.data
    len = data.length
    for(var i = 0 ;i<len ; i++){
      var a = []
      for(key in data[i]){
        a.push(data[i][key])
      }
      var list = createList(a[1],a[2],a[3],a[4],a[0])
      itemList.appendChild(list);
      //console.log(a)
    }
  })
  
}


async function addItem(e){
    e.preventDefault();
  
    // Get input value
    var name = document.getElementById('name');
    var desc = document.getElementById('desc');
    var quantity = document.getElementById('quantity');
    var price = document.getElementById('price');

    let ob = {
      name : name.value ,
      desc : desc.value ,
      quantity : quantity.value ,
      price : price.value
    }

    await axios.post("https://crudcrud.com/api/2e4b643ec79e4904b43d285367ffc482/InventoryList", ob).then(response=>{
      console.log(response.data._id)
      var item = createList(name.value , desc.value , quantity.value , price.value , response.data._id)
    
    // Append li to list
      itemList.appendChild(item);

      let obs = JSON.stringify(ob);
      localStorage.setItem(name.value,obs);
    
    
    })
      

    name.value = '';
    desc.value = '';
    quantity.value = '';
    price.value = '';
    // Create new li element
    
  }

  function createList(name , desc ,quan ,price , id){

    var li = document.createElement('li');
    // Add class
    li.className = 'list-group-item';
    li.id = name
    // Add text node with input value
    li.appendChild(document.createTextNode(name+","+desc+","+quan+","+price+","+id));
  
    // Create del button element
    var buyOne = document.createElement('button');
    buyOne.id = name+"1"
    // Add classes to del button
    buyOne.className = 'btn btn-danger btn-sm float-end  ms-2 1';
  
    // Append text node
    buyOne.appendChild(document.createTextNode('Buy One'));
  
    // Append button to li
    li.appendChild(buyOne);
  
    // Append li to list
   

    var buyTwo = document.createElement('button');
    buyTwo
    // Add classes to del button
    buyTwo.className = 'btn btn-danger btn-sm float-end  ms-2 2';
  
    // Append text node
    buyTwo.appendChild(document.createTextNode('Buy Two'));
  
    // Append button to li
    li.appendChild(buyTwo);

    return li ;
  }

  function buy(e){
    if(e.target.classList.contains('1')){
        var li = e.target.parentElement;
        var tar = li.firstChild.textContent.split(',')

        var quantity = parseInt(tar[2])-1
        if(parseInt(tar[2])==0 || parseInt(tar[2])<0){
          confirm("Out of Stock , come back Later")
          return
        }
        let ob2 = {
          name : tar[0] ,
          desc : tar[1] ,
          quantity : quantity ,
          price : tar[3]
        }

        

        axios.put(`https://crudcrud.com/api/2e4b643ec79e4904b43d285367ffc482/InventoryList/${tar[4]}`, {...ob2 , _id : undefined})
        li.firstChild.textContent = `${tar[0]},${tar[1]},${quantity},${tar[3]},${tar[4]}`  
        let ob = {
          name : tar[0] ,
          desc : tar[1] ,
          quantity : quantity ,
          price : tar[2]
        }
        
        // tar.splice(2,1)
        // // console.log(tar)
        // li.firstChild.textContent = `${tar[0]},${tar[1]},${quantity},${tar[2]}`  
        // // console.log(localStorage.getItem(tar[0]))
        // let ob = {
        //   name : tar[0] ,
        //   desc : tar[1] ,
        //   quantity : quantity ,
        //   price : tar[2]
        // }
        // let obs = JSON.stringify(ob);
        // localStorage.setItem(tar[0],obs)

      
    }
  
    else if(e.target.classList.contains('2')){
    
        var li = e.target.parentElement;
        var tar = li.firstChild.textContent.split(',')

        var id = tar[4]
        
        if(tar[2]<= 1){
          confirm("Out of Stock , come back Later")
          return

        }
        var quantity = parseInt(tar[2])-2

        let ob2 = {
          name : tar[0] ,
          desc : tar[1] ,
          quantity : quantity ,
          price : tar[3]
        }

        

        axios.put(`https://crudcrud.com/api/2e4b643ec79e4904b43d285367ffc482/InventoryList/${tar[4]}`, {...ob2 , _id : undefined})
        li.firstChild.textContent = `${tar[0]},${tar[1]},${quantity},${tar[3]},${tar[4]}`  
        let ob = {
          name : tar[0] ,
          desc : tar[1] ,
          quantity : quantity ,
          price : tar[2]
        }
        let obs = JSON.stringify(ob);
        localStorage.setItem(tar[0],obs)
    }
  }
  
