#! /usr/bin/env node
import inquirer from "inquirer";

//Bank Account interface
interface BankAccount{
    accountNumber: number;
    balance:number;
withdraw(amount:number):void
deposit(amount:number):void
checkBalance():void
}

//Bank Account Class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance:number;

    constructor(accountNumber:number, balance:number){
        this.accountNumber = accountNumber
        this.balance = balance
    }

    //Debit money
    withdraw(amount: number): void {
       if (this.balance >= amount){
            this.balance -= amount
            console.log(`Withdrawl of $${amount} Successful. Remaining Balance: $${this.balance}`);
            
        }else {
            console.log("Insufficient Balance");
            
        }
    }

    //Credit money
    deposit(amount:number): void{
        if (amount > 100){
            amount -= 1; //$1 fee charged if more then $100 is deposited 
        }this.balance += amount;
        console.log(`Deposit of $${amount} successful . Remaining Balance $${this.balance}`);
        
    }

    //check balance 
    checkBalance(): void {
        console.log(`Current balance : $${this.balance}`);
    }
}

//customer class
class Customer{
    firstName:string;
    lastName:string;
    gender:string;
    age:number;
    mobileNumber:number;
    account:BankAccount

    constructor(firstName:string,lastName:string,gender:string,age:number,mobileNumber:number,account:BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account
    }
}

// creating bank account

const accounts: BankAccount[]=[
    new BankAccount(1001,500),
    new BankAccount(1002,1000),
    new BankAccount(1003,2000)
];

//creating customers
const customers: Customer[] = [
    new Customer ("Hamza","Baig","Male",24,3323213210 , accounts[0]), 
    new Customer ("Usama","Baig","Male",25,3103213210 , accounts[1]),
    new Customer ("Shafaq","Mughal","Female",28,3223213210 , accounts[2]),
]

//Function to interact with bank account 
async function service (){
    do {
        const accountNumberInput = await inquirer.prompt({
name:"accountNumber" ,
type: "number",
message:"Enter your account number"
        })
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber) 

        if(customer){
            console.log(`Welcome , ${customer.firstName} ${customer.lastName} !\n`);
            const ans = await inquirer.prompt([{
                name:"select",
                type:"list",
                message:"select operation ",
                choices:["Deposit", "Withdraw","Check Balance","Exit"]

            }]);


            switch (ans.select){
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name:"amount",
                        type:"number",
                        message:"Enter the amount to Deposit:"
                    })
                    customer.account.deposit(depositAmount.amount);
                    break;

                    case "Withdraw":
                    const WithdrawAmount = await inquirer.prompt({
                        name:"amount",
                        type:"number",
                        message:"Enter the amount to Withdraw:"
                    })
                    customer.account.withdraw(WithdrawAmount.amount);
                    break;
                    case "Check Balance":
                        customer.account.checkBalance();
                        break;
                        case "Exit":
                            console.log("Exiting Bank Program");
                            console.log("\n Thanks for Using our bank services . Have a Great Day ");
                            return;
                        
                        }

            
        }else {
            console.log("Invalid Account Number ! please Try Again");
            
        }

    }while(true)
}

service()
























