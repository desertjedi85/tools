<?php

ini_set('max_execution_time', 200);


// require("/home/searchcu/public_html/vendor/autoload.php");
require("vendor/autoload.php");
// use PhpScience\TextRank\Tool\StopWords\English;
// use Goose\Client as GooseClient;

$url = "http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=100%%20remote&country=US&age=30";


$jobsArray = array();

getJobs($url,$jobsArray);

echo "<pre>" . print_r($jobsArray) . "</pre>";

function getJobs($url,&$jobsArray) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $contents = curl_exec($ch);
    $info = curl_getinfo($ch);

    // if ($info["http_code"] != 200) {
        $myContents = json_decode($contents, true);

        $count = $myContents["count"];
        $countOnPage = $myContents["lastDocument"];
        $nextUrl = $myContents["nextUrl"];
        
        
        if ($myContents["resultItemList"]) {
            foreach ($myContents["resultItemList"] as $job) {
                getJobDetails($job,$jobsArray);
            }   
    
            if ($nextUrl) {
                getJobs($nextUrl,$jobsArray);
            } else {
                return;
            }
        }
        

        // echo "<pre>";
        // print_r($myContents);
        // echo "</pre>";
    // } else {
        // echo "Request Failed<br>";
    // }
}

function getJobDetails(&$job,&$jobsArray) {
    $stopWords = array("C#","ASP\.NET","Ruby","Salesforce","Software Engineer","\.Net","Back-End","Developer","Architect");
    $jobTitle = $job["jobTitle"];

    foreach ($stopWords as $word) {
        if (preg_match("/$word/i",$jobTitle)){
            return;
        }
    }
    $jobUrl = "<a>" . $job["detailUrl"] . "</a>";
    $jobCompany = $job["company"];
    $jobLocation = $job["location"];
    $jobDate = $job["date"];
    $jobDescription = getJobDescription($jobUrl);

    if (preg_match("/100% remote/i",$jobDescription)) {

        $jobsArray[] = array('jobTitle' => $jobTitle, 'jobUrl' => $jobUrl, 'jobCompany' => $jobCompany, 'jobLocation' => $jobLocation, 'jobDate' => $jobDate, 'jobDescription' => $jobDescription);
        // echo "Job Title: " . $jobTitle . "<br>";
        // echo "URL: " . $jobUrl . "<br>";
        // echo "Company: " . $jobCompany . "<br>";
        // echo "Location: " . $jobLocation . "<br>";
        // echo "Date: " . $jobDate . "<br>";
        // echo "Description" . $jobDescription . "<br><br>";
    } else {
        return;
    }

    
}

function getJobDescription($url) {
    $html = file_get_contents($url);
    $first_step = explode( '<div class="highlight-black" id="jobdescSec" itemprop="description">' , $html );
    $second_step = explode("</div>" , $first_step[1] );
    
    return "<pre>" . $second_step[0] . "</pre>";
    // return $second_step[0];
    
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