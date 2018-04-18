<?php

// GET 请求
function curl_get($url = '', $params = '') {
  $options = array(
    CURLOPT_RETURNTRANSFER =>true,
    CURLOPT_HEADER =>false
  );
  $ch = curl_init($url);
  curl_setopt_array($ch, $options);
  $result = curl_exec($ch);   
           curl_close($ch);   
           return $result; 
}


$rel = curl_get('https://m.wanfangche.com/server/community/public/post/info?id=1526');

print_r($rel);
