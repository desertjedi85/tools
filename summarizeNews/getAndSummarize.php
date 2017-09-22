<?php
namespace PhpScience\TextRank;

if (isset($_POST["url"])) {
    $url = htmlspecialchars($_POST["url"]);
} else {
    // $url = "http://www.reuters.com/article/us-israel-palestinians-gaza/hamas-says-ready-to-hand-gaza-to-a-palestinian-unity-government-idUSKCN1BS013";
}
// ini_set("include_path", "/home/searchcu/public_html/". ini_get("include_path") );
ini_set('max_execution_time', 200);

// require("/home/searchcu/public_html/vendor/autoload.php");
require("vendor\autoload.php");

use Goose\Client as GooseClient;
use PhpScience\TextRank\Tool\StopWords\English;

// $ch = curl_init();
// curl_setopt($ch, CURLOPT_URL, $url); 
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

// $contents = curl_exec($ch);
// $info = curl_getinfo($ch);

// if ($info["http_code"] != 200) {
//     echo "News Service Unavailable<br><br>";
//     exit;
// }

// $myContents = json_decode($contents, true);

// $articles = ($myContents["articles"]);

$resultsArray = array();
$summarizedText = getArticle($url);

echo $summarizedText;

function getArticle($url) {
    $goose = new GooseClient();
    $article = $goose->extractContent($url);
    
    if ($articleText = $article->getCleanedArticleText()) {

        // echo "ArticleText: " . $articleText . "<br><br>";

        $result = array();
        summarize($articleText,$result);

        $string = "";
        foreach ($result as $line) {
            // $string .= $line . " ";
            foreach ($line as $sentence) {
                $string .= $sentence . " ";
            }
            // var_dump($line);
        }
        return $string;
        // return $articleArray;
    } else {
        // $errorArrayNoText[] = $url;
        // echo "Article not parsed<br>";
    }
    
}

function summarize($articleText,&$resultsArray) {
    // String contains a long text, see the /res/sample1.txt file.
    
    
    $api = new TextRankFacade();
    // English implementation for stopwords/junk words:
    $stopWords = new English();
    $api->setStopWords($stopWords);
    
    // Array of the most important keywords:
    // $result = $api->getOnlyKeyWords($text); 
    
    // Array of the sentences from the most important part of the text:
    $resultsArray[] = $api->getHighlights($articleText); 
    
    // Array of the most important sentences from the text:
    // $result = $api->summarizeTextBasic($text);
    // return $result;
    // print_r($result);
}

function remoteURLExists($url) {
    $ch = curl_init($url);
    $user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36';
        // $timeout = 10;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_AUTOREFERER, false);
    curl_setopt($ch, CURLOPT_VERBOSE, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);

    curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSLVERSION,CURL_SSLVERSION_DEFAULT);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    // curl_setopt($ch, CURLOPT_TIMEOUT_MS, 60000);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 150);
    curl_setopt($ch, CURLOPT_TIMEOUT, 150);
    //don't fetch the actual page, you only want to check the connection is ok
    curl_setopt($ch, CURLOPT_NOBODY, true);

    //do request
    $result = curl_exec($ch);

    $ret = false;

    if (!curl_errno($ch)) {
        if ($result !== false) {
            //if request was ok, check response code
            $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);  

            if ($statusCode == 200) {
                $ret = true;  
            }
        } else {
        }
    } else {
        $ret = false;
    }
    curl_close($ch);

    return $ret;
}

function getConfigData() {
    $data = file_get_contents("db.config");
    if (preg_match_all("/DB=(.*)\nUSER=(.*)\nPASS=(.*)\nHOST=(.*)/",$data,$match)) {
        $db = $match[1][0];
        $user = $match[2][0];
        $pass = $match[3][0];
        $host = $match[4][0];

        $array = array($db,$user,$pass,$host);
        return $array;
    } else {
        echo "Invalid Config File<br>";
    }
}