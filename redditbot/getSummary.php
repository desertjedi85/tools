<?php
namespace PhpScience\TextRank;

ini_set('max_execution_time', 200);

// require("/home/searchcu/public_html/vendor/autoload.php");
require("vendor/autoload.php");
require("config/dbconfig.php");

use Goose\Client as GooseClient;
use PhpScience\TextRank\Tool\StopWords\English;

// return $_POST;

if (isset($_POST["url"]) && isset($_POST["id"])) {
    $articleUrl = $_POST["url"];
    $id = $_POST["id"];
} else {
    exit;
    // $id = "72cqos";
    // $articleUrl = "https://www.eurekalert.org/pub_releases/2017-09/ncsu-st092517.php";
}

if (checkUrlBlacklist($articleUrl) === true) {
    echo "Blacklisted url: $articleUrl\r\n";
    return false;
}


if (checkAlreadyPosted($id) === true) {
    echo "Already posted: $id\r\n";
    // return;
    return false;
// }
} else {
    if (remoteURLExists($articleUrl)) {
        if ($articleSummary = getArticle($articleUrl)) {
            echo $articleSummary;
            updateDB($id);
        } else {
            echo "Article summary failed\r\n";
        }
    } else {
        echo "Article not found\r\n";
    }
}


function getArticle($url) {
    $goose = new GooseClient();
    
    $article = $goose->extractContent($url);
    
    if ($articleText = $article->getCleanedArticleText()) { // Investigate if this is where things are being slowed down

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
        // $articleArray[] = $string;
        // return $articleArray;
        if (strlen($string) > 1500) {
            return "Article length too long";
        } else {
            return $string;
        }
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
    // print_r($resultsArray);
}

function checkAlreadyPosted($id) {
    $mysqli = new \mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($mysqli->connect_errno) {
        echo "Errno: " . $mysqli->connect_errno . "\n";
        echo "Error: " . $mysqli->connect_error . "\n";
        // exit();
        //TODO: Add error table
    }

    $result = $mysqli->query("SELECT postId FROM replies WHERE postId = '$id'");
    if ($result->num_rows == 0) {
        return false;
    } else {
        return true;
    }
}

function updateDB ($id) {
   
    
    $mysqli = new \mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($mysqli->connect_errno) {
        echo "Errno: " . $mysqli->connect_errno . "\n";
        echo "Error: " . $mysqli->connect_error . "\n";
        // exit();
        //TODO: Add error table
    }
    $stmt = $mysqli->prepare("INSERT INTO replies (postId) VALUES (?)");
    $stmt->bind_param('s', $id);
    $stmt->execute();
    // echo "URL Added Successfully.";
}

function checkUrlBlacklist($url) {
    if (preg_match("/twitter\.com.*/i",$url)) {
        return true;
    } else {
        return false;
    }
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