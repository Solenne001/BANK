let buttAdd = document.querySelector(".register button") //selectionner
let sectionMemberList = document.querySelector(".memberList")
let accountList = []
class Account{
    constructor(id, firstname,surname, age, profession, accountType){
        this.id= id
        this.firstname= firstname
        this.surname= surname
        this.age= age
        this.profession= profession
        this.accountType= accountType 
    }
    amount = 0  //solde=amount
    credit(amounts){
      this.amount += amounts //pour dire this.amout= this.amount + amounts
    }
    //== conversion de type; ===pas de conversion
    transaction(accoundId, transactionAmount){
        if (transactionAmount <= 0) {
            return
        }
        if(this.accountType==="epargne"){
           let transactionFees = transactionAmount * 0.03
           if(this.amount >(transactionFees +transactionAmount)){
            for(let account of accountList){ //les otres compte du tableau
                if(account.id === accoundId){
                    this.amount= this.amount -(transactionFees+transactionAmount)
                    account.amount = account.amount + transactionAmount
                }
            }
           }
        } else if(this.accountType==="courant"){
            let transactionFees = transactionAmount * 0.01
           if(this.amount >(transactionFees +transactionAmount)){
            for(let account of accountList){ //les otres compte du tableau
                if(account.id === accoundId){
                    this.amount= this.amount -(transactionFees+transactionAmount)
                    account.amount = account.amount + transactionAmount
                }
            }
           }
        } else if(this.accountType==="gold"){
            if(this.amount >(transactionAmount)){
             for(let account of accountList){ //les otres compte du tableau
                 if(account.id === accoundId){
                     this.amount= this.amount - transactionAmount
                     account.amount = account.amount + transactionAmount
                 }
             }
            }
        }

    }
}

let showMemberList =()=>{
    if(accountList.length<1){
        return
    }
    sectionMemberList.innerHTML=""
    for(let account of accountList){
      let articleElt = document.createElement("article")
      articleElt.textContent= account.firstname 
      sectionMemberList.appendChild(articleElt)
      let btnElt = document.createElement("button")
      let divElt = document.createElement("div")
   /*   articleElt.innerHTML= `
     <div>
     <h2>${account.firstname}</h2>
     </div>` */

     sectionMemberList.appendChild(articleElt)
     btnElt.textContent ="Crediter"
     articleElt.appendChild(btnElt)
     divElt.textContent =account.amount
     articleElt.appendChild(divElt)

     btnElt.addEventListener("click",()=>{
       let amount = Number(prompt("Montant à créditer"))
        account.credit(amount)
        showMemberList();
     })
    }
}

buttAdd.addEventListener("click", ()=> {
    let firstname=prompt("veuillez entrer votre nom")
    let surname= prompt("veuillez entrer votre prenom")
    let age= Number(prompt("veuillez entrer votre age"))
    let profession= prompt("veuillez entrer votre profession")
    let accountType= Number(prompt(
        "Quelle type de compte voulez-vous: 1-epargne \n 2-courant \n 3-gold"
        ))
    while(accountType !=1 && accountType!=2 && accountType!= 3){
         accountType= Number (prompt(
            "Quelle type de compte voulez-vous: \n 1-epargne \n 2-courant \n 3-gold"
            ))
    }
    switch(accountType){
        case 1:
            accountList.push(
                new Account(
                accountList.length +1,
                firstname,
                surname,
                age,
                profession,
                accountType))
                "epargne"
            break;
        case 2:
            accountList.push(
                new Account(
                accountList.length +1,
                firstname,
                surname,
                age,
                profession,
                accountType))
                "courant"
            break;
        case 3:
            accountList.push(
                new Account(
                accountList.length +1,
                firstname,
                surname,
                age,
                profession,
                accountType))
                "gold"
            break;   
    }
    showMemberList();
}) 