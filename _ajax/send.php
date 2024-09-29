<?php

ini_set('display_errors', 0);
error_reporting(0);


//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require('./../vendor/autoload.php');

$mail = new PHPMailer(true);

$mail->Host = 'smtp.yandex.ru';
$mail->Port = 587;
$mail->SMTPAuth = true;
$mail->isSMTP();
$mail->SMTPSecure = 'tls';
$mail->SMTPOptions = array (
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true)
);
                                 //Enable SMTP authentication
$mail->Username   = 'info@catsoft.ru';                     //SMTP username
$mail->Password   = '******************';                               //SMTP password

$mail->CharSet = "UTF-8";

//$mail->addReplyTo('info@catsoft.ru', 'CatSoft');

$mail->setFrom('info@catsoft.ru', 'CatSoft');

//$mail->addAddress('info@catsoft.ru');
$mail->addAddress('mr.fernus@gmail.com');

$RESULT = [
    'success' => false,
];

if(strtolower($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'xmlhttprequest') {

    $NAME = trim($_POST['name']);
    $PHONE = trim($_POST['phone']);
    $MAIL = trim($_POST['email']);
    $TEXT = trim($_POST['text']);
    $TEXT_EX = trim($TEXT);

    if(!empty($PHONE)) {

        $arFields = [
            'Имя' => $NAME,
            'Телефон' => $PHONE,
            'E-mail' => $MAIL,
            'Комментарий' => $TEXT,
        ];

        $arFields = array_filter($arFields);

        if(!empty($_POST['type']) && $_POST['type'] == 'test')
            $THEME = 'Заявка на тестовый доступ!';
        else
            $THEME = 'Заявка на обратный звонок!';

        $TEXT = '';

        foreach ($arFields as $K => $V)
            $TEXT .= $K.': '.$V.'<br />';

        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = $THEME;
        $mail->Body    = $TEXT;
        //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
        
        
        
        // amoCRM

        /*$S_PAGE = 'catsoft.ru';
        $S_NAME = $THEME;
        $S_UID = md5('CS:' . $PHONE . ':' . time());

        $arLeads = [];

        if(!empty($TEXT))
            $arLeads[0]['custom_fields_values'][] = [
                'field_id' => 2008982,
                'values' => [
                    [
                        'value' => $TEXT_EX
                    ]

                ],
            ];


        $cFields = [
            [
                'field_code' => 'PHONE',
                'values' => [
                    [
                        'enum_code' => 'MOB',
                        'value' => $PHONE
                    ]

                ],
            ],
        ];

        if(!empty($MAIL))
            $cFields[] = [
                'field_code' => 'EMAIL',
                'values' => [
                    [
                        'enum_code' => 'OTHER',
                        'value' => $MAIL
                    ]

                ],
            ];

        $NAME_TITLE = $PHONE;

        if(!empty($NAME))
            $NAME_TITLE .= ' ['.$NAME.']';

        $data = [[
            "source_name" => $S_NAME,
            "source_uid" => $S_UID,
            "created_at" => time(),
            "_embedded" => [
                'contacts' => [
                    [
                        "name" => $NAME_TITLE,
                        "custom_fields_values" => $cFields
                    ]
                ],
            ],
            'metadata' => [
                'form_id' => md5($THEME),
                'form_name' => $THEME,
                'form_page' => $S_PAGE,
                'form_sent_at' => time(),
            ]
        ]];

        if(count($arLeads) > 0)
            $data[0]['_embedded']['leads'] = $arLeads;

        $subdomain = 'catsoft2020'; //Поддомен нужного аккаунта
        $link = 'https://' . $subdomain . '.amocrm.ru/api/v4/leads/unsorted/forms'; //Формируем URL для запроса

        $access_token = '*************************';

        $headers = [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $access_token
        ];

        $curl = curl_init();
        curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-oAuth-client/1.0');
        curl_setopt($curl,CURLOPT_URL, $link);
        curl_setopt($curl,CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl,CURLOPT_HEADER, false);

        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));

        curl_setopt($curl,CURLOPT_SSL_VERIFYPEER, 1);
        curl_setopt($curl,CURLOPT_SSL_VERIFYHOST, 2);
        $out = curl_exec($curl);
        //$code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);*/

        $RESULT['success'] = true;

    }
    
}

echo json_encode($RESULT, true);