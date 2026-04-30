#include <stdio.h>
#include <stdlib.h>
#include <string.h>


struct Account {
    int accNo;
    char name[50];
    float balance;
    struct Account* next;
};

struct Account* head = NULL;

void loadFromFile() {
    FILE *fp = fopen("accounts.txt", "r");

    if(fp == NULL) return;

    int accNo;
    char name[50];
    float balance;

    while(fscanf(fp, "%d %s %f", &accNo, name, &balance) != EOF) {
        struct Account* newNode = (struct Account*)malloc(sizeof(struct Account));
        newNode->accNo = accNo;
        strcpy(newNode->name, name);
        newNode->balance = balance;
        newNode->next = head;
        head = newNode;
    }

    fclose(fp);
}


void saveToFile() {
    FILE *fp = fopen("accounts.txt", "w");

    struct Account* temp = head;

    while(temp != NULL) {
        fprintf(fp, "%d %s %.2f\n", temp->accNo, temp->name, temp->balance);
        temp = temp->next;
    }

    fclose(fp);
}


struct Account* search(int accNo) {
    struct Account* temp = head;

    while(temp != NULL) {
        if(temp->accNo == accNo) return temp;
        temp = temp->next;
    }
    return NULL;
}


void createAccount(int accNo, char name[], float balance) {

    if(search(accNo) != NULL) {
        printf("Account Already Exists\n");
        return;
    }

    struct Account* newNode = (struct Account*)malloc(sizeof(struct Account));

    newNode->accNo = accNo;
    strcpy(newNode->name, name);
    newNode->balance = balance;
    newNode->next = head;
    head = newNode;

    saveToFile();

    printf("Account Created Successfully\n");
}


struct Stack {
    int accNo;
    float amount;
    char type[10];
};

struct Stack stack[100];
int top = -1;

void push(int accNo, float amount, char type[]) {
    top++;
    stack[top].accNo = accNo;
    stack[top].amount = amount;
    strcpy(stack[top].type, type);
}

struct Stack pop() {
    return stack[top--];
}


struct Queue {
    int accNo;
    float amount;
    char type[10];
};

struct Queue q[100];
int front = 0, rear = -1;

void enqueue(int accNo, float amount, char type[]) {
    rear++;
    q[rear].accNo = accNo;
    q[rear].amount = amount;
    strcpy(q[rear].type, type);
}

void showHistory() {
    if(rear == -1) {
        printf("No Transactions\n");
        return;
    }

    for(int i = front; i <= rear; i++) {
        printf("AccNo: %d | %s | Amount: %.2f\n",
               q[i].accNo, q[i].type, q[i].amount);
    }
}


void deposit(int accNo, float amount) {
    struct Account* acc = search(accNo);

    if(acc != NULL) {
        acc->balance += amount;

        push(accNo, amount, "deposit");
        enqueue(accNo, amount, "deposit");

        saveToFile();

        printf("Deposit Successful\n");
    } else {
        printf("Account Not Found\n");
    }
}

void withdraw(int accNo, float amount) {
    struct Account* acc = search(accNo);

    if(acc != NULL) {
        if(acc->balance >= amount) {
            acc->balance -= amount;

            push(accNo, amount, "withdraw");
            enqueue(accNo, amount, "withdraw");

            saveToFile();

            printf("Withdraw Successful\n");
        } else {
            printf("Insufficient Balance\n");
        }
    } else {
        printf("Account Not Found\n");
    }
}

void checkBalance(int accNo) {
    struct Account* acc = search(accNo);

    if(acc != NULL) {
        printf("Balance: %.2f\n", acc->balance);
    } else {
        printf("Account Not Found\n");
    }
}


void undo() {
    if(top == -1) {
        printf("No Undo Available\n");
        return;
    }

    struct Stack last = pop();
    struct Account* acc = search(last.accNo);

    if(acc == NULL) return;

    if(strcmp(last.type, "deposit") == 0) {
        acc->balance -= last.amount;
    } else {
        acc->balance += last.amount;
    }

    saveToFile();

    printf("Undo Successful\n");
}


void displayAll() {
    struct Account* temp = head;

    if(temp == NULL) {
        printf("No Accounts\n");
        return;
    }

    while(temp != NULL) {
        printf("AccNo: %d | Name: %s | Balance: %.2f\n",
               temp->accNo, temp->name, temp->balance);
        temp = temp->next;
    }
}


int main(int argc, char *argv[]) {

    loadFromFile();  // 🔥 IMPORTANT

    if(argc < 2) {
        printf("Invalid Command\n");
        return 0;
    }

    if(strcmp(argv[1], "create") == 0) {
        createAccount(atoi(argv[2]), argv[3], atof(argv[4]));
    }

    else if(strcmp(argv[1], "deposit") == 0) {
        deposit(atoi(argv[2]), atof(argv[3]));
    }

    else if(strcmp(argv[1], "withdraw") == 0) {
        withdraw(atoi(argv[2]), atof(argv[3]));
    }

    else if(strcmp(argv[1], "balance") == 0) {
        checkBalance(atoi(argv[2]));
    }

    else if(strcmp(argv[1], "undo") == 0) {
        undo();
    }

    else if(strcmp(argv[1], "history") == 0) {
        showHistory();
    }

    else if(strcmp(argv[1], "display") == 0) {
        displayAll();
    }

    else {
        printf("Invalid Command\n");
    }

    return 0;
}