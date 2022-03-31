﻿const AccountSelect = document.getElementById("Accounts");
const Balance = document.getElementById("balance");
const Transaction = document.getElementById("transactions");
const CreateTransaction = document.getElementById("createTransaction");
const CreateTransactionLink = CreateTransaction.href;
const AccountActions = document.getElementById("AccountActions");

AccountSelect.multiple = false;

const insertTransaction = (id, name, amount) => {
    if (amount < 0) {
        Transaction.innerHTML += `
        <tr class="table-danger">
            <td>
                <a class="btn btn-primary" href="${window.location.href}Transactions/Modify/${id}""><i class="bi bi-pencil-square"></i></a>
                <a class="btn btn-danger" href="${window.location.href}Transactions/Delete/${id}"><i class="bi bi-trash"></i></a>
            </td>
            <td>${name}</td>
            <td class="fw-bold">${amount}</th>
        </tr>
        `;
    } else {
        Transaction.innerHTML += `
        <tr class="table-success">
            <td>
                <a class="btn btn-primary" href="${window.location.href}Transactions/Modify/${id}""><i class="bi bi-pencil-square"></i></a>
                <a class="btn btn-danger" href="${window.location.href}Transactions/Delete/${id}"><i class="bi bi-trash"></i></a>
            </td>
            <td>${name}</td>
            <td class="fw-bold">${amount}</th>
        </tr>
        `;
    }
}
const getTransactions = async (accountId) => {
    AccountActions.innerHTML = `
        <a class="btn btn-primary me-2" href="${window.location.href}Accounts/Modify/${accountId}">
            <i class="bi bi-pencil-square"></i>
        </a>
        <a class="btn btn-danger" href="${window.location.href}Accounts/Delete/${accountId}">
            <i class="bi bi-trash"></i>
        </a>
    `;
    CreateTransaction.href = CreateTransactionLink + '/' + accountId;
    const response = await fetch(window.location.href + "Home/GetTransactions", {
        method: 'POST',
        body: accountId,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const json = await response.json();
    let amount = 0.00;
    Transaction.innerHTML = "";
    json.forEach(t => {
        amount += t.total;
        insertTransaction(t.id, t.description, t.total)
    });

    Balance.innerHTML = amount;
}

getTransactions(parseInt(AccountSelect.value));
AccountSelect.onchange = async (e) => {
    const accountId = e.path[0].value;
    getTransactions(accountId)
}






