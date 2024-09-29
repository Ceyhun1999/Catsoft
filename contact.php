<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate input
    if (empty($_POST['name']) || empty($_POST['phone'])) {
        echo "Заполните все поля.";
        exit;
    }

    // Sanitize input
    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
    $phone = filter_var(trim($_POST['phone']), FILTER_SANITIZE_STRING);


    // Email recipient
    $to = "amoursis@yandex.ru";

    // Email subject
    $subject = "Новое сообщение с формы обратной связи";

    // Email body
    $body = "Имя: $name\n";
    $body .= "Телефон: $phone\n";

    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Prevent header injection
    if (preg_match("/[\r\n]/", $email) || preg_match("/[\r\n]/", $name)) {
        echo "Произошла ошибка.";
        exit;
    }

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Сообщение отправлено.";
    } else {
        echo "Не удалось отправить сообщение.";
    }
}
