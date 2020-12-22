function sendMail(contactForm){
    emailjs.send("gmail", "rosie", {
        "to_name": contactForm.name.value,
        "from_email": cotanctForm.value,
        "message": contactForm.projectsummary
    }).then(
        function(response){
            console.log("SUCCESS", response);
        },
        function(error){
            console.log("FAILED", error)   
        }
    );
    return false;
}