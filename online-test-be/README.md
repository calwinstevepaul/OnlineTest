# **Online Test**

Online Test is an application which has been built using **React.js** for client side , **Node.js** for the server side and **MongoDB** for the database. This application was build by **Codingmart Technologies** for conducting there campus interview coding round. By using this applicaton the admin can monitor the students who are undergoing the interview process.

## **Getting Started**

**Online Test** has three repos in [git.codingmart.com](https://git.codingmart.com/cm "gitlab"). Named as following: 
* online-test-admin
* online-test-user
* online-test-be 

by using the following *HTTPs or SSH* key clone the files in a seprete parent folder.
``` bash
    # HTTPs
    git clone https://git.codingmart.com/cm/online-test-admin.git
    git clone https://git.codingmart.com/cm/online-test-user.git
    git clone https://git.codingmart.com/cm/online-test-be.git


    # SSH
    git clone git@git.codingmart.com:cm/online-test-admin.git
    git clone git@git.codingmart.com:cm/online-test-user.git
    git clone git@git.codingmart.com:cm/online-test-be.git
```

### **Prerequisites**

Some of the software requirements are :

* Visual Studio Code ( [Download Visual Studio Code](https://code.visualstudio.com/download "visualstudio") )
* React.js ( [Installation guide React.js](https://reactjs.org/docs/getting-started.html "React.js") )

* Node.js ( [Download Node.js](https://nodejs.org/en/download/ "Node.js") )

* MongoDB ( [Installation guide MongoDB](https://docs.mongodb.com/manual/installation/ "MongoDb") )

* Docker ( [Installation guide Docker](https://docs.docker.com/engine/install/ "Docker") )

### **Dependencies**

* **ace-builds** : ^1.4.8
* **react-ace**: ^8.1.0
* **axios** : ^0.19.2
* **react-recaptcha** : ^2.3.10
* **sweetalert** : ^2.1.2
* **apexcharts** : ^3.17.1
* **react-apexcharts** : ^1.3.6
* **fortawesome** : 5.13.0
* **@sendgrid/mail**" : ^6.5.5
* **app-root-path** : ^3.0.0
* **bcrypt** : ^4.0.1
* **body-parser** : ^1.19.0
* **cors** : ^2.8.5
* **diff** : ^4.0.2,
* **dotenv** : ^8.2.0,
* **express**: ^4.17.1,
* **jsonwebtoken**: ^8.5.1
* **mongodb** : ^2.2.16
* **mongoose** : ^5.9.5
* **morgan** : ^1.10.0
* **multer** : ^1.4.2
* **nodemon** : ^2.0.2
* **supertest** : ^4.0.2
* **winston** : ^3.2.1

### **Installing**

Change your directory to the parrent folder of these applications. Stop and remove all the containers and images which are currently running. Then run the **docker-compose.yml** by the following command.
 ```bash
    sudo docker stop containerId
    
    sudo docker ps

    sudo docker system prune -a

    sudo docker-compose up --build

 ```
<!-- Featues will come here -->

 ## **Deployment**
 Switch to the server with the use of the following command.
```
    ssh root@167.71.236.57
```

Now navigate to the project folder `/var/www/OnlineTest`. Then install and build all the Frontend files.
```
    npm i 
    npm run-script build
``` 
 Then Stop and remove all the containers and images which are currently running. Then run the **docker-compose.yml** by the following command.
 ```bash
    sudo docker stop containerId
    
    sudo docker ps

    sudo docker system prune -a

    sudo docker-compose up --build

 ```
 To make any changes in Nginx config file go to `/etc/nginx/sites-available/` and edit the file called **default**.

 ## **Built With**

* React.js ( [Installation guide React.js](https://reactjs.org/docs/getting-started.html "React.js") )

* Node.js ( [Download Node.js](https://nodejs.org/en/download/ "Node.js") )

* MongoDB ( [Installation guide MongoDB](https://docs.mongodb.com/manual/installation/ "MongoDb") )


