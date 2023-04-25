const btn = document.getElementById("add");
const itemList = document.getElementById("itemList");


btn.addEventListener('click',addItem);
window.addEventListener("DOMContentLoaded" , loaData)
itemList.addEventListener('click', buy);

function loaData(){
  len = localStorage.length

    for(a in localStorage){
      if(len>0){
        item = localStorage.getItem(a)
        let obd = JSON.parse(item);
        var a = []
        for(key in obd){
          a.push(obd[key])
        }
        var list = createList(a[0],a[1],a[2],a[3])
        itemList.appendChild(list);
      len--
      }
      else
        break
    } 
}


function addItem(e){
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


    //axios.post("https://crudcrud.com/223899641e5d4f249c728d4620a0386b/itemList", ob).then(response=>console.log(response))
    // Create new li element
    var item = createList(name.value , desc.value , quantity.value , price.value)
    
    // Append li to list
    itemList.appendChild(item);

    let obs = JSON.stringify(ob);
    localStorage.setItem(name.value,obs);

    name.value = '';
    desc.value = '';
    quantity.value = '';
    price.value = '';
  }

  function createList(name , desc ,quan ,price){

    var li = document.createElement('li');
    // Add class
    li.className = 'list-group-item';
    li.id = name
    // Add text node with input value
    li.appendChild(document.createTextNode(name+","+desc+","+quan+","+price));
  
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
        
        tar.splice(2,1)
        // console.log(tar)
        li.firstChild.textContent = `${tar[0]},${tar[1]},${quantity},${tar[2]}`  
        // console.log(localStorage.getItem(tar[0]))
        let ob = {
          name : tar[0] ,
          desc : tar[1] ,
          quantity : quantity ,
          price : tar[2]
        }
        let obs = JSON.stringify(ob);
        localStorage.setItem(tar[0],obs)

      
    }
  
    else if(e.target.classList.contains('2')){
    
        var li = e.target.parentElement;
        var tar = li.firstChild.textContent.split(',')
        if(tar[2]<= 1){
          confirm("Out of Stock , come back Later")
          return

        }
        var quantity = parseInt(tar[2])-2
        tar.splice(2,1)
        li.firstChild.textContent = `${tar[0]},${tar[1]},${quantity},${tar[2]}`  
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
  
