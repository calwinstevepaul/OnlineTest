const validateEmail = email => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let emailErr = '';
    if (email.length === 0) {
      emailErr = 'Please Enter eMail id';
    } else if (!pattern.test(email)) {
      emailErr = 'Please enter valid email id';
    }
    return {
      isValid: emailErr === '' ? true : false,
      err: emailErr
    };
  };

  module.exports =  {validateEmail}