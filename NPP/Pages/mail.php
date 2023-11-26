<?php
//if (isset($_POST['email']) && $_POST['email'] != '')  {

if(isset($_POST['name'])) {
    
    $name = $_POST['name'];
    $emailFrom = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    $emailTo = "nicholaspollett@hotmail.com";
    $headers = "From: ". $name;
    $body = "";

    $body .= "From: " .$name. "\r\n";
    $body .= "Email: " .$emailFrom. "\r\n";
    $body .= "subject: " .$subject. "\r\n"; 
    $body .= "Message: " .$message. "\r\n";

    $message_sent = true;
    
    mail($emailTo, $subject, $body, $headers);
    header("Location: contact.html?mailsend");
}
//}
        
?>