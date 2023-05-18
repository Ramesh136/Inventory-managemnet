const btn = document.getElementById("add");
const itemList = document.getElementById("itemList");
const crud = "b0448c10d002417bac859969553e9818"

btn.addEventListener('click',addItem);
window.addEventListener("DOMContentLoaded" , loaData)
itemList.addEventListener('click', buy);

  async function loaData(){

  try{
    var resp = await axios.get(`https://crudcrud.com/api/${crud}/InventoryList`)

    console.log(resp)
    data = resp.data
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
  } 
  catch(error){
    console.log(error)
  }
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


    try{
      var resp = await axios.post(`https://crudcrud.com/api/${crud}/InventoryList`, ob)
      var item = createList(name.value , desc.value , quantity.value , price.value , resp.data._id)
    }
    catch(error){
      console.log(error)
    }
    
  // Append item  to list
    itemList.appendChild(item);
  
  //make input values blank for next input
    name.value = '';
    desc.value = '';
    quantity.value = '';
    price.value = '';
  }

  function createList(name , desc ,quan ,price , id){

    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.id = name

    li.appendChild(document.createTextNode(name+"-"+desc+"-"+quan+"-"+price+"-"+id));
  
   // Append button buyOne to li
    var buyOne = document.createElement('button');
    buyOne.className = 'btn btn-danger btn-sm float-end  ms-2 1';
    buyOne.appendChild(document.createTextNode('Buy One'));
    li.appendChild(buyOne);
    
    // Append button buyTwo to li
    var buyTwo = document.createElement('button');
    buyTwo.className = 'btn btn-danger btn-sm float-end  ms-2 2';
    buyTwo.appendChild(document.createTextNode('Buy Two'));
    li.appendChild(buyTwo);

    return li ;
  }

  async function buy(e){
    if(e.target.classList.contains('1')){
        var li = e.target.parentElement;
        var tar = li.firstChild.textContent.split('-')

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

        try{
          await axios.put(`https://crudcrud.com/api/${crud}/InventoryList/${tar[4]}`, {...ob2 , _id : undefined})
          li.firstChild.textContent = `${tar[0]}-${tar[1]}-${quantity}-${tar[3]}-${tar[4]}` 
        }
        catch(error){
          console.log(error)
        }
    }
  
    else if(e.target.classList.contains('2')){
    
        var li = e.target.parentElement;
        var tar = li.firstChild.textContent.split('-')

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

        
        try{
          await axios.put(`https://crudcrud.com/api/${crud}/InventoryList/${tar[4]}`, {...ob2 , _id : undefined})
          li.firstChild.textContent = `${tar[0]}-${tar[1]}-${quantity}-${tar[3]}-${tar[4]}`  
        }
        
        catch(error){
          console.log(error)
        }
    }
  }
  
