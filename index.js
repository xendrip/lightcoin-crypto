class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
/* didn't remove this, caused issues: transactions: circular
  commit() {
    this.account.balance += this.value;
  } */
  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    } else {
      return false;
    }
  }
};

class Withdrawal extends Transaction {

  get value() {
    return (this.amount * -1);
  }
  isAllowed() {
    return ((this.account.balance - this.value) >= 0);
  }

};

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }
  isAllowed() {
    return (this.value > 0);
  }

};

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {

    let balance = 0;

    // const reducer = (accumulator, currentValue) => accumulator + currentValue.value; //from MDN
    // return this.transactions.reduce(reducer, 0);

    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

};




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account();

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1.commit());

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Balance:', myAccount.balance);
