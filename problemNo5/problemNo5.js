// const getGoogleHomePage = (...args) => {
//     return new Promise((resolve) => {
//         getMaxCustom((max) => {
//             resolve(max);
//         }, ...args);
//     });
// }
// getGoogleHomePage()
// .then(getMaxCustom)



    function register() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Register end');
                resolve();
            }, 1000);
    
        })
    }
    function sendEmail() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('email end');
                resolve();
            }, 1000);
    
        })
    
    }
    function login() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('login end');
                resolve();
            }, 1000);
        })
    
    }
    function getGoogleHomePage() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('open google homepage');
                resolve();
            }, 1000);
        })
    }
    function displayUserData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('user data displayed');
                resolve();
    
            }, 2000);
        })
    
    }
    
    register()           // using promises
     .then(sendEmail)
     .then(login)
     .then(getGoogleHomePage)
     .then(displayUserData)